"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"
import axios from "axios"
import { Loader2 } from "lucide-react"
import Footer from "@/components/sections/Footer"

export default function FeedbackForm() {
    const [feedback, setFeedback] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!feedback.trim()) {
            toast.error("Please write your feedback")
            return
        }

        const browser = navigator.userAgent
        const page = window.location.pathname
        const userId = localStorage.getItem("userId")

        try {
            setLoading(true)
            await axios.post("/api/improve", { feedback, browser, page, userId })
            setFeedback("")
            toast.success("Thanks for improving Anonify 💖")
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className="min-h-[40vh] md:min-h-[90vh] px-6 py-16 bg-gray-100 dark:bg-neutral-900 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Help Us To Make Anonify Better 🚀
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
                    Share missing features, suggestions, or improvements you would love to see.
                    Your feedback shapes the future of this platform.
                </p>

                <div className="max-w-2xl mx-auto mt-4 p-5 bg-neutral-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-xl shadow">
                    <Textarea
                        placeholder="What can we improve? Any suggestions or missing features?"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mb-4 min-h-[120px] resize-none"
                    />
                    <div className="flex justify-end">
                        <Button onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </span>
                            ) : (
                                "Submit Feedback"
                            )}
                        </Button>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </>
    )
}
