'use client'

import { Moon, Sun, Menu, X, Mail, MessageSquareText } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const router = useRouter();
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setMenuOpen(false);
            setIsClosing(false);
        }, 300); // same duration as of global CSS animation for sidebar
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md dark:shadow-gray-700/50">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Web Name */}
                    <Link href="/" className="text-xl font-bold bg-gradient-to-b from-gray-900 to-gray-400 bg-clip-text text-transparent">
                        Anonify
                    </Link>

                    {/* Desktop menu */}
                    <div className='hidden md:flex items-center gap-5'>
                        <button
                            onClick={() => router.push("/improve")}
                            className="group relative p-0 cursor-pointer text-sm font-medium italic"
                        >
                            Feedback
                            <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-current transition-all duration-200 group-hover:left-0 group-hover:w-full"></span>
                        </button>
                        <button
                            onClick={() => router.push("/contact")}
                            className="group relative p-0 cursor-pointer text-sm font-medium italic"
                        >
                            Contact Us
                            <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-current transition-all duration-200 group-hover:left-0 group-hover:w-full"></span>
                        </button>

                        <Tooltip>
                            <TooltipTrigger>
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition duration-150 cursor-pointer"
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="mr-2">
                                <p>Toggle Theme</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Mobile sidebar toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                        aria-label="Toggle Menu"
                    >
                        {menuOpen && !isClosing ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Side Panel (above navbar) */}
            {
                (menuOpen || isClosing) && (
                    <div
                        className={`md:hidden fixed top-0 right-0 h-screen w-3/5 backdrop-blur-md bg-white/30 dark:bg-black/30 z-[60] py-3 px-4 flex flex-col gap-5 transition-transform border-l border-gray-200 dark:border-gray-700 ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}
                    >
                        {/* Close btn */}
                        <button
                            onClick={handleClose}
                            className="self-end p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
                            aria-label="Close Menu"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Menu Items */}
                        <div>
                            <button
                                onClick={() => { router.push("/improve"); handleClose() }}
                                className="p-2 flex items-center gap-2"
                            >
                                <MessageSquareText className="h-5 w-5" />
                                <span className="text-sm">Feedback</span>
                            </button>
                            <button
                                onClick={() => { router.push("/contact"); handleClose() }}
                                className="p-2 flex items-center gap-2"
                            >
                                <Mail className="h-5 w-5" />
                                <span>Contact Us</span>
                            </button>
                            <button
                                onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); handleClose() }}
                                className="p-2 flex items-center gap-2"
                            >
                                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                <span>Toggle Theme</span>
                            </button>
                        </div>

                        {/* Copyright */}
                        <p className='text-center text-xs text-gray-500 dark:text-gray-400'>
                            &copy; {new Date().getFullYear()} Anonify - Made with 💖
                        </p>
                    </div>
                )
            }
        </>
    )
}
