import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    dbConnection();
    try {
        const { message, slug }: { message: string; slug: string } = await request.json()
        if (!message || message.trim() === "") {
            return NextResponse.json({ error: "Provide a message" }, { status: 400 });
        }

        if (!slug || slug.trim() === "") {
            return NextResponse.json({ error: "Provide Slug" }, { status: 400 });
        }

        const user = await User.findOne({ slug });
        if (!user) {
            return NextResponse.json({ error: "Invalid link" }, { status: 400 });
        }

        await User.findOneAndUpdate({ slug }, {
            $push: {
                feedbacks: {
                    message: message.trim()
                },
            },
        })

        return NextResponse.json({
            success: true,
            message: "Feedback Submitted!",
        }, { status: 200 });

    } catch (error) {
        console.error("Error in Sending feedback:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}