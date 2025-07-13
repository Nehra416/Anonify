"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, SendHorizonal } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"

export default function ContactSection() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!message.trim()) {
            toast.error("Please enter your message.")
            return
        }

        setLoading(true)
        try {
            const res = await axios.post("/api/contact", { name, email, message, browser: window.navigator.userAgent })
            if (res.data.success) {
                toast.success("Message sent successfully!")
                setName("")
                setEmail("")
                setMessage("")
            } else {
                toast.error(res.data.error || "Something went wrong.")
            }
        } catch {
            toast.error("Failed to send message.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="pb-12 pt-10 px-4 bg-gray-100 dark:bg-neutral-900">
            <div className="max-w-2xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-semibold">The Inbox Is Always Open</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Have a question, need help, or just want to talk? We’re here for it.
                </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Your Name (optional)</span>
                    <Input
                        placeholder="e.g. Nehra"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-neutral-50 "
                    />
                </div>

                <div>
                    <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Your Email (optional)</span>
                    <Input
                        type="email"
                        placeholder="nehra@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-neutral-50 "
                    />
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400 italic">
                        If you want a reply, please provide your valid email
                    </p>
                </div>

                <div>
                    <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Your Message</span>
                    <Textarea
                        rows={5}
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-neutral-50"
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 hover:scale-[1.01] transition"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <SendHorizonal className="w-4 h-4" />
                            Send Message
                        </>
                    )}
                </Button>
            </div>
        </section>
    )
}
