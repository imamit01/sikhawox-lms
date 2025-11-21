'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { VellariLogo } from '@/components/brand/VellariLogo';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    FileText,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    Bell,
    LogOut,
    GraduationCap,
    Menu,
    X,
    DollarSign,
    Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase/client';

interface InstructorLayoutProps {
    children: React.ReactNode;
}

const instructorNavItems = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/instructor/dashboard',
    },
    {
        title: 'My Courses',
        icon: BookOpen,
        href: '/instructor/courses',
    },
    {
        title: 'Students',
        icon: Users,
        href: '/instructor/students',
    },
    {
        title: 'Assessments',
        icon: FileText,
        href: '/instructor/assessments',
    },
    {
        title: 'Analytics',
        icon: BarChart3,
        href: '/instructor/analytics',
    },
    {
        title: 'Revenue',
        icon: DollarSign,
        href: '/instructor/revenue',
    },
    {
        title: 'Settings',
        icon: Settings,
        href: '/instructor/settings',
    },
];

export default function InstructorLayout({ children }: InstructorLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/instructor/login');
    };

    const isActive = (href: string) => pathname === href;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 z-40',
                    sidebarCollapsed ? 'w-20' : 'w-64',
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Logo */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    {!sidebarCollapsed && (
                        <div className="flex items-center gap-2">
                            <GraduationCap className="text-blue-400" size={24} />
                            <span className="font-heading font-bold text-white">Instructor</span>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:block p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
                    >
                        {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
                    {instructorNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                                isActive(item.href)
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    : 'hover:bg-slate-800 text-slate-300'
                            )}
                        >
                            <item.icon size={20} />
                            {!sidebarCollapsed && <span className="text-sm">{item.title}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className={cn(
                'transition-all duration-300',
                sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
            )}>
                {/* Top Navigation */}
                <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="lg:hidden">
                                    <VellariLogo size="sm" />
                                </div>
                                <div className="hidden lg:block">
                                    <h1 className="text-xl font-heading font-bold text-white">Instructor Dashboard</h1>
                                    <p className="text-sm text-slate-400">Manage your courses and students</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="relative p-2 rounded-lg hover:bg-slate-900 transition-colors">
                                    <Bell size={20} className="text-slate-400" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                </button>

                                {/* Instructor Profile */}
                                <div className="flex items-center gap-3 px-3 py-2 bg-slate-900 rounded-lg border border-slate-800">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                        I
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-medium text-white">Instructor</p>
                                        <p className="text-xs text-slate-400">Teacher</p>
                                    </div>
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
