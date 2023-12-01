import express from 'express';
import mongoose from 'mongoose';
import userController from './controller/user-controller';
import dotenv from "dotenv";
import router from './router';
import cors from "cors";
dotenv.config();

const DB_CONN = process.env.DB_CONN!;
mongoose.connect(DB_CONN);

const app = express();

app.use(cors({
    origin: process.env.API_URL
}));

app.use(express.json());

app.get("/user/:token",userController.getUser)
app.post("/user", userController.register);

app.post("/login", userController.login);
app.post("/registration", userController.register);

app.use(userController.auth);

app.use(router);

app.listen(5000, () => console.log("server has been started"));