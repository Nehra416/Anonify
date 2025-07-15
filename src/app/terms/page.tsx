import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions – Anonify",
    description:
        "Read the official Terms & Conditions for using Anonify, the anonymous feedback platform built for global users.",
};

export default function TermsPage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6 text-gray-900 dark:text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                Terms & Conditions
            </h1>
            <p className="text-center text-gray-600 dark:text-neutral-400 mb-10 text-sm">
                Effective Date: July 2025
            </p>

            <div className="space-y-8 text-sm sm:text-base leading-relaxed">
                <section>
                    <h2 className="font-semibold text-lg mb-2">1. Introduction</h2>
                    <p>
                        Welcome to <strong>Anonify</strong>. By using our
                        website <a href="https://anonify.chat" className="underline text-blue-600">https://anonify.chat</a>, you agree to these Terms and our Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">2. Eligibility</h2>
                    <p>
                        You must be at least 13 years old to use Anonify. If under 18, you must have consent
                        from a parent or legal guardian.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">3. Your Use of the Platform</h2>
                    <p>
                        You agree not to post or transmit any content that is illegal, hateful, threatening,
                        harassing, sexually explicit, or spammy. We may restrict access if the platform is
                        misused.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">4. Anonymous Feedback</h2>
                    <p>
                        We do not track personal information. No IP, location, or identity is collected or
                        stored. Feedback is 100% anonymous.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">5. Feedback Management</h2>
                    <p>
                        You can delete feedback from your dashboard. We do not moderate unless it&apos;s reported
                        for abuse.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">6. Availability & Access</h2>
                    <p>
                        While we aim for 24/7 uptime, we do not guarantee uninterrupted access. Maintenance or
                        updates may cause temporary downtime.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">7. Intellectual Property</h2>
                    <p>
                        All content, code, design, and logos are owned by Anonify. You may not copy or reuse
                        them without permission.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">8. Limitation of Liability</h2>
                    <p>
                        We are not liable for any damages resulting from use or misuse of the platform. Use
                        Anonify at your own risk.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">9. Third-Party Services</h2>
                    <p>
                        We may use third-party services (e.g., analytics, hosting). We are not responsible for
                        their privacy practices or content.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">10. Modifications</h2>
                    <p>
                        We may update these Terms at any time. Continued use of the platform means you accept
                        the new terms.
                    </p>
                </section>

                <section>
                    <h2 className="font-semibold text-lg mb-2">11. Termination</h2>
                    <p>
                        We may suspend or terminate your access to Anonify if you violate these terms or abuse
                        the platform.
                    </p>
                </section>
            </div>
        </main>
    );
}
