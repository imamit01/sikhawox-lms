'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, FileCheck, Eye, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ModeratorDashboardPage() {
    const stats = {
        pendingRequests: 12,
        activeStudents: 287,
        todayLogins: 45,
        flaggedActivities: 3,
    };

    const recentActions = [
        { id: 1, action: 'Approved purchase request', user: 'John Doe', time: '5 min ago' },
        { id: 2, action: 'Reviewed student activity', user: 'Jane Smith', time: '15 min ago' },
        { id: 3, action: 'Updated course status', user: 'Bob Johnson', time: '1 hour ago' },
    ];

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <Shield className="text-yellow-400" size={32} />
                    <h1 className="text-3xl font-heading font-bold text-white">
                        Moderator Dashboard
                    </h1>
                </div>
                <p className="text-slate-400">Monitor and manage platform activities</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<FileCheck className="text-yellow-400" size={24} />}
                    label="Pending Requests"
                    value={stats.pendingRequests.toString()}
                    href="/admin/purchase-requests"
                />
                <StatCard
                    icon={<Users className="text-blue-400" size={24} />}
                    label="Active Students"
                    value={stats.activeStudents.toString()}
                    href="/admin/student-spy"
                />
                <StatCard
                    icon={<TrendingUp className="text-green-400" size={24} />}
                    label="Today's Logins"
                    value={stats.todayLogins.toString()}
                    href="/admin/student-spy"
                />
                <StatCard
                    icon={<Eye className="text-red-400" size={24} />}
                    label="Flagged Activities"
                    value={stats.flaggedActivities.toString()}
                    href="/admin/student-spy"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-heading font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <QuickActionCard
                        title="Review Purchase Requests"
                        description="Approve or reject pending course purchases"
                        href="/admin/purchase-requests"
                        icon={<FileCheck size={24} />}
                        color="yellow"
                    />
                    <QuickActionCard
                        title="Monitor Student Activity"
                        description="View real-time student login and activity logs"
                        href="/admin/student-spy"
                        icon={<Eye size={24} />}
                        color="blue"
                    />
                    <QuickActionCard
                        title="Manage Users"
                        description="View and manage student accounts"
                        href="/admin/users/students"
                        icon={<Users size={24} />}
                        color="green"
                    />
                </div>
            </div>

            {/* Recent Actions */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-heading font-bold text-white mb-4">Recent Moderator Actions</h2>
                <div className="space-y-3">
                    {recentActions.map((action) => (
                        <div key={action.id} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                            <div>
                                <p className="text-white font-medium">{action.action}</p>
                                <p className="text-sm text-slate-400">{action.user}</p>
                            </div>
                            <span className="text-xs text-slate-500">{action.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Moderator Permissions Info */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <Shield className="text-yellow-400 mt-1" size={24} />
                    <div>
                        <h3 className="text-lg font-heading font-bold text-white mb-2">Moderator Permissions</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>✓ Approve/Reject purchase requests</li>
                            <li>✓ View all student activity logs</li>
                            <li>✓ Monitor real-time student logins</li>
                            <li>✓ View user profiles and enrollments</li>
                            <li>✗ Cannot create/edit courses (Instructor/Admin only)</li>
                            <li>✗ Cannot delete users (Super Admin only)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, href }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
}) {
    return (
        <Link href={href}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-yellow-500/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                    {icon}
                </div>
                <p className="text-2xl font-bold text-white mb-1">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
            </div>
        </Link>
    );
}

function QuickActionCard({ title, description, href, icon, color }: {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    color: string;
}) {
    const colorClasses = {
        yellow: 'text-yellow-400 hover:border-yellow-500/50',
        blue: 'text-blue-400 hover:border-blue-500/50',
        green: 'text-green-400 hover:border-green-500/50',
    };

    return (
        <Link href={href}>
            <div className={`bg-slate-950/50 border border-slate-800 rounded-lg p-4 hover:bg-slate-900/50 transition-all cursor-pointer ${colorClasses[color as keyof typeof colorClasses]}`}>
                <div className={`mb-3 ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]}`}>
                    {icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
        </Link>
    );
}
