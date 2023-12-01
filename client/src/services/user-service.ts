import $api, { dropHeaderAndToken, setHeader } from "../axios-setup";
import userStore from "../stores/userStore";
import User, { LoginCredentials, LoginResponse } from "../types/user-types";

export default new class UserService {
    async login(credentials: LoginCredentials) {
        try {
            const response: LoginResponse = (await $api.post("/login",{credentials})).data;
            if(response.status == "success") {
                localStorage.setItem("token", response.token);
                await this.checkAuth();
            }
            return {
                message: response.message,
                status: response.status
            }
        }
        catch (error) {
            throw error; 
        }
    }

    async checkAuth() {
        try {
            const token = localStorage.getItem("token");
            if(token) {
                setHeader(token);
                const user: User = (await $api.get(`/user/${token}`)).data.user;
                userStore.setUser({...user});
            }
            else {
                dropHeaderAndToken();
                userStore.resetUser();
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            dropHeaderAndToken();
        } catch (error) {
            throw error;
        }
    }
}