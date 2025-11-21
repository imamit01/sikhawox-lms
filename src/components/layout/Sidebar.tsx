'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { VellariLogo } from '@/components/brand/VellariLogo';
import { cn } from '@/lib/utils';
import {
    Home,
    BookOpen,
    ShoppingCart,
    Code,
    Trophy,
    BarChart3,
    Settings,
    Users,
    FileCheck,
    LayoutDashboard,
    Menu,
    X,
    LogOut,
    User,
    ChevronDown,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    roles?: string[];
}

const studentNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'My Courses', href: '/my-courses', icon: BookOpen },
    { label: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
    { label: 'Mock Tests', href: '/mock-tests', icon: Trophy },
    { label: 'Progress', href: '/progress', icon: BarChart3 },
];

const adminNavItems: NavItem[] = [
    { label: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Purchase Requests', href: '/admin/purchase-requests', icon: FileCheck },
    { label: 'Course Builder', href: '/admin/course-builder', icon: Code },
    { label: 'Student Spy', href: '/admin/student-spy', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // TODO: Get user role from Supabase auth
    const userRole = 'STUDENT' as 'STUDENT' | 'SUPER_ADMIN' | 'MODERATOR'; // Placeholder

    const navItems = userRole === 'SUPER_ADMIN' || userRole === 'MODERATOR'
        ? adminNavItems
        : studentNavItems;

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 h-screen bg-slate-950 border-r border-slate-800 transition-transform duration-300 z-40',
                    'w-64 flex flex-col',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Logo */}
                <div className="p-6 border-b border-slate-800">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <VellariLogo size="md" />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                                            'hover:bg-slate-900 hover:text-vellari-400',
                                            isActive
                                                ? 'bg-vellari-500/10 text-vellari-400 border border-vellari-500/20'
                                                : 'text-slate-400'
                                        )}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile Section with Dropdown */}
                <div className="p-4 border-t border-slate-800 relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-900 rounded-lg transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-vellari-500 flex items-center justify-center text-white font-bold">
                            VS
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-white">SIKHAWOX Student</p>
                            <p className="text-xs text-slate-400">{userRole}</p>
                        </div>
                        <ChevronDown size={16} className={cn(
                            "text-slate-400 transition-transform",
                            showDropdown && "rotate-180"
                        )} />
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden">
                            <Link
                                href="/settings"
                                onClick={() => {
                                    setShowDropdown(false);
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors text-slate-300"
                            >
                                <Settings size={18} />
                                <span className="text-sm">Settings</span>
                            </Link>
                            <Link
                                href="/profile"
                                onClick={() => {
                                    setShowDropdown(false);
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors text-slate-300"
                            >
                                <User size={18} />
                                <span className="text-sm">Profile</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-red-400 border-t border-slate-800"
                            >
                                <LogOut size={18} />
                                <span className="text-sm">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

