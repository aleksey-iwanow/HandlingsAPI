import { FiltersProps } from '../types/filtersType';
import { Database } from './database';
import { RunResult } from 'sqlite3';

export class DatabaseTools extends Database {
    constructor() {
        super();
    }

    public async insert<T>(tableName: string, values: Omit<T, 'id'>): Promise<T> {
        const keys = Object.keys(values);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

        return new Promise<T>((resolve, reject) => {
            this.db?.run(sql, Object.values(values), function (this: RunResult, err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...values } as T);
                }
            });
        });
    }

    public async getByConditions<T>(tableName: string, conditions: Partial<T>): Promise<T[]> {
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');

        const sql = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
        return new Promise<T[]>((resolve, reject) => {
            this.db?.all(sql, Object.values(conditions), (err: Error, rows: T[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public async getOne<T>(tableName: string, conditions: Partial<T>): Promise<T> {
        const rows = await this.getByConditions(tableName, conditions);

        return new Promise<T>((resolve, reject) => {
            if (rows.length > 0) {
                resolve(rows[0]);
            }
            else {
                reject(new Error('Row not found'))
            }
        });
    }

    public async update<T>(tableName: string, values: Partial<T>, conditions: Partial<T>): Promise<boolean> {
        const setClause = Object.keys(values).map(key => `${key} = ?`).join(', ');
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
        const params = [...Object.values(values), ...Object.values(conditions)];

        const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;

        return new Promise<boolean>((resolve, reject) => {
            this.db?.run(sql, params, (err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public async getUpdated<T>(tableName: string, values: Partial<T>, conditions: Partial<T>): Promise<T[]> {
        await this.update(tableName, values, conditions);
        return this.getByConditions<T>(tableName, conditions);
    }

    public async getDeleted<T>(tableName: string, conditions: Partial<T>): Promise<T[]> {
        const record = await this.getByConditions<T>(tableName, conditions);
        await this.delete<T>(tableName, conditions);
        return record
    }

    public async getAll<T>(tableName: string, filters: FiltersProps): Promise<T[]> {
        var sql = `SELECT * FROM ${tableName}`;
        const conditions: string[] = [];
        const params: string[] = [];

        if (filters.date && !filters.startDate && !filters.endDate) {
            conditions.push(`date(created_at) = date(?)`);
            params.push(filters.date.toISOString().split('T')[0]);
        }

        if (filters.startDate || filters.endDate) {
            if (filters.startDate) {
                conditions.push(`date(created_at) >= date(?)`);
                params.push(filters.startDate.toISOString().split('T')[0]);
            }
            if (filters.endDate) {
                conditions.push(`date(created_at) <= date(?)`);
                params.push(filters.endDate.toISOString().split('T')[0]);
            }
        }

        if (conditions.length > 0) {
            sql += ` WHERE ` + conditions.join(' AND ');
        }

        return new Promise<T[]>((resolve, reject) => {
            this.db?.all(sql, params, (err: Error, rows: T[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public async delete<T>(tableName: string, conditions: Partial<T>): Promise<boolean> {
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');

        const sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
        return new Promise<boolean>((resolve, reject) => {
            this.db?.run(sql, Object.values(conditions), (err: Error) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

export const dbTools = new DatabaseTools();