import { makeAutoObservable } from "mobx"
import User from "../types/user-types"

export default new class UserStore {
    user: User | null | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(userData: User) {
        this.user = {...userData};
    }

    resetUser() {
        this.user = null;
    }
}