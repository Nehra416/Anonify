"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
import { Link, Loader2 } from "lucide-react"
import { useAuth } from "@/context/authContext"

export default function CreatePage() {
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { setIsLoggedIn, setUserData } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim())
            return toast.error("Please enter a name");
        if (inputValue.length < 3 || inputValue.length > 20)
            return toast.error("Name must be btw 3 to 20 char");

        try {
            setLoading(true);
            const res = await axios.post("/api/create-link", { username: inputValue })

            if (!res.data.success)
                return toast.error(res.data.error || "Something went wrong")

            // set the user data in local storage
            localStorage.setItem("userId", res.data.userId)
            localStorage.setItem("username", res.data.username)
            localStorage.setItem("slug", res.data.slug)
            localStorage.setItem("secretKey", res.data.secretKey)

            // update the global user data
            setUserData({
                userId: res.data.userId,
                username: res.data.username,
                slug: res.data.slug,
                secretKey: res.data.secretKey,
            });
            setIsLoggedIn(true);

            router.push("/feedback");
        } catch (error) {
            toast.error("Failed to create link");
            console.error("Error in Submit Form: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[85vh] w-full bg-slate-50 dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300 px-6 py-10 flex flex-col justify-center">
            <div className="max-w-2xl w-full mx-auto text-center space-y-8">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black via-neutral-700 to-black dark:from-white dark:via-neutral-400 dark:to-white">
                        Create Your Feedback Link
                    </h1>
                    <p className="mt-4 text-sm text-gray-600 dark:text-neutral-400 max-w-md mx-auto">
                        Enter a name or nickname to generate your unique anonymous feedback link.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto w-full">
                    <input
                        type="text"
                        placeholder="Enter your name or username"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="px-5 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black flex justify-center font-medium hover:opacity-90 transition disabled:opacity-60"
                    >
                        {
                            loading ?
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating...
                                </span>
                                :
                                <span className="flex items-center gap-2">
                                    <Link className="w-5 h-5 group-hover:rotate-180 transition-all duration-200" />
                                    Generate My Link
                                </span>
                        }
                    </button>
                </form>

                <div className="pt-4 text-xs text-gray-500 dark:text-neutral-500">
                    You will get a private key to recover your dashboard. Do not lose it!
                </div>
            </div>
        </div>
    )
}
