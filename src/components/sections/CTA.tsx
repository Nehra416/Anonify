"use client"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Link } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CTA() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <section className="pt-16 pb-14 text-center px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Start Receiving Anonymous Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your unique link and share it with friends.
            </p>
            {
                isLoggedIn ?
                    <Button onClick={() => router.push("/me")} className="group px-6 py-3 text-lg rounded-xl shadow">
                        <span className="group-hover:rotate-180 transition-all duration-200"><LayoutDashboard className="w-4 h-4" /></span>
                        Dashboard
                    </Button>
                    :
                    <Button onClick={() => router.push("/create")} className="group px-6 py-3 text-lg rounded-xl shadow">
                        <span className="group-hover:rotate-180 transition-all duration-200"><Link className="w-4 h-4" /></span>
                        Create Feedback Link
                    </Button>
            }
        </section>
    )
}
