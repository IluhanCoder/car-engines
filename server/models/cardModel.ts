import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    name: String,
    creatorId: mongoose.Types.ObjectId,
    data: Object,
    creationTime: Date,
    lastChangesTime: Date
  });

export default mongoose.model("Card", cardSchema);