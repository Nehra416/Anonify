import mongoose from "mongoose";

const anonifyContactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    browser: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


const AnonifyContact = mongoose.models.anonifyContact || mongoose.model("anonifyContact", anonifyContactSchema);
export default AnonifyContact;