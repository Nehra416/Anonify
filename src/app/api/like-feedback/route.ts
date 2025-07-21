import { NextRequest, NextResponse } from "next/server";
import Feedback from "@/models/feedbackModel";
import { dbConnection } from "@/config/dbConfig";

export async function GET(request: NextRequest) {
    dbConnection();
    try {
        const feedbackId = request.nextUrl.searchParams.get("feedbackId");
        if (!feedbackId) {
            return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
        }

        // Get feedback by id
        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        // toggle the like status
        feedback.like = !feedback.like;
        await feedback.save();

        return NextResponse.json({
            success: true,
            feedback: feedback,
            message: feedback.like ? "Feedback liked!" : "Feedback unliked!"
        }, { status: 200 });

    } catch (error) {
        console.error("Error in toggling feedback like:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}