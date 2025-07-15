

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy – Anonify",
    description:
        "Understand how Anonify collects, uses, and protects your information when sending and receiving anonymous feedback.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6 text-gray-900 dark:text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                Privacy Policy
            </h1>
            <p className="text-center text-sm text-gray-600 dark:text-neutral-400 mb-10">
                Effective Date: July 15, 2025
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    Welcome to Anonify. Your privacy is critically important to us. This
                    privacy policy outlines how we collect, use, and protect any
                    information you provide while using Anonify.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">2. Data Collection</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    We do not collect any personal data from feedback senders. No email,
                    no login, no IP tracking. Only feedback text is stored securely for
                    the recipient.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">3. Usernames & Public Pages</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    To generate your feedback link, we only require a display name (e.g.
                    Nehra, Nehra123). This is used solely to personalize your link
                    and dashboard.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">4. Cookies & Analytics</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    Anonify may use cookies to enhance performance or analyze basic usage
                    data. No personally identifiable info is collected.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">5. Third-Party Services</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    We may use trusted services (e.g., Vercel, analytics) to
                    operate the platform. These are selected with user privacy and
                    security in mind.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    6. Children&apos;s Privacy
                </h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    Anonify is intended for users over the age of 13. If you are under 18,
                    you should use the platform only with parental or guardian consent.
                    We do not verify age but expect users to act responsibly.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">7. Data Security</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    We use encryption and secure infrastructure to keep your data safe. No
                    sensitive sender info is stored, ensuring anonymous communication.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    This policy may be updated over time. We encourage you to review this
                    page regularly to stay informed.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
                <p className="text-sm text-gray-700 dark:text-neutral-300">
                    For questions, concerns, or requests, contact us via the form on our
                    website 
                </p>
            </section>
        </main>
    );
}
