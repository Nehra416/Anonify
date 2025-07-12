import { dbConnection } from "@/config/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    dbConnection();
    try {
        const { feedback, browser, page, userId } = await request.json()

        if (!feedback || feedback.trim() === "") {
            return NextResponse.json(
                { error: "Feedback is required" },
                { status: 400 }
            )
        }

        const dataToSave: { feedback: string, browser?: string, page?: string, userId?: string } = { feedback }

        if (browser) dataToSave.browser = browser
        if (page) dataToSave.page = page
        if (userId) dataToSave.userId = userId

        await Feedback.create(dataToSave);

        return NextResponse.json({
            success: true,
        }, { status: 201 });

    } catch (error) {
        console.error("Error in Sending feedback for improvements:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}