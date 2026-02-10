import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { NotesPage } from './pages/NotesPage';
import { TimetablePage } from './pages/TimetablePage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { PayFeesPage } from './pages/PayFeesPage';
import { ContactTeacherPage } from './pages/ContactTeacherPage';
import { TeacherAdminPage } from './pages/TeacherAdminPage';
import { PaymentSettingsPage } from './pages/admin/PaymentSettingsPage';
import { TimetableEditorPage } from './pages/admin/TimetableEditorPage';
import { RequireSession } from './components/RequireSession';
import { AppLayout } from './components/AppLayout';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <Toaster />
        </>
    ),
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: LoginPage,
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => (
        <RequireSession>
            <AppLayout>
                <StudentDashboardPage />
            </AppLayout>
        </RequireSession>
    ),
});

const notesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/notes',
    component: () => (
        <RequireSession>
            <AppLayout>
                <NotesPage />
            </AppLayout>
        </RequireSession>
    ),
});

const timetableRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/timetable',
    component: () => (
        <RequireSession>
            <AppLayout>
                <TimetablePage />
            </AppLayout>
        </RequireSession>
    ),
});

const announcementsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/announcements',
    component: () => (
        <RequireSession>
            <AppLayout>
                <AnnouncementsPage />
            </AppLayout>
        </RequireSession>
    ),
});

const payFeesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/pay-fees',
    component: () => (
        <RequireSession>
            <AppLayout>
                <PayFeesPage />
            </AppLayout>
        </RequireSession>
    ),
});

const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: () => (
        <RequireSession>
            <AppLayout>
                <ContactTeacherPage />
            </AppLayout>
        </RequireSession>
    ),
});

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: () => (
        <RequireSession>
            <AppLayout>
                <TeacherAdminPage />
            </AppLayout>
        </RequireSession>
    ),
});

const paymentSettingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/payment-settings',
    component: () => (
        <RequireSession>
            <AppLayout>
                <PaymentSettingsPage />
            </AppLayout>
        </RequireSession>
    ),
});

const timetableEditorRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/timetable-editor',
    component: () => (
        <RequireSession>
            <AppLayout>
                <TimetableEditorPage />
            </AppLayout>
        </RequireSession>
    ),
});

const routeTree = rootRoute.addChildren([
    loginRoute,
    dashboardRoute,
    notesRoute,
    timetableRoute,
    announcementsRoute,
    payFeesRoute,
    contactRoute,
    adminRoute,
    paymentSettingsRoute,
    timetableEditorRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
