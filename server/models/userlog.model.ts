import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userlogSchema = new Schema(
  {
    username: { type: String, required: true },
    breakfast: { type: Number, default: 0 },
    lunch: { type: Number, default: 0 },
    dinner: { type: Number, default: 0 },
    snacks: { type: Number, default: 0 },
    exercise: { type: Number, default: 0 },
    bodyweight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now, required: true },
  },
  {
    timestamps: true,
  }
);

const Userlog = mongoose.model("Userlog", userlogSchema);

module.exports = Userlog;
