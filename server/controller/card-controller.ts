import { Request, Response } from "express";
import cardService from "../service/card-service";

export default new class CardController {
    async createCard(req: Request, res: Response) {
        try {
            const {data, name} = req.body;
            await cardService.createCard(data, name);
            res.status(200).json({
                status: "success",
                message: "card has been created successfully"
            })
        } catch (error) {
            res.status(error.status ?? 500).json({
                status: "fail",
                message: error.message
            })
        }
    }
}