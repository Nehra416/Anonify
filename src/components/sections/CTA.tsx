"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CTA() {
    const router = useRouter()
    return (
        <section className="pt-16 pb-10 text-center px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Start Receiving Anonymous Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your unique link and share it with friends.
            </p>
            <Button onClick={() => router.push("/create")} className="px-6 py-3 text-lg rounded-xl shadow hover:scale-102 transition duration-200">
                Get My Link
            </Button>
        </section>
    )
}
