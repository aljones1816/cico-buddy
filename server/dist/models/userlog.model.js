import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userlogSchema = new Schema({
    breakfast: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
    },
    lunch: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
    },
    dinner: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
    },
    snacks: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
    },
    exercise: { calories: { type: Number, default: 0 } },
    bodyweight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    user_id: { type: String, required: true },
}, {
    timestamps: true,
});
const Userlog = mongoose.model("Userlog", userlogSchema);
export { Userlog };
