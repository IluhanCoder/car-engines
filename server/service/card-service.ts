import cardModel from "../models/cardModel";
import Detail from "../types/detail-types";

export default new class CardService {
    async createCard(data: Detail, name: string) {
        try {
            const currentTime = new Date();
            const newCard = {
                name,
                data,
                creationTime: currentTime,
                lastChangeTime: currentTime
            }
            await cardModel.create(newCard);
        }
        catch(error) {
            throw error;
        }
    }
}