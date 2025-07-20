import { dbConnection } from "@/config/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    dbConnection();
    try {
        const { userId }: { userId: string } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: "UserId is not found" }, { status: 400 });
        }

        // Sorting the feedbacks by pinned(true -> false) and createdAt(latest to oldest). pinned feedbacks on the first place/priority
        const sortedFeedbacks = await Feedback.find({ userId }).sort({ pinned: -1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            feedbacks: sortedFeedbacks || [],
            message: "All Feedbacks Fetched!",
        }, { status: 200 });

    } catch (error) {
        console.error("Error in Getting all feedbacks:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}