import { Response } from "express";

export const sendResponse = (promise: Promise<any>, res: Response) => {
    promise.then((data: any) => {
        res.json(data);
    }).catch((err: Error) => {
        res.status(500).json({error: err.message});
    });
};