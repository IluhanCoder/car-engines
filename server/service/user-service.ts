import AuthError from "../errors/authError";
import userModel from "../models/userModel";
import User, { LoginCredentials, RegCredentials } from "../types/user-types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default new class UserService {
    async register(credentials: RegCredentials) {
        try {
            const hashedPassword = await bcrypt.hash(credentials.password, 2);
            const candidate = await userModel.findOne({email: credentials.email});
            if(candidate) throw new AuthError("користувач з таким email вже створений", 400)
            await userModel.create({...credentials, password: hashedPassword});
        } catch (error) {
            throw error;
        }
    }

    async login(credentials: LoginCredentials) {
        try {
            const loginCandidate: User = await userModel.findOne({email: credentials.email});
            if (loginCandidate === null) throw new AuthError("користувача з таким email не було знайдено", 400);
            const passwordIsRight = await bcrypt.compare(credentials.password, loginCandidate.password);
            if(!passwordIsRight) throw new AuthError("неправильний пароль або email", 400);
            const TOKEN_KEY = process.env.TOKEN_KEY;
            const token = jwt.sign({user: loginCandidate}, TOKEN_KEY);
            return token;
        } catch (error) {
            throw error;
        }
    }

    async auth(token: string) {
        try {
            const TOKEN_KEY = process.env.TOKEN_KEY;
            const decryptedUser = jwt.verify(token, TOKEN_KEY);
            return decryptedUser;
        } catch (error) {
            throw error;
        }
    }
}