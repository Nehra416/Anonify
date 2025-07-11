import { dbConnection } from "@/config/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

dbConnection()

export async function POST(request: NextRequest) {
    try {
        const { userId }: { userId: string } = await request.json()
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 })
        }

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        user.feedbacks = []
        await user.save()

        return NextResponse.json({ success: true, message: "All feedbacks deleted" })
    } catch (error) {
        console.error("Error in Deleting all feedbacks:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
