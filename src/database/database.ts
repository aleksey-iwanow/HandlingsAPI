import sqlite3 from 'sqlite3';

export class Database {
    protected db: sqlite3.Database | null;

    constructor() {
        this.db = new sqlite3.Database('./database.db', (err) => {
            if (err) {
                console.error('Database connection ERROR:', err.message);
            } else {
                console.log('Database connected.');
            }
        });
    }

    private createCallback(err: Error | null, tableName: string) {
        if (err) {
            console.error(`Error creating table ${tableName}:`, err.message);
        } else {
            console.log(`Table ${tableName} initialized.`);
        }
    }

    public createTableHandlings() {
        const sql = `
            CREATE TABLE IF NOT EXISTS handlings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                theme TEXT NOT NULL,
                status TEXT NOT NULL CHECK(status IN ('new', 'in_progress', 'completed', 'cancelled')) DEFAULT 'new',
                solution_text TEXT,
                cancel_reason TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.db?.run(sql, (err: Error) => this.createCallback(err, 'handlings'));
    }


    public closeConnection() {
        this.db?.close();
    }
}