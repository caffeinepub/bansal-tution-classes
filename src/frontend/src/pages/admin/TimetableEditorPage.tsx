import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetTimetable, useSaveTimetable, type TimetableEntry } from '../../hooks/useTimetable';
import { useActor } from '../../hooks/useActor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessDeniedScreen } from '../../components/AccessDeniedScreen';

interface EditableEntry extends TimetableEntry {
    timeInput: string;
}

export function TimetableEditorPage() {
    const { actor } = useActor();
    const { data: timetable, isLoading: loadingTimetable } = useGetTimetable();
    const saveMutation = useSaveTimetable();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [checkingAdmin, setCheckingAdmin] = useState(true);

    const [entries, setEntries] = useState<EditableEntry[]>([]);

    useEffect(() => {
        async function checkAdmin() {
            if (!actor) return;
            try {
                const adminStatus = await actor.isCallerAdmin();
                setIsAdmin(adminStatus);
            } catch (error) {
                setIsAdmin(false);
            } finally {
                setCheckingAdmin(false);
            }
        }
        checkAdmin();
    }, [actor]);

    useEffect(() => {
        if (timetable) {
            setEntries(timetable.map(entry => ({
                ...entry,
                timeInput: entry.time,
            })));
        }
    }, [timetable]);

    const addEntry = () => {
        const newEntry: EditableEntry = {
            id: `new-${Date.now()}`,
            day: '',
            subject: '',
            time: '',
            timeInput: '',
            teacher: '',
            classroom: '',
        };
        setEntries([...entries, newEntry]);
    };

    const removeEntry = (id: string) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const updateEntry = (id: string, field: keyof EditableEntry, value: string) => {
        setEntries(entries.map(entry =>
            entry.id === id ? { ...entry, [field]: value } : entry
        ));
    };

    const validate = (): boolean => {
        for (const entry of entries) {
            if (!entry.day || !entry.subject || !entry.timeInput) {
                toast.error('Validation failed', {
                    description: 'Please fill in day, subject, and time for all entries.',
                });
                return false;
            }
        }
        return true;
    };

    const handleSave = async () => {
        if (!validate()) return;

        try {
            await saveMutation.mutateAsync(entries);
            toast.success('Timetable saved successfully', {
                description: 'Your timetable has been updated.',
            });
        } catch (error: any) {
            toast.error('Failed to save timetable', {
                description: error.message || 'An error occurred while saving your changes.',
            });
        }
    };

    if (checkingAdmin) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isAdmin === false) {
        return <AccessDeniedScreen />;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Timetable Editor</h2>
                    <p className="text-muted-foreground mt-2">Manage your class schedule</p>
                </div>
                <Button onClick={addEntry} variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Entry
                </Button>
            </div>

            {loadingTimetable ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : entries.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No timetable entries yet. Click "Add Entry" to get started.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {entries.map((entry) => (
                        <Card key={entry.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Class Entry</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeEntry(entry.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`day-${entry.id}`}>Day *</Label>
                                        <Input
                                            id={`day-${entry.id}`}
                                            placeholder="Monday"
                                            value={entry.day}
                                            onChange={(e) => updateEntry(entry.id, 'day', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`subject-${entry.id}`}>Subject *</Label>
                                        <Input
                                            id={`subject-${entry.id}`}
                                            placeholder="Mathematics"
                                            value={entry.subject}
                                            onChange={(e) => updateEntry(entry.id, 'subject', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`time-${entry.id}`}>Time *</Label>
                                    <Input
                                        id={`time-${entry.id}`}
                                        placeholder="4:00 PM - 5:00 PM"
                                        value={entry.timeInput}
                                        onChange={(e) => updateEntry(entry.id, 'timeInput', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Format: 4:00 PM - 5:00 PM
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`teacher-${entry.id}`}>Teacher</Label>
                                        <Input
                                            id={`teacher-${entry.id}`}
                                            placeholder="Mr. Bansal"
                                            value={entry.teacher}
                                            onChange={(e) => updateEntry(entry.id, 'teacher', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`classroom-${entry.id}`}>Classroom</Label>
                                        <Input
                                            id={`classroom-${entry.id}`}
                                            placeholder="Room 101"
                                            value={entry.classroom}
                                            onChange={(e) => updateEntry(entry.id, 'classroom', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saveMutation.isPending || entries.length === 0}
                    size="lg"
                >
                    {saveMutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Timetable
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
