import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
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

const Feedback = mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);
export default Feedback;