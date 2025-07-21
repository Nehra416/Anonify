import { dbConnection } from "@/config/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    dbConnection();
    try {
        const { userId, filter }: { userId: string, filter: string } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: "UserId is not found" }, { status: 400 });
        }

        let sortedFeedbacks = [];
        // Sorting the feedbacks according to the filter 
        if (filter === "recent") {
            sortedFeedbacks = await Feedback.find({ userId }).sort({ pinned: -1, createdAt: -1 });
        } else if (filter === "oldest") {
            sortedFeedbacks = await Feedback.find({ userId }).sort({ pinned: -1, createdAt: 1 });
        } else if (filter === "favorite") {
            sortedFeedbacks = await Feedback.find({ userId, like: true }).sort({ pinned: -1, createdAt: -1 });
        }

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