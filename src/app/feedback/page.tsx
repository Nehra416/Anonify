"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ArrowRight, Copy } from "lucide-react"

export default function FeedbackSuccessPage() {
    const router = useRouter()
    const [slug, setSlug] = useState("")
    const [secretKey, setSecretKey] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        const storedSlug = localStorage.getItem("slug")
        const storedKey = localStorage.getItem("secretKey")
        const storedUsername = localStorage.getItem("username")

        if (!storedSlug || !storedKey || !storedUsername) {
            toast.error("Something went wrong. Please try again.")
            router.replace("/create")
            return;
        }

        setSlug(storedSlug)
        setSecretKey(storedKey)
        setUsername(storedUsername)
    }, [])

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/f/${slug}`

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} copied!`)
    }

    return (
        <main className="min-h-[85vh] w-full bg-slate-50 dark:bg-neutral-950 px-6 sm:px-10 py-8 flex flex-col">
            {/* Content */}
            <section className="flex-grow flex flex-col justify-start text-left max-w-3xl mx-auto w-full">
                <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black via-neutral-700 to-black dark:from-white dark:via-neutral-400 dark:to-white mb-2">
                    Hello, {username} Your link is live now
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-md mt-3">
                    Share your unique link on any <span className="font-semibold italic">social platform</span> and start receiving <span className="font-medium">honest, anonymous feedback</span> — no logins required.
                </p>


                {/* Link */}
                <div className="mb-6">
                    <label className="text-sm text-gray-500 dark:text-neutral-400">Your Feedback Link</label>
                    <div className="flex items-center justify-between mt-1 bg-neutral-100 dark:bg-neutral-800 px-4 py-3 rounded-lg text-sm">
                        <span className="truncate">{link}</span>
                        <button
                            onClick={() => copyToClipboard(link, "Link")}
                            className="text-xs font-medium hover:underline"
                        >
                            <Copy className="w-4 h-4 hover:scale-110 transition cursor-pointer" />
                        </button>
                    </div>
                </div>

                {/* Secret Key */}
                <div className="mb-4">
                    <label className="text-sm text-gray-500 dark:text-neutral-400">Secret Recovery Key</label>
                    <div className="flex items-center justify-between mt-1 bg-neutral-100 dark:bg-neutral-800 px-4 py-3 rounded-lg text-sm">
                        <span className="truncate">{secretKey}</span>
                        <button
                            onClick={() => copyToClipboard(secretKey, "Secret Key")}
                            className="text-xs font-medium hover:underline"
                        >
                            <Copy className="w-4 h-4 hover:scale-110 transition cursor-pointer" />
                        </button>
                    </div>
                    <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                        ⚠️ Save this key securely. You’ll need it to access your dashboard if you lose your data.
                    </p>
                </div>

                {/* Dashboard Btn */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-8 w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold transition hover:opacity-90"
                >
                    View Dashboard <ArrowRight className="w-4 h-4" />
                </button>
            </section>
        </main>
    )
}
