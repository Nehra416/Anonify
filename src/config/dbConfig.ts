import mongoose from "mongoose";

let isConnected = false;

export async function dbConnection() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        isConnected = true;
        console.log("MongoDb Connected");

    } catch (error) {
        console.error("Something went wrong in connecting with DB" + error);
        process.exit();
    }
}