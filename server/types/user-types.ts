import mongoose from "mongoose"
import { IncomingHttpHeaders } from 'http'
import { Request } from "express"

export default interface User {
    _id: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password: string
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface RegCredentials {
    name: string,
    email: string,
    password: string
}

export interface AuthenticatedRequest extends Request {
    user?: User,
    headers: IncomingHttpHeaders & {
        authorization?: string
    }
}

export interface DercyptedUser {
    user: User,
    iat: number
}