import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    dbConnection();
    try {
        const { userId, feedbackId, pin }: { userId: string; feedbackId: string; pin: boolean } = await req.json();

        // validate the userId, feedbackId and pin
        if (!userId || !feedbackId || typeof pin !== "boolean") {
            return NextResponse.json({ error: "Missing or invalid parameters" }, { status: 400 });
        }

        // Get the user from userId
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get the exact feedback object from the user's feedback array to update pin status by feedbackId
        const feedback = user.feedbacks.id(feedbackId);
        if (!feedback) {
            return NextResponse.json({ error: "Feedback not found for pin" }, { status: 404 });
        }

        // Update the pin status of the feedback
        feedback.pinned = pin;
        await user.save();

        // Sorting the feedbacks by createdAt in latest to oldest order but pinned feedbacks should be at the first place(user.pinned === true)
        const sortedFeedbacks = user.feedbacks.sort((a: { createdAt: Date, pinned: boolean }, b: { createdAt: Date, pinned: boolean }) => {
            if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
            return b.createdAt.getTime() - a.createdAt.getTime();
        });

        return NextResponse.json({
            success: true,
            pin,
            feedbacks: sortedFeedbacks
        });
    } catch (error) {
        console.error("Pin Feedback Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
