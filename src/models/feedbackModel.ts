import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    pinned: {
        type: Boolean,
        default: false
    },
    like: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Feedback = mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);
export default Feedback;