import userService from "../service/user-service";
import { NextFunction, Request, Response } from "express";
import User, { AuthenticatedRequest } from "../types/user-types";
import AuthError from "../errors/authError";

export default new class UserController {
    async register(req: Request, res: Response) {
        const {credentials} = req.body;
        await userService.register(credentials);
        res.status(200).json({
            status: "success",
            message: "account has been created successfully"
        });
    }

    async login(req: Request, res: Response) {
        try {
            const {credentials} = req.body;
            const token = await userService.login(credentials);
            res.status(200).json({
                status: "success",
                message: "user logined successfully",
                token
            });
        } catch (error) {
            res.status(error.status ?? 500).json({
                status: "fail",
                message: error.message
            })
        }
    }

    async auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const {authorization} = req.headers;
            if (!authorization) {
                throw new AuthError("Unauthorized", 401);
            }
            const token = authorization.split(' ')[1];
            //fix typing, obtain any
            const user: User = (await userService.auth(token) as any).user;
            if(!user) {
                throw new AuthError("Unauthorized", 401);
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(error.status ?? 500).json({
                status: "fail",
                message: error.message
            })
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const {token} = req.params;
            const user: User = (await userService.auth(token) as any).user;
            res.status(200).json({
                status: "success",
                message: "користувача знайдено",
                user
            });
        } catch (error) {
            res.status(error.status ?? 500).json({
                status: "fail",
                message: error.message
            })
        }
    }
}