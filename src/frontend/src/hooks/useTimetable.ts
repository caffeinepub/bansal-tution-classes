import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Lesson } from '../backend';

export interface TimetableEntry {
    id: string;
    day: string;
    subject: string;
    time: string;
    teacher: string;
    classroom: string;
}

function lessonToEntry(lesson: Lesson): TimetableEntry {
    const startDate = new Date(Number(lesson.startTime) / 1000000);
    const endDate = new Date(Number(lesson.endTime) / 1000000);
    const timeStr = `${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    
    return {
        id: `${lesson.dayOfWeek}-${lesson.subject}`,
        day: lesson.dayOfWeek,
        subject: lesson.subject,
        time: timeStr,
        teacher: lesson.teacher,
        classroom: lesson.classroom,
    };
}

function entryToLesson(entry: TimetableEntry, timeInput: string): Lesson {
    const now = new Date();
    const [startStr, endStr] = timeInput.split('-').map(s => s.trim());
    
    const parseTime = (timeStr: string): Date => {
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return now;
        
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        const date = new Date(now);
        date.setHours(hours, minutes, 0, 0);
        return date;
    };
    
    const startDate = parseTime(startStr || '12:00 PM');
    const endDate = parseTime(endStr || '1:00 PM');
    
    return {
        dayOfWeek: entry.day,
        subject: entry.subject,
        startTime: BigInt(startDate.getTime() * 1000000),
        endTime: BigInt(endDate.getTime() * 1000000),
        teacher: entry.teacher,
        classroom: entry.classroom,
    };
}

export function useGetTimetable() {
    const { actor, isFetching: actorFetching } = useActor();

    const query = useQuery<TimetableEntry[]>({
        queryKey: ['timetable'],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not available');
            const lessons = await actor.getTimetable();
            return lessons.map(lessonToEntry);
        },
        enabled: !!actor && !actorFetching,
    });

    return {
        ...query,
        isLoading: actorFetching || query.isLoading,
    };
}

export function useSaveTimetable() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (entries: Array<TimetableEntry & { timeInput: string }>) => {
            if (!actor) throw new Error('Actor not available');
            const lessons = entries.map(entry => entryToLesson(entry, entry.timeInput));
            await actor.setTimetable(lessons);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['timetable'] });
        },
    });
}
