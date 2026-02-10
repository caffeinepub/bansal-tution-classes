import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLocalSession } from '../hooks/useLocalSession';

export function RequireSession({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useLocalSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate({ to: '/' });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
