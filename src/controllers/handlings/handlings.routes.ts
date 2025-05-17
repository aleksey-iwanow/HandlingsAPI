import { Router, Response, Request } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { HandlingService } from "./handlings.service";

const router = Router();
const handlingService = new HandlingService();

router.get("/", (req: Request, res: Response) => {
    const { date, startDate, endDate} = req.query;
    const filters = {
        date: date ? new Date(date as string) : undefined,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
    };
    sendResponse(handlingService.getAll(filters), res);
})

router.get("/:id", (req: Request, res: Response) => {
    sendResponse(handlingService.getOne(req.params.id), res);
})

router.get("/:id", (req: Request, res: Response) => {
    sendResponse(handlingService.getOne(req.params.id), res);
})

router.patch("/work/:id", (req: Request, res: Response) => {
    sendResponse(handlingService.work(req.params.id), res);
})

router.patch("/complete/:id", (req: Request, res: Response) => {
    sendResponse(handlingService.complete(req.params.id, req.body.solution_text), res);
})

router.patch('/cancel/:id', (req, res) => {
    sendResponse(handlingService.cancel(req.params.id, req.body.cancel_reason), res);
})

router.patch('/cancel', (req, res) => {
    sendResponse(handlingService.cancelWork(req.body.cancel_reason), res);
})

router.post('/', (req, res) => {
    sendResponse(handlingService.create(req.body), res);
})


export const handlingsRouter = router;