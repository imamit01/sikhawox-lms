'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    DollarSign,
    BookOpen,
    TrendingUp,
    Activity,
    AlertCircle,
    CheckCircle,
    Clock
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
    // Mock data - replace with real API data
    const stats = {
        totalStudents: 1247,
        totalInstructors: 45,
        totalCourses: 89,
        pendingRequests: 12,
        revenue: 45680,
        activeUsers: 892
    };

    const recentActivities = [
        { id: 1, type: 'purchase', user: 'John Doe', action: 'Requested course purchase', time: '2 min ago', status: 'pending' },
        { id: 2, type: 'course', user: 'Jane Smith', action: 'Created new course', time: '15 min ago', status: 'completed' },
        { id: 3, type: 'user', user: 'Mike Johnson', action: 'New student registered', time: '1 hour ago', status: 'completed' },
        { id: 4, type: 'purchase', user: 'Sarah Williams', action: 'Purchase approved', time: '2 hours ago', status: 'completed' },
    ];

    const pendingRequests = [
        { id: 1, student: 'Alex Brown', course: 'Advanced React Patterns', amount: 299, date: '2025-11-20' },
        { id: 2, student: 'Emily Davis', course: 'Node.js Masterclass', amount: 399, date: '2025-11-20' },
        { id: 3, student: 'Chris Wilson', course: 'Python for Data Science', amount: 499, date: '2025-11-19' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    God View Dashboard
                </h1>
                <p className="text-slate-400">Complete platform overview and analytics</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    icon={<Users className="text-blue-400" size={24} />}
                    label="Total Students"
                    value={stats.totalStudents.toLocaleString()}
                    trend="+12%"
                    trendUp={true}
                />
                <StatCard
                    icon={<Users className="text-purple-400" size={24} />}
                    label="Total Instructors"
                    value={stats.totalInstructors.toString()}
                    trend="+5%"
                    trendUp={true}
                />
                <StatCard
                    icon={<BookOpen className="text-vellari-400" size={24} />}
                    label="Total Courses"
                    value={stats.totalCourses.toString()}
                    trend="+8%"
                    trendUp={true}
                />
                <StatCard
                    icon={<DollarSign className="text-green-400" size={24} />}
                    label="Revenue (This Month)"
                    value={`$${stats.revenue.toLocaleString()}`}
                    trend="+23%"
                    trendUp={true}
                />
                <StatCard
                    icon={<Activity className="text-yellow-400" size={24} />}
                    label="Active Users"
                    value={stats.activeUsers.toLocaleString()}
                    trend="+15%"
                    trendUp={true}
                />
                <StatCard
                    icon={<AlertCircle className="text-red-400" size={24} />}
                    label="Pending Requests"
                    value={stats.pendingRequests.toString()}
                    trend="Needs attention"
                    trendUp={false}
                    link="/admin/purchase-requests"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
                >
                    <h2 className="text-xl font-heading font-bold text-white mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                                <div className={cn(
                                    'w-2 h-2 rounded-full mt-2',
                                    activity.status === 'pending' ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                                )} />
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">{activity.user}</p>
                                    <p className="text-xs text-slate-400">{activity.action}</p>
                                </div>
                                <span className="text-xs text-slate-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Pending Purchase Requests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-heading font-bold text-white">Pending Requests</h2>
                        <Link
                            href="/admin/purchase-requests"
                            className="text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {pendingRequests.map((request) => (
                            <div key={request.id} className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-red-500/50 transition-all">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="text-sm font-medium text-white">{request.student}</p>
                                        <p className="text-xs text-slate-400">{request.course}</p>
                                    </div>
                                    <span className="text-sm font-bold text-vellari-400">${request.amount}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock size={12} />
                                        {request.date}
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-green-500/10 text-green-400 rounded text-xs hover:bg-green-500/20 transition-colors">
                                            Approve
                                        </button>
                                        <button className="px-3 py-1 bg-red-500/10 text-red-400 rounded text-xs hover:bg-red-500/20 transition-colors">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="text-xl font-heading font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <QuickActionCard
                        title="Add Course"
                        href="/admin/course-builder"
                        icon={<BookOpen size={24} />}
                        color="vellari"
                    />
                    <QuickActionCard
                        title="Manage Users"
                        href="/admin/users/students"
                        icon={<Users size={24} />}
                        color="blue"
                    />
                    <QuickActionCard
                        title="View Analytics"
                        href="/admin/analytics"
                        icon={<TrendingUp size={24} />}
                        color="green"
                    />
                    <QuickActionCard
                        title="Student Spy"
                        href="/admin/student-spy"
                        icon={<Activity size={24} />}
                        color="purple"
                    />
                </div>
            </motion.div>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
    link?: string;
}

function StatCard({ icon, label, value, trend, trendUp, link }: StatCardProps) {
    const content = (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-red-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
                {icon}
                <span className={cn(
                    'text-xs font-semibold',
                    trendUp ? 'text-green-400' : 'text-red-400'
                )}>
                    {trend}
                </span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );

    return link ? <Link href={link}>{content}</Link> : content;
}

interface QuickActionCardProps {
    title: string;
    href: string;
    icon: React.ReactNode;
    color: 'vellari' | 'blue' | 'green' | 'purple';
}

function QuickActionCard({ title, href, icon, color }: QuickActionCardProps) {
    const colorClasses = {
        vellari: 'text-vellari-400 hover:bg-vellari-500/10 hover:border-vellari-500/50',
        blue: 'text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50',
        green: 'text-green-400 hover:bg-green-500/10 hover:border-green-500/50',
        purple: 'text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50',
    };

    return (
        <Link
            href={href}
            className={cn(
                'p-6 bg-slate-900/50 border border-slate-800 rounded-xl transition-all',
                colorClasses[color]
            )}
        >
            <div className="mb-3">{icon}</div>
            <h3 className="text-white font-semibold">{title}</h3>
        </Link>
    );
}
