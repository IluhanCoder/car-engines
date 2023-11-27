import { IncomingHttpHeaders } from 'http'
import { Request } from "express"
import ResponseType from './response-type'

export default interface User {
    _id: string,
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

export interface LoginResponse extends ResponseType {
    token: string
}