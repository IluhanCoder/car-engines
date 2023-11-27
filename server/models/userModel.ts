import mongoose from "mongoose";

const userchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });

export default mongoose.model("User", userchema);