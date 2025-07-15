import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black text-neutral-600 dark:text-neutral-500 border-t border-neutral-200 font-medium dark:border-neutral-700">
            <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-4">
                {/* Brand name & description */}
                <div className="md:col-span-1">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Anonify</h3>
                    <p className="mt-1 text-sm">Let them speak freely. You deserve the truth.</p>
                </div>

                {/* Container for all links */}
                <div className="md:col-span-3 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {/* Explore */}
                    <div>
                        <h4 className="uppercase text-sm font-medium mb-2 text-neutral-900 dark:text-white">Explore</h4>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="/" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Home</Link></li>
                            <li><Link href="/create" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Create Link</Link></li>
                            <li><Link href="/dashboard" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Dashboard</Link></li>
                            <li><Link href="/recover" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Recover Access</Link></li>
                        </ul>
                    </div>

                    {/* Resources section */}
                    <div>
                        <h4 className="uppercase text-sm font-medium mb-2 text-neutral-900 dark:text-white">Resources</h4>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="/faq" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>FAQ</Link></li>
                            <li><Link href="/contact" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Contact</Link></li>
                            <li><Link href="/whats-new" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>What&apos;s New</Link></li>
                            <li><Link href="/about" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>About</Link></li>
                            <li><Link href="/improve" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Suggestions</Link></li>
                        </ul>
                    </div>

                    {/* Legal section */}
                    <div>
                        <h4 className="uppercase text-sm font-medium mb-2 text-neutral-900 dark:text-white">Legal</h4>
                        <ul className="space-y-1 text-sm">
                            <li><Link href="/privacy-policy" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Privacy Policy</Link></li>
                            <li><Link href="/terms" className='hover:text-neutral-900 dark:hover:text-white transition-colors'>Terms & Conditions</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright section */}
            <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    © 2025 Anonify. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
