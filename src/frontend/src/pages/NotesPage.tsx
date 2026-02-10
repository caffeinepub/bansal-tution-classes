import { useState } from 'react';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';

const notes = [
    { id: 1, title: 'Class 8 Maths – PDF', subject: 'Mathematics', class: '8' },
    { id: 2, title: 'Class 9 Science – PDF', subject: 'Science', class: '9' },
    { id: 3, title: 'Class 10 English – PDF', subject: 'English', class: '10' },
];

export function NotesPage() {
    const handleNoteClick = (title: string) => {
        toast.info('File not available', {
            description: `${title} has not been uploaded yet. Please check back later.`,
        });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Notes</h2>
                <p className="text-muted-foreground mt-2">Access your study materials and resources</p>
            </div>

            <div className="space-y-3">
                {notes.map((note) => (
                    <button
                        key={note.id}
                        onClick={() => handleNoteClick(note.title)}
                        className="w-full group rounded-lg border bg-card p-5 text-left transition-all hover:shadow-md hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {note.title}
                                </h3>
                                <div className="flex gap-3 mt-1">
                                    <span className="text-sm text-muted-foreground">{note.subject}</span>
                                    <span className="text-sm text-muted-foreground">•</span>
                                    <span className="text-sm text-muted-foreground">Class {note.class}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
