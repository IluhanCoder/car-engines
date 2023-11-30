import { useEffect } from "react";
import { ReactElement } from "react";
import userStore from "../stores/userStore";
import userService from "../services/user-service";

interface LocalParams {
    children: ReactElement<any, any>
}

const AuthProvider = (params: LocalParams) => {
    const { children } = params;

    const checkAuth = async () => {
        await userService.checkAuth();
    }

    useEffect(() => {
        checkAuth();
    }, [userStore])

    return children
}

export default AuthProvider;