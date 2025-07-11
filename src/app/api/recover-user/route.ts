import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { secretKey } = await request.json();
        if (!secretKey || secretKey.trim() === "") {
            return NextResponse.json({ error: "Provide the SecretKey" }, { status: 400 });
        }

        const user = await User.findOne({ secretKey });
        if (!user) {
            return NextResponse.json({ error: "Invalid secretKey" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            userId: user._id,
            slug: user.slug,
            message: "Account is Recovered!"
        })

    } catch (error) {
        console.error("Error in Recover the User:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }

}