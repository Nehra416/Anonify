"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Link, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function PublicFeedbackClient({ slug }: { slug: string }) {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.post("/api/get-user-by-slug", { slug });
                if (res.data.success) setUsername(res.data.username);
                else throw new Error(res.data.error);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.error || "User not found");
                } else if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchUser();
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = message.trim();
        if (!trimmed) {
            toast.error("Please write a message first");
            return;
        }

        setSending(true);
        try {
            const res = await axios.post("/api/send-feedback", { slug, message: trimmed });
            if (res.data.success) {
                toast.success("Feedback submitted! 🎉");
                setMessage("");
            } else {
                throw new Error(res.data.error);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Failed to send");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg text-gray-500 dark:text-neutral-300">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen px-6 sm:px-8 py-10 bg-slate-50 dark:bg-neutral-950 text-black dark:text-white">
            {/* Feedback Section */}
            <div className="max-w-2xl w-full mx-auto">
                <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black via-neutral-700 to-black dark:from-white dark:via-neutral-400 dark:to-white mb-2">
                    Leave anonymous feedback for <span className="italic">{username}</span>
                </h1>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-6">
                    Your identity will not be shared. Share your honest thoughts here.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        rows={5}
                        maxLength={200}
                        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                        placeholder="Type your honest feedback here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                        {message.trim().length}/200
                    </div>

                    <Button
                        type="submit"
                        disabled={sending}
                        className="w-full sm:w-auto flex items-center gap-2"
                    >
                        {sending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Feedback
                            </>
                        )}
                    </Button>
                </form>
            </div>

            {/* For Other users */}
            <section className="mt-10 border-t border-gray-200 dark:border-neutral-800 pt-7 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                    Want to receive feedback like this?
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Get your own anonymous feedback link and start hearing what people really think.
                </p>
                <Button
                    onClick={() => router.push("/create")}
                    className="px-6 py-3 font-semibold flex items-center justify-center mx-auto"
                >
                    <Link className="w-4 h-4" />
                    Create Your Link
                </Button>
            </section>
        </main>
    )
}
