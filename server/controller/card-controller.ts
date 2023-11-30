import { Request, Response } from "express";
import cardService from "../service/card-service";

export default new class CardController {
    async createCard(req: Request, res: Response) {
        try {
            const {data, name} = req.body;
            const {creatorId} = req.params;
            await cardService.createCard(data, name, creatorId);
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

    async updateCard(req: Request, res: Response) {
        try {
            const {data} = req.body;
            const {cardId} = req.params;
            await cardService.updateCard(data, cardId);
            res.status(200).json({
                status: "success",
                message: "card has been updated successfully"
            })
        } catch (error) {
            res.status(error.status ?? 500).json({
                status: "fail",
                message: error.message
            })
        }
    }

    async getCard(req: Request, res: Response) {
        try {
            const {cardId} = req.params;
            const card = await cardService.getCard(cardId);
            res.status(200).json({
                status: "success",
                message: "card has been found successfully",
                data: card
            })
        } catch (error) {
            res.status(error.status ?? 500).json({
                status: "fail",
                message: error.message
            })
        }
    }

    async fetchUserCards(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            const cards = await cardService.fetchUserCards(userId);
            res.status(200).json({
                status: "success",
                message: "cards has been fetched successfully",
                data: cards
            })
        } catch (error) {
            res.status(error.status ?? 500).json({
                status: "fail",
                message: error.message
            })
        }
    }
}