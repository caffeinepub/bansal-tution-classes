import { ShieldAlert } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function AccessDeniedScreen() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
            <div className="inline-flex items-center justify-center rounded-full bg-destructive/10 p-6 text-destructive">
                <ShieldAlert className="h-16 w-16" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Access Denied</h2>
                <p className="text-muted-foreground max-w-md">
                    You do not have permission to access this page. This area is restricted to administrators only.
                </p>
            </div>
            <Button onClick={() => navigate({ to: '/dashboard' })} size="lg">
                Return to Dashboard
            </Button>
        </div>
    );
}
