export function checkId(id: string): number {
    if (!id) {
        throw new Error('Parameter "id" cannot be empty');
    }

    const numericId = Number(id);

    if (isNaN(numericId) || !Number.isInteger(numericId)) {
        throw new Error('Parameter "id" must be a number');
    }
    return numericId
}

export function checkParam(param: string, paramName: string) {
    if (!param) {
        throw new Error(`"${paramName}" cannot be empty`)
    }
}