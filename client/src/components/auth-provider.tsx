import { useEffect } from "react";
import { ReactElement } from "react";
import userStore from "../stores/userStore";
import userService from "../services/user-service";
import NoAuthPage from "../pages/no-auth-page";
import LoadingScreen from "./loading-screen";
import { observer } from "mobx-react-lite";

interface LocalParams {
    children: ReactElement<any, any>
}

const AuthProvider = (params: LocalParams) => {
    const { children } = params;

    const checkAuth = async () => {
        try {
            await userService.checkAuth();
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        checkAuth();
    }, [userStore])

    if(userStore.user) return children;
    if(userStore.user === null) return <NoAuthPage/>
    else return <LoadingScreen/>
}

export default observer(AuthProvider);