import { dbConnection } from "@/config/dbConfig"
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

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        user.feedbacks = user.feedbacks.filter(
            (f: { _id: string }) => f._id.toString() !== feedbackId
        )

        await user.save()

        return NextResponse.json({ success: true, message: "Deleted" })
    } catch (error) {
        console.error("Error in Deleting the feedback:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
