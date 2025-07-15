export const metadata = {
    title: "What's New – Anonify",
    description: "Stay up-to-date with the latest features, improvements, and updates from Anonify.",
};

const updates = [
    {
        date: "July, 2025",
        title: "📌 Added FAQ, Terms & Privacy Pages",
        description: "Launched all core legal and support pages with professional layout and mobile responsiveness.",
    },
    {
        date: "July, 2025",
        title: "🔐 Dashboard Recovery by Secret Key",
        description: "Users can now recover their dashboard if they lose access — securely and anonymously.",
    },
    {
        date: "July, 2025",
        title: "📤 Feedback Pinning and Deletion",
        description: "Improved dashboard functionality: pin or delete feedback messages easily.",
    },
    {
        date: "July, 2025",
        title: "🚀 Anonify Launch",
        description: "Anonify is now live! Send and receive anonymous feedback instantly. No sign-up required.",
    },
];

export default function WhatsNewPage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6 text-black dark:text-white">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 ">
                What&apos;s New at Anonify
            </h1>
            <p className="text-center text-gray-600 dark:text-neutral-400 mb-10">
                Stay up to date with our latest improvements and feature launches.
            </p>

            <div className="space-y-6">
                {
                    updates.map((update, id) => (
                        <>
                            <div
                                key={id}
                                className="md:border border-gray-200 dark:border-neutral-800 rounded-xl md:p-6 md:shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
                            >
                                <h2 className="text-lg md:text-xl font-semibold mb-1">{update.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">{update.date}</p>
                                <p className="text-gray-700 dark:text-neutral-300">{update.description}</p>
                            </div>
                            <hr className="md:hidden border-gray-200  dark:border-neutral-800" />
                        </>
                    ))
                }
            </div>
        </main>
    );
}
