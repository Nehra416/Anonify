import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: "UserId is not found" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "Invalid userId" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            feedbacks: user.feedbacks,
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