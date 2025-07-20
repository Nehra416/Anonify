import { dbConnection } from "@/config/dbConfig";
import AnonifyContact from "@/models/anonifyContactModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    dbConnection();
    try {
        const { name, email, message, browser } = await request.json()

        if (!message || message.trim() === "") {
            return NextResponse.json({ error: "Message is required" }, { status: 400 })
        }

        const dataToSave: { name?: string, email?: string, message: string, browser?: string } = { message }

        if (browser) dataToSave.browser = browser
        if (name) dataToSave.name = name
        if (email) dataToSave.email = email

        await AnonifyContact.create(dataToSave)

        return NextResponse.json({
            success: true,
        }, { status: 201 })

    } catch (error) {
        console.error("Error in Sending message for contact:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}