import $api from "../axios-setup";
import userStore from "../stores/userStore";
import Detail from "../types/detail-type";

export default new class CardService {
    async createCard(data: Detail[], name: string) {
        const userId = userStore.user?._id;
        await $api.post(`/card/${userId}`, {data, name});
    }

    async updateCard(data: Detail[], cardId: string) {
        await $api.post(`/card-update/${cardId}`, {data})
    }

    async fetchUserCards(userId: string) {
        return (await $api.get(`cards/${userId}`)).data;
    }

    async getCard(cardId: string) {
        return (await $api.get(`card/${cardId}`)).data;
    }

    async deleteCard(cardId: string) {
        await $api.delete(`card/${cardId}`);
    }
}