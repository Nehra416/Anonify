import { dbConnection } from "@/config/dbConfig"
import Feedback from "@/models/feedbackModel"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
    dbConnection();
    try {
        const { userId }: { userId: string } = await request.json()
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 })
        }

        // delete all feedbacks of the user
        await Feedback.deleteMany({ userId })

        // update the total feedback of the user
        await User.updateOne({ _id: userId }, { $set: { totalFeedback: 0 } })

        return NextResponse.json({ success: true, message: "All feedbacks deleted" })
    } catch (error) {
        console.error("Error in Deleting all feedbacks:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
