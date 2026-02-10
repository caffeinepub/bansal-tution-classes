import { useNavigate } from '@tanstack/react-router';
import { useLocalSession } from '../hooks/useLocalSession';
import { ArrowLeft, LogOut } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
    const { session, logout } = useLocalSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate({ to: '/' });
    };

    const handleBack = () => {
        navigate({ to: '/dashboard' });
    };

    const showBackButton = window.location.pathname !== '/dashboard';

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        {showBackButton && (
                            <button
                                onClick={handleBack}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                aria-label="Back to dashboard"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        )}
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/generated/tuition-logo.dim_256x256.png"
                                alt="Tuition Classes"
                                className="h-10 w-10 rounded-lg"
                            />
                            <div>
                                <h1 className="text-lg font-bold">Tuition Classes</h1>
                                {session && (
                                    <p className="text-xs text-muted-foreground">Welcome, {session.name}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {session && (
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 px-4 gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    )}
                </div>
            </header>
            <main className="container px-4 py-6">{children}</main>
            <footer className="border-t mt-auto">
                <div className="container px-4 py-6 text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} • Built with ❤️ using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                                window.location.hostname
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-foreground transition-colors"
                        >
                            caffeine.ai
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
