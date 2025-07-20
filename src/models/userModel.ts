import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    secretKey: {
        type: String,
        required: true,
    },
    totalFeedback: {
        type: Number,
        default: 0
    }

});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;