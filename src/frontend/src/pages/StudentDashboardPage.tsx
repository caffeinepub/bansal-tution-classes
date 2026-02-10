import { useNavigate } from '@tanstack/react-router';
import { BookOpen, Calendar, Megaphone, CreditCard, MessageCircle, UserCog, ArrowRight } from 'lucide-react';

const menuItems = [
    { title: 'Notes', icon: BookOpen, path: '/notes', description: 'Access study materials' },
    { title: 'Timetable', icon: Calendar, path: '/timetable', description: 'View class schedule' },
    { title: 'Announcements', icon: Megaphone, path: '/announcements', description: 'Important updates' },
    { title: 'Pay Fees', icon: CreditCard, path: '/pay-fees', description: 'Make payments' },
    { title: 'Contact Teacher', icon: MessageCircle, path: '/contact', description: 'Get in touch' },
    { title: 'Teacher Admin', icon: UserCog, path: '/admin', description: 'Manage content' },
];

export function StudentDashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border">
                <img
                    src="/assets/generated/dashboard-hero.dim_1200x400.png"
                    alt="Dashboard"
                    className="w-full h-48 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold">Student Dashboard</h2>
                        <p className="text-muted-foreground mt-1">Access all your learning resources</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate({ to: item.path })}
                            className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:shadow-lg hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-3">
                                    <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
