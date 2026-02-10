import { Upload, CreditCard, Calendar } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const adminActions = [
    { id: 1, title: 'Upload Notes', icon: Upload, description: 'Add new study materials', path: null },
    { id: 2, title: 'Payment Settings', icon: CreditCard, description: 'Configure payment details', path: '/admin/payment-settings' },
    { id: 3, title: 'Update Timetable', icon: Calendar, description: 'Modify class schedule', path: '/admin/timetable-editor' },
];

export function TeacherAdminPage() {
    const navigate = useNavigate();

    const handleActionClick = (path: string | null) => {
        if (path) {
            navigate({ to: path });
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Teacher Admin</h2>
                <p className="text-muted-foreground mt-2">Manage your class content and communications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adminActions.map((action) => {
                    const Icon = action.icon;
                    const isDisabled = !action.path;
                    return (
                        <button
                            key={action.id}
                            onClick={() => handleActionClick(action.path)}
                            disabled={isDisabled}
                            className={`group rounded-xl border bg-card p-6 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                isDisabled
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:shadow-lg hover:border-primary/50'
                            }`}
                        >
                            <div className="space-y-3">
                                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-4 text-primary mx-auto">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{action.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                                    {isDisabled && (
                                        <p className="text-xs text-muted-foreground mt-2 italic">Coming soon</p>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
