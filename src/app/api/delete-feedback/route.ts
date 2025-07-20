import { dbConnection } from "@/config/dbConfig"
import Feedback from "@/models/feedbackModel"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"


export async function POST(request: NextRequest) {
    dbConnection();
    try {
        const { userId, feedbackId }: { userId: string; feedbackId: string } = await request.json()

        if (!userId || !feedbackId) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
        }

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(feedbackId)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
        }

        // Delete the feedback of the user
        const feedback = await Feedback.deleteOne({ _id: feedbackId, userId })

        // If feedback not found, return error response
        if (!feedback) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 })
        }

        // Decrease the total feedback of the user
        await User.updateOne({ _id: userId }, { $inc: { totalFeedback: -1 } })

        return NextResponse.json({ success: true, message: "Deleted" })
    } catch (error) {
        console.error("Error in Deleting the feedback:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
