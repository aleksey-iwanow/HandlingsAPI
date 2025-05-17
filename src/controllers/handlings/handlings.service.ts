import { dbTools } from "../../database/database.tools"
import { FiltersProps } from "../../types/filtersType";
import { HandlingProps, StatusHandling } from "../../types/handlingType";
import { checkParam, checkId } from "../../utils/checkValues";

export class HandlingService {
    dbName: string = 'handlings';

    public async getAll(filters: FiltersProps) {
        return await dbTools.getAll<HandlingProps>(this.dbName, filters);
    }

    public async work(id: string) {
        const numericId = checkId(id);
        return await dbTools.update<HandlingProps>(
            this.dbName, 
            { status: 'in_progress' }, 
            { id: numericId }
        )
    }

    public async complete(id: string, solution_text: string) {
        checkParam(solution_text, "solution_text");
        const numericId = checkId(id);

        return await dbTools.update<HandlingProps>(
            this.dbName, 
            { solution_text, status: "completed" }, 
            { id: numericId }
        );
    }

    public async getOne(id: string) {
        const numericId = checkId(id)
        return await dbTools.getOne<HandlingProps>(this.dbName, { id: numericId });
    }

    public async create(values: HandlingProps) {
        return await dbTools.insert<HandlingProps>(this.dbName, values);
    }

    public async cancelWork(cancel_reason: string) {
        checkParam(cancel_reason, "cancel_reason");

        const status: StatusHandling = "in_progress"
        return await dbTools.update<HandlingProps>(
            this.dbName, 
            { cancel_reason, status: "cancelled" }, 
            { status }
        );
    }

    public async cancel(id: string, cancel_reason: string) {
        checkParam(cancel_reason, "cancel_reason");
        const numericId = checkId(id);

        return await dbTools.update<HandlingProps>(
            this.dbName, 
            { cancel_reason, status: "cancelled" }, 
            { id: numericId }
        );
    }
}
