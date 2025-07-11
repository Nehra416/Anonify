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
    feedbacks: {
        type: [
            {
                message: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
        default: [],
    }

});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;