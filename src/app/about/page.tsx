import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About – Anonify",
    description: "Learn more about Anonify, the platform that empowers honest and anonymous communication across the world.",
};

export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16 text-gray-900 dark:text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">About Anonify</h1>
            <p className="text-center text-gray-600 dark:text-neutral-400 mb-10">
                Empowering people to speak freely, honestly, and anonymously — everywhere.
            </p>

            <section className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-neutral-300">
                <p>
                    Anonify is a simple, secure platform that allows users to receive anonymous feedback from anyone around the world.
                    Whether you&apos;re a creator, team lead, teacher, student, or professional — Anonify helps you gather honest input without revealing the sender&apos;s identity.
                </p>

                <p>
                    We believe in transparent communication. In a world full of noise, anonymity enables truth.
                    Our mission is to make that truth accessible in a safe and responsible way.
                </p>

                <p>
                    Anonify was born out of a need for a lightweight feedback system that respects user privacy, requires no sign-up for senders,
                    and feels intuitive — even on mobile devices.
                </p>

                <p>
                    Our tool is designed to work globally, with users in the US, UK, India, and beyond. We&apos;re constantly improving, guided by our users&apos; needs and the principles of privacy-first development.
                </p>

                <p>
                    Whether you&apos;re seeking feedback from your audience, team, or peers, Anonify helps you open a door to more honest communication.
                </p>
            </section>
        </main>
    );
}
