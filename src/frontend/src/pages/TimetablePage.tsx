import { Clock, Loader2 } from 'lucide-react';
import { useGetTimetable } from '../hooks/useTimetable';

const colorClasses = [
    'bg-chart-1/10 text-chart-1 border-chart-1/20',
    'bg-chart-2/10 text-chart-2 border-chart-2/20',
    'bg-chart-3/10 text-chart-3 border-chart-3/20',
    'bg-chart-4/10 text-chart-4 border-chart-4/20',
    'bg-chart-5/10 text-chart-5 border-chart-5/20',
];

export function TimetablePage() {
    const { data: timetable, isLoading } = useGetTimetable();

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Timetable</h2>
                <p className="text-muted-foreground mt-2">Your weekly class schedule</p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : !timetable || timetable.length === 0 ? (
                <div className="rounded-lg border bg-muted/50 p-12 text-center">
                    <p className="text-muted-foreground">No timetable has been set yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {timetable.map((item, index) => {
                        const colorClass = colorClasses[index % colorClasses.length];
                        return (
                            <div
                                key={item.id}
                                className={`rounded-lg border p-6 ${colorClass} transition-all hover:shadow-md`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold">{item.day}</h3>
                                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-background/50">
                                                {item.subject}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm opacity-80">
                                            <Clock className="h-4 w-4" />
                                            <span>{item.time}</span>
                                        </div>
                                        {(item.teacher || item.classroom) && (
                                            <div className="mt-2 text-sm opacity-70">
                                                {item.teacher && <span>Teacher: {item.teacher}</span>}
                                                {item.teacher && item.classroom && <span className="mx-2">•</span>}
                                                {item.classroom && <span>Room: {item.classroom}</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
