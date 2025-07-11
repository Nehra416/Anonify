import { dbConnection } from "@/config/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

dbConnection()

export async function POST(request: NextRequest) {
    try {
        const { slug }: { slug: string } = await request.json()

        if (!slug || slug.trim() === "") {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 })
        }

        const user = await User.findOne({ slug })
        if (!user) {
            return NextResponse.json({ error: "Invalid Slug" }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            username: user.username,
        })
    } catch (error) {
        console.error("Error in Get User by Slug:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
