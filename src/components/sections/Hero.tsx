"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export default function Hero() {
    const router = useRouter()
    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight ">
                Get the Truth, Not Just Likes.
            </h1>
            <p className="text-lg max-w-2xl text-gray-500 dark:text-gray-400 mb-6">
                Receive 100 % anonymous feedback from friends, followers, or teammates.
                No signups, no pressure — just pure honesty in one link.
            </p >
            <Button onClick={() => router.push("/create")} className="px-6 py-4 text-lg rounded-xl shadow-md hover:scale-102 transition duration-200">
                Create Feedback Link
            </Button>
        </section >
    )
}
