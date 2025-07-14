import type { Metadata } from "next";
import { fetchUserBySlug } from "@/lib/fetchUserBySlug";
import PublicFeedbackClient from "./PublicFeedbackClient";

// generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const user = await fetchUserBySlug(slug);

    return {
        title: `${user.name}'s Anonymous Feedback – Anonify`,
        description: `Leave anonymous feedback for ${user.name}`,
        openGraph: {
            title: `${user.name} | Anonify`,
            url: `https://anonify.chat/f/${slug}`,
        },
        twitter: {
            title: `${user.name}'s Feedback | Anonify`,
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
