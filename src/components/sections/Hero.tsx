"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { LayoutDashboard, Link } from "lucide-react"
import { useAuth } from "@/context/authContext"

export default function Hero() {
    const router = useRouter()
    const { isLoggedIn } = useAuth();

    return (
        <section className="md:min-h-[95vh] min-h-[90vh] md:-mt-5 -mt-16 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-black via-neutral-700 to-black dark:from-white dark:via-neutral-400 dark:to-white">
                Get the Truth, Not Just Likes.
            </h1>
            <p className="text-lg max-w-2xl text-gray-500 dark:text-gray-400 mb-6">
                Receive 100 % anonymous feedback from friends, followers, or teammates.
                No signups, no pressure — just pure honesty in one link.
            </p >
            {
                isLoggedIn ?
                    <Button onClick={() => router.push("/me")} className="group px-6 py-4 text-lg rounded-xl shadow-md">
                        <span className="group-hover:rotate-180 transition-all duration-200"><LayoutDashboard className="w-5 h-5" /></span>
                        Go to Dashboard
                    </Button>
                    :
                    <Button onClick={() => router.push("/create")} className="group px-6 py-4 text-lg rounded-xl shadow-md">
                        <span className="group-hover:rotate-180 transition-all duration-200"><Link className="w-4 h-4" /></span>
                        Create Feedback Link
                    </Button>
            }

            {/* Show recover your account link */}
            {
                !isLoggedIn && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-5 flex flex-col md:flex-row md:gap-2 gap-1">
                        Already have an account? <button onClick={() => router.push("/recover")} className="text-blue-500 hover:text-blue-600">Recover your account</button>
                    </p>
                )
            }

            {/* Note:- section */}
            <p className="text-sm text-gray-500 dark:text-gray-400 absolute px-1 md:bottom-2 bottom-3">
                <span className="font-bold">Note: </span>
                Anonify is in beta. Your feedback shapes the future of this platform 🚀
            </p>
        </section >
    )
}
