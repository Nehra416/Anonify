import { dbConnection } from "@/config/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    dbConnection();
    try {
        const { userId, feedbackId, pin }: { userId: string; feedbackId: string; pin: boolean } = await req.json();

        // validate the userId, feedbackId and pin
        if (!userId || !feedbackId || typeof pin !== "boolean") {
            return NextResponse.json({ error: "Missing or invalid parameters" }, { status: 400 });
        }

        // Get the exact feedback object from the user's feedback array to update pin status by feedbackId
        const feedback = await Feedback.findOne({ _id: feedbackId, userId });
        if (!feedback) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        // Update the pin status of the feedback
        feedback.pinned = pin;
        await feedback.save();

        // Sorting the feedbacks by pinned(true -> false) and createdAt(latest to oldest). pinned feedbacks on the first place/priority
        const sortedFeedbacks = await Feedback.find({ userId }).sort({ pinned: -1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            pin,
            feedbacks: sortedFeedbacks || [],
            message: "Feedback Pinned Successfully",
        }, { status: 200 });
    } catch (error) {
        console.error("Pin Feedback Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
