import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found – Anonify",
    description: "The page you're looking for doesn't exist. Try searching again or return to the homepage.",
    robots: {
        index: false,  // tells search engines not to index the 404 page.
    },
};

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-white dark:bg-neutral-950 text-center">
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-4">
                404
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-neutral-400 mb-6">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <p className="text-sm text-gray-500 dark:text-neutral-500 mb-8">
                It might have been removed or you mistyped the link.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:opacity-90 transition"
            >
                Go to Homepage
            </Link>
        </main>
    );
}
