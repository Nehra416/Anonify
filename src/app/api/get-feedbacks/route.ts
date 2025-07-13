import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
    try {
        const { userId }: { userId: string } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: "UserId is not found" }, { status: 400 });
        }

        const user = await User.findById(userId).select("feedbacks");
        if (!user) {
            return NextResponse.json({ error: "Invalid userId" }, { status: 404 });
        }

        // Sorting the feedbacks by createdAt in latest to oldest order but pinned feedbacks should be at the first place(user.pinned === true) 
        const sortedFeedbacks = user.feedbacks.sort(
            (a: { createdAt: Date, pinned: boolean }, b: { createdAt: Date, pinned: boolean }) => {
                if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
                return b.createdAt.getTime() - a.createdAt.getTime();
            }
        );

        return NextResponse.json({
            success: true,
            feedbacks: sortedFeedbacks,
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