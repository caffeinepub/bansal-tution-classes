import { useState, FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLocalSession } from '../hooks/useLocalSession';

export function LoginPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useLocalSession();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (name.trim() && password.trim()) {
            login(name.trim(), password);
            navigate({ to: '/dashboard' });
        }
    };

    const isValid = name.trim().length > 0 && password.trim().length > 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-accent/5 to-background px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-4">
                    <img
                        src="/assets/generated/tuition-logo.dim_256x256.png"
                        alt="Tuition Classes"
                        className="h-24 w-24 mx-auto rounded-2xl shadow-lg"
                    />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                        <p className="text-muted-foreground mt-2">Sign in to access your classes</p>
                    </div>
                </div>

                <div className="bg-card rounded-2xl shadow-xl border p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter your name"
                                autoComplete="name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
