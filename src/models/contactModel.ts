import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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


const Contact = mongoose.models.contacts || mongoose.model("contacts", contactSchema);
export default Contact;