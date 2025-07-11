import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
    try {
        const { username }: { username: string } = await request.json()
        if (!username || username.trim() === "") {
            return NextResponse.json({ error: "Provide a username" }, { status: 400 });
        }

        const id = nanoid(6);
        const slug = `${username}-${id}`;
        const secretKey = nanoid();

        const newUser = await User.create({
            username: username.trim(),
            slug,
            secretKey
        });

        return NextResponse.json({
            success: true,
            slug,
            userId: newUser._id,
            username: newUser.username,
            secretKey,
            link: `${process.env.NEXT_PUBLIC_BASE_URL}/f/${slug}`,
            message: "Link Created Successfully",
        }, { status: 201 });

    } catch (error) {
        console.error("Error in creating link:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }

}