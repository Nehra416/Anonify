import type { Metadata } from "next";
import { fetchUserBySlug } from "@/lib/fetchUserBySlug";
import PublicFeedbackClient from "./PublicFeedbackClient";

// generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const user = await fetchUserBySlug(slug);

    return {
        title: `${user.name} – Anonymous Feedback | Anonify`,
        description: `Send anonymous feedback to ${user.name} securely and easily.`,
        openGraph: {
            title: `${user.name} – Feedback | Anonify`,
            url: `https://anonify.chat/f/${slug}`,
        },
        twitter: {
            title: `${user.name} – Anonymous Feedback | Anonify`,
        },
    };
}

// page component
export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <PublicFeedbackClient slug={slug} />;
}
