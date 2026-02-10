import { Bell } from 'lucide-react';

const announcements = [
    { id: 1, title: 'Test on Friday', type: 'important' },
    { id: 2, title: 'Fees due by 10th', type: 'reminder' },
];

export function AnnouncementsPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
                <p className="text-muted-foreground mt-2">Stay updated with important notices</p>
            </div>

            <div className="space-y-4">
                {announcements.map((announcement) => (
                    <div
                        key={announcement.id}
                        className="rounded-lg border bg-card p-6 transition-all hover:shadow-md"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
                                <Bell className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{announcement.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1 capitalize">
                                    {announcement.type}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
