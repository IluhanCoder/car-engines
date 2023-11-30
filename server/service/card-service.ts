import mongoose from "mongoose";
import cardModel from "../models/cardModel";
import Detail from "../types/detail-types";

export default new class CardService {
    async createCard(data: Detail[], name: string, creatorId: string) {
        try {
            const currentTime = new Date();
            const newCard = {
                name,
                data,
                creationTime: currentTime,
                lastChangeTime: currentTime,
                creatorId: new mongoose.Types.ObjectId(creatorId)
            }
            await cardModel.create(newCard);
        }
        catch(error) {
            throw error;
        }
    }

    async updateCard(data: Detail[], cardId: string) {
        try {
            const convertedId = new mongoose.Types.ObjectId(cardId);
            await cardModel.findOneAndUpdate({_id: convertedId}, {data, lastChangesTime: new Date()});
        } catch (error) {
            throw error;
        }
    }

    async getCard(cardId: string) {
        try {
            const convertedId = new mongoose.Types.ObjectId(cardId);
            return await cardModel.findById(convertedId);
        } catch (error) {
            throw error;
        }
    }

    async fetchUserCards(userId: string) {
        try {
            const convertedId = new mongoose.Types.ObjectId(userId);
            return await cardModel.find({creatorId: convertedId});
        } catch (error) {
            throw error;
        }
    }
}