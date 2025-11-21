'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VellariLogo } from '@/components/brand/VellariLogo';
import { Bell, User, LogOut, Settings, BarChart3, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase/client';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const router = useRouter();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // TODO: Get user data from Supabase
    const user = {
        name: 'SIKHAWOX Student',
        email: 'student@sikhawox.com',
        avatar: 'VS',
        notifications: 3
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <nav className={cn(
            'sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800',
            className
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Hidden on larger screens where sidebar shows */}
                    <div className="lg:hidden">
                        <Link href="/">
                            <VellariLogo size="sm" />
                        </Link>
                    </div>

                    {/* Spacer for mobile */}
                    <div className="flex-1 lg:flex-none" />

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg hover:bg-slate-900 transition-colors">
                            <Bell size={20} className="text-slate-400" />
                            {user.notifications > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-vellari-500 rounded-full animate-pulse" />
                            )}
                        </button>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 transition-colors"
                            >
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-white">{user.name}</p>
                                    <p className="text-xs text-slate-400">Student</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-vellari-500 flex items-center justify-center text-white font-bold">
                                    {user.avatar}
                                </div>
                                <ChevronDown size={16} className={cn(
                                    "text-slate-400 transition-transform",
                                    showProfileMenu && "rotate-180"
                                )} />
                            </button>

                            {/* Dropdown Menu */}
                            {showProfileMenu && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowProfileMenu(false)}
                                    />

                                    {/* Menu */}
                                    <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 overflow-hidden">
                                        {/* User Info */}
                                        <div className="p-4 border-b border-slate-800">
                                            <p className="font-semibold text-white">{user.name}</p>
                                            <p className="text-sm text-slate-400">{user.email}</p>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors text-slate-300"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                <User size={18} />
                                                <span>Profile Settings</span>
                                            </Link>
                                            <Link
                                                href="/progress"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors text-slate-300"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                <BarChart3 size={18} />
                                                <span>My Progress</span>
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors text-slate-300"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                <Settings size={18} />
                                                <span>Account Settings</span>
                                            </Link>
                                        </div>

                                        {/* Logout */}
                                        <div className="border-t border-slate-800">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-red-400"
                                            >
                                                <LogOut size={18} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
