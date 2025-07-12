"use client"

import { ShieldCheck, MessageSquareQuote, Globe, Link as LinkIcon, EyeOff, SearchCheck } from "lucide-react"

const features = [
    {
        title: "No App Required",
        icon: <Globe className="w-6 h-6 text-primary" />,
        desc: "No downloads or installs. Just tap your link in any browser and give feedback."
    },
    {
        title: "Instant Link, Instant Feedback",
        icon: <LinkIcon className="w-6 h-6 text-primary" />,
        desc: "Share your Anonify link anywhere — Instagram, WhatsApp, Snapchat — and start getting messages right away."
    },
    {
        title: "Truly Anonymous",
        icon: <EyeOff className="w-6 h-6 text-primary" />,
        desc: "No names. No logins. No trackers. Your friends can be brutally honest — and that's the point."
    },
    {
        title: "Real Talk, Real Emotions",
        icon: <MessageSquareQuote className="w-6 h-6 text-primary" />,
        desc: "From crush confessions to honest advice — Anonify gives people the courage to speak freely."
    },
    {
        title: "Privacy First, Always",
        icon: <ShieldCheck className="w-6 h-6 text-primary" />,
        desc: "We don’t ask for personal data. Your feedback stays secure, and under your control."
    },
    {
        title: "Premium Hints (Coming Soon)",
        icon: <SearchCheck className="w-6 h-6 text-primary" />,
        desc: "Want to guess who sent the message? Unlock subtle hints like timing, location, or device with premium."
    }
]

export default function Features() {
    return (
        <section className="px-6 py-20 bg-gray-100 dark:bg-neutral-900 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Anonify?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                The simplest way to receive honest, anonymous messages — better than others, no conditions, no logins.
            </p>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto text-left">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-102 transition duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {feature.icon}
                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
