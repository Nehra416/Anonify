"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "What is Anonify?",
        answer:
            "Anonify is a secure platform that allows individuals and creators to receive honest, anonymous feedback from anyone worldwide — no sign-up required.",
    },
    {
        question: "Is my identity truly anonymous?",
        answer:
            "Yes. Anonify does not track or log any personal information about the sender. We do not collect IP addresses or require accounts to send feedback.",
    },
    {
        question: "Who can use Anonify?",
        answer:
            "Anyone — whether you're a content creator, student, teacher, developer, or team lead. Anonify is built for global users in the US, UK, India, Canada, and beyond.",
    },
    {
        question: "How do I receive feedback?",
        answer:
            "Create your unique feedback link using Anonify. Share it on your bio, portfolio, or social platforms. Anyone with the link can send you feedback anonymously.",
    },
    {
        question: "Do I need an account to send feedback?",
        answer:
            "No. Sending feedback is completely anonymous and does not require signing in.",
    },
    {
        question: "Can I delete received feedback?",
        answer:
            "Yes. Inside your dashboard, you can delete any feedback messages. You also have the ability to pin important ones.",
    },
    {
        question: "Can I use Anonify on mobile devices?",
        answer:
            "Absolutely! Anonify is fully responsive and optimized for mobile use.",
    },
    {
        question: "Is Anonify free?",
        answer:
            "Yes, it’s completely free to use. We believe in open, honest communication for everyone.",
    },
    {
        question: "How secure is Anonify?",
        answer:
            "All feedback is transmitted securely using HTTPS. We do not store sender data, ensuring complete anonymity.",
    },
    {
        question: "Will Anonify stay anonymous forever?",
        answer:
            "Yes. Anonymity is the core principle of Anonify. We are committed to keeping it that way.",
    },
];

export default function FAQClient() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="space-y-4">
            {
                faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 dark:border-neutral-700 rounded-xl p-4"
                    >
                        <button
                            className="w-full flex justify-between items-center font-medium text-left"
                            onClick={() => toggle(index)}
                        >
                            <span>{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5" />
                            ) : (
                                <ChevronDown className="w-5 h-5" />
                            )}
                        </button>
                        {
                            openIndex === index && (
                                <p className="mt-3 text-sm text-gray-700 dark:text-neutral-300">
                                    {faq.answer}
                                </p>
                            )}
                    </div>
                ))}
        </div>
    );
}
