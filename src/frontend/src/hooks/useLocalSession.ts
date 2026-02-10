import { useState, useEffect, useCallback } from 'react';

interface Session {
    name: string;
    password: string;
}

const SESSION_KEY = 'tuition_session';

export function useLocalSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            try {
                setSession(JSON.parse(stored));
            } catch (e) {
                localStorage.removeItem(SESSION_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = useCallback((name: string, password: string) => {
        const newSession = { name, password };
        setSession(newSession);
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    }, []);

    const logout = useCallback(() => {
        setSession(null);
        localStorage.removeItem(SESSION_KEY);
    }, []);

    return {
        session,
        isLoading,
        isAuthenticated: !!session,
        login,
        logout,
    };
}
