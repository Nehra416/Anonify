'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthContextType = {
    isLoggedIn: boolean;
    userData: UserData;
    setIsLoggedIn: (value: boolean) => void;
    setUserData: (value: UserData) => void;
    isInitialized: boolean;
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    userData: {
        userId: '',
        username: '',
        slug: '',
        secretKey: '',
    },
    setIsLoggedIn: () => { },
    setUserData: () => { },
    isInitialized: false,
});

type UserData = {
    userId: string;
    username: string;
    slug: string;
    secretKey: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        userId: '',
        username: '',
        slug: '',
        secretKey: '',
    });
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);

        // we check other local storage items only if the user is logged in
        if (!!userId) {
            const username = localStorage.getItem('username');
            const slug = localStorage.getItem('slug');
            const secretKey = localStorage.getItem('secretKey');

            setUserData({
                userId: userId || '',
                username: username || '',
                slug: slug || '',
                secretKey: secretKey || '',
            });
        }

        // Other child coponents useEffect is run only after the isInitialized is true
        setIsInitialized(true);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, isInitialized }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
