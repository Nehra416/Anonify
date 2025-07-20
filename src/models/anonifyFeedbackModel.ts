import mongoose from "mongoose";

const anonifyFeedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    browser: {
        type: String
    },
    page: {
        type: String
    },
    userId: {
        type: String
    }
});

const AnonifyFeedback = mongoose.models.anonifyFeedback || mongoose.model("anonifyFeedback", anonifyFeedbackSchema);
export default AnonifyFeedback;