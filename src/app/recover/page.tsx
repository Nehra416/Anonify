// app/recover/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/authContext';

export default function RecoverPage() {
    const [key, setKey] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { setIsLoggedIn, setUserData } = useAuth();

    const handleRecover = async () => {
        if (!key.trim())
            return setError('Please enter your secret key');

        try {
            const res = await axios.post("/api/recover-user", { secretKey: key });
            if (res.data.success) {
                // set the user data in local storage
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('slug', res.data.slug);
                localStorage.setItem('secretKey', key);
                localStorage.setItem('username', res.data.username);

                // update the global user data
                setUserData({
                    userId: res.data.userId,
                    username: res.data.username,
                    slug: res.data.slug,
                    secretKey: key,
                });
                setIsLoggedIn(true);

                // redirect to dashboard after show the success message
                toast.success('Dashboard recovered successfully');
                router.push('/me');
            }

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.error || 'Invalid key or something went wrong.');
            } else {
                setError('An unexpected error occurred.');
            }
            console.error(error);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md bg-white dark:bg-[#121212] shadow-xl rounded-2xl p-6 space-y-6">
                {/* Header */}
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold">Recover Your Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enter your secret key to access your dashboard.
                    </p>
                </div>

                {/* Input Field */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="secret">
                        Secret Key
                    </label>
                    <input
                        id="secret"
                        type="text"
                        placeholder="Paste your secret key here"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-700 bg-background text-foreground p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                        error && (
                            <p className="text-sm text-red-500 mt-1">{error}</p>
                        )}
                </div>

                {/* Submit btn*/}
                <Button
                    onClick={handleRecover}
                    className="w-full font-semibold"
                >
                    Recover Dashboard
                </Button>

                {/* Back to Home btn */}
                <div className="text-center">
                    <button onClick={() => router.push('/')}
                        className="group relative p-0 cursor-pointer text-sm font-medium italic"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </span>
                        {/* underline hover effect */}
                        <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-current transition-all duration-200 group-hover:left-0 group-hover:w-full"></span>
                    </button>
                </div>

                {/* Warning Message */}
                <p className="text-xs text-gray-400 text-center">
                    🔒 Don’t share your secret key. Anyone with it can access your feedback.
                </p>
            </div>
        </div>
    );
}
