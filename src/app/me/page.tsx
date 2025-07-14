"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
import { Copy, MoreVertical, Pin, PinOff, RefreshCcw, Share2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/authContext"

interface Feedback {
    _id: string;
    message: string;
    pinned: boolean;
    createdAt: string;
}

export default function DashboardPage() {
    const router = useRouter()
    const { userData, isInitialized } = useAuth();
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingAll, setDeletingAll] = useState(false)
    const [deletingSingle, setDeletingSingle] = useState<string | null>(null)

    useEffect(() => {
        // Wait unitil the userData is initialized or loaded from local storage
        if (!isInitialized) return;

        if (!userData.slug || !userData.secretKey || !userData.userId || !userData.username) {
            toast.error("Session expired. Please recover your account.")
            router.replace("/recover")
            return
        }

        fetchFeedbacks(userData.userId)
    }, [isInitialized, userData])

    const fetchFeedbacks = async (userId: string) => {
        try {
            setLoading(true)
            const res = await axios.post("/api/get-feedbacks", { userId })
            if (res.data.success) {
                setFeedbacks(res.data.feedbacks)
            }
        } catch {
            toast.error("Failed to load feedbacks")
        } finally {
            setLoading(false)
        }
    }

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/f/${userData.slug}`

    const copy = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} copied!`)
    }

    const deleteFeedback = async (id: string) => {
        setDeletingSingle(id)
        try {
            await axios.post("/api/delete-feedback", { userId: userData.userId, feedbackId: id })
            setFeedbacks((prev) => prev.filter((f) => f._id !== id))
            toast.success("Deleted")
        } catch {
            toast.error("Delete failed")
        } finally {
            setDeletingSingle(null)
        }
    }

    const deleteAllFeedbacks = async () => {
        if (feedbacks.length === 0)
            return toast.error("No feedbacks to delete")

        setDeletingAll(true)
        try {
            const res = await axios.post("/api/delete-all-feedback", { userId: userData.userId })
            if (res.data.success) {
                setFeedbacks([])
                toast.success("All feedbacks deleted")
            }
        } catch {
            toast.error("Failed to delete all feedbacks")
        } finally {
            setDeletingAll(false)
        }
    }

    const pinFeedback = async (id: string, pin: boolean) => {
        try {
            const res = await axios.post("/api/pin-feedback", { userId: userData.userId, feedbackId: id, pin: !pin })
            if (res.data.success) {
                setFeedbacks(res.data.feedbacks);
                toast.success(res.data.pin ? "Pinned to top!" : "Unpinned");
            }

        } catch (error) {
            toast.error("Failed to pin feedback")
            console.log(error);
        }
    }

    return (
        <main className="min-h-[85vh] w-full px-4 sm:px-6 md:px-10 py-10 bg-slate-50 dark:bg-neutral-950 text-black dark:text-white">
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
                {/* Heading */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-black ">
                        Welcome back, {userData.username}
                    </h1>

                    <Button
                        variant="secondary"
                        className="flex items-center gap-2 hover:scale-[1.02] hover:shadow-md shadow dark:shadow-white/5"
                        onClick={() => copy(userData.secretKey, "Recovery Key")}
                    >
                        <Copy className="w-4 h-4" /> Copy Recovery Key
                    </Button>
                </header>

                {/* Feedback Link */}
                <section className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:shadow-md dark:shadow-white/5 transition">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-neutral-400 mb-1">
                                Your Feedback Link
                            </p>
                            <p className="font-medium text-sm truncate text-black dark:text-white">
                                {link}
                            </p>
                        </div>
                        <Button onClick={() => copy(link, "Link")} className="flex items-center gap-2 ">
                            <Share2 className="w-4 h-4" /> Copy Link
                        </Button>
                    </div>
                </section>

                {/* Feedbacks */}
                <section className="mt-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                        <div className="flex items-center justify-center gap-3">
                            <h2 className="text-xl font-semibold">Your Feedbacks ({feedbacks.length})</h2>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="outline" className="p-1 group"
                                        onClick={() => fetchFeedbacks(userData.userId)}
                                    >
                                        <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-all duration-300" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Refresh</p>
                                </TooltipContent>
                            </Tooltip>

                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Faviorate">Faviorate</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                    <SelectItem value="recent">Recent</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="destructive"
                                className="hover:scale-[1.02]"
                                onClick={deleteAllFeedbacks}
                                disabled={deletingAll}
                            >
                                {deletingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete All"}
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                    ) : feedbacks.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            No feedback yet. Share your link to get responses.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {feedbacks.map((feed) => (
                                <div
                                    key={feed._id}
                                    className="relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4 rounded-xl hover:shadow-md dark:shadow-white/5 transition"
                                >
                                    <div className="absolute top-2 right-2 flex items-center gap-1">
                                        {
                                            feed.pinned &&
                                            <span className="text-xs font-medium italic text-green-600 dark:text-green-400">Pinned</span>
                                        }
                                        {/* Drop Down Menu for pin or delete a specific feedback */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="focus:outline-none">
                                                <MoreVertical className="w-4 h-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => pinFeedback(feed._id, feed.pinned)}
                                                    className="flex items-center gap-2"
                                                >
                                                    {
                                                        feed.pinned ? (
                                                            <PinOff className="w-4 h-4" />
                                                        ) : (
                                                            <Pin className="w-4 h-4" />
                                                        )
                                                    }
                                                    {feed.pinned ? "Unpin" : "Pin"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => deleteFeedback(feed._id)}
                                                    disabled={deletingSingle === feed._id}
                                                    className="flex items-center gap-2"
                                                >
                                                    {
                                                        deletingSingle === feed._id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )
                                                    }
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-sm mb-2 break-words whitespace-pre-line">{feed.message}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(feed.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
