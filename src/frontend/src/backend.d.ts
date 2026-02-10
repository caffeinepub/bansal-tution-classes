import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PaymentSettings {
    paymentProviderUrl: string;
    paymentId: string;
}
export type Time = bigint;
export interface Lesson {
    startTime: Time;
    subject: string;
    endTime: Time;
    dayOfWeek: string;
    teacher: string;
    classroom: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addLesson(lesson: Lesson): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPaymentSettings(): Promise<PaymentSettings>;
    getTimetable(): Promise<Array<Lesson>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeLesson(dayOfWeek: string, subject: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setPaymentSettings(settings: PaymentSettings): Promise<void>;
    setTimetable(lt: Array<Lesson>): Promise<void>;
    updateLesson(lesson: Lesson): Promise<void>;
}
