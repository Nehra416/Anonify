import { Metadata } from "next";
import FAQClient from "@/components/sections/FAQClient";

export const metadata: Metadata = {
    title: "FAQ – Anonify",
    description: "Find answers to frequently asked questions about using Anonify to send and receive anonymous feedback globally.",
};

export default function FAQPage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6 text-gray-900 dark:text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                Frequently Asked Questions
            </h1>
            <p className="text-center text-gray-600 dark:text-neutral-400 mb-10">
                Everything you need to know about using Anonify.
            </p>

            <FAQClient />
        </main>
    );
}
