'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Users,
    DollarSign,
    TrendingUp,
    Award,
    Clock,
    Eye,
    MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function InstructorDashboardPage() {
    // Mock data
    const stats = {
        totalCourses: 8,
        totalStudents: 342,
        monthlyRevenue: 12450,
        avgRating: 4.8,
        activeStudents: 287,
        completionRate: 76
    };

    const recentActivity = [
        { id: 1, student: 'Alex Brown', action: 'Completed React Hooks lesson', course: 'Advanced React', time: '5 min ago' },
        { id: 2, student: 'Emily Davis', action: 'Submitted assignment', course: 'Node.js Masterclass', time: '15 min ago' },
        { id: 3, student: 'Chris Wilson', action: 'Asked a question', course: 'Advanced React', time: '1 hour ago' },
    ];

    const topCourses = [
        { id: 1, name: 'Advanced React Patterns', students: 145, revenue: 4350, rating: 4.9 },
        { id: 2, name: 'Node.js Masterclass', students: 98, revenue: 3920, rating: 4.7 },
        { id: 3, name: 'TypeScript Deep Dive', students: 67, revenue: 2680, rating: 4.8 },
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
                    Welcome Back, Instructor! 👋
                </h1>
                <p className="text-slate-400">Here's what's happening with your courses today</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    icon={<BookOpen className="text-blue-400" size={24} />}
                    label="Total Courses"
                    value={stats.totalCourses}
                    trend="+2 this month"
                    color="blue"
                />
                <StatCard
                    icon={<Users className="text-green-400" size={24} />}
                    label="Total Students"
                    value={stats.totalStudents}
                    trend="+23 this week"
                    color="green"
                />
                <StatCard
                    icon={<DollarSign className="text-yellow-400" size={24} />}
                    label="Monthly Revenue"
                    value={`$${stats.monthlyRevenue.toLocaleString()}`}
                    trend="+15% vs last month"
                    color="yellow"
                />
                <StatCard
                    icon={<Award className="text-purple-400" size={24} />}
                    label="Average Rating"
                    value={stats.avgRating.toFixed(1)}
                    trend="⭐ Excellent"
                    color="purple"
                />
                <StatCard
                    icon={<Eye className="text-cyan-400" size={24} />}
                    label="Active Students"
                    value={stats.activeStudents}
                    trend="84% engagement"
                    color="cyan"
                />
                <StatCard
                    icon={<TrendingUp className="text-pink-400" size={24} />}
                    label="Completion Rate"
                    value={`${stats.completionRate}%`}
                    trend="+5% improvement"
                    color="pink"
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
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse" />
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">{activity.student}</p>
                                    <p className="text-xs text-slate-400">{activity.action}</p>
                                    <p className="text-xs text-slate-500 mt-1">{activity.course}</p>
                                </div>
                                <span className="text-xs text-slate-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/instructor/students"
                        className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View All Activity →
                    </Link>
                </motion.div>

                {/* Top Performing Courses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
                >
                    <h2 className="text-xl font-heading font-bold text-white mb-4">Top Performing Courses</h2>
                    <div className="space-y-4">
                        {topCourses.map((course, index) => (
                            <div key={course.id} className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                index === 1 ? 'bg-slate-500/20 text-slate-400' :
                                                    'bg-orange-500/20 text-orange-400'
                                            }`}>
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white text-sm">{course.name}</h3>
                                            <p className="text-xs text-slate-400">{course.students} students</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-green-400">${course.revenue}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Award size={12} className="text-yellow-400" />
                                    <span>{course.rating} rating</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/instructor/courses"
                        className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Manage All Courses →
                    </Link>
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
                        title="Create Course"
                        href="/instructor/courses/new"
                        icon={<BookOpen size={24} />}
                        color="blue"
                    />
                    <QuickActionCard
                        title="View Students"
                        href="/instructor/students"
                        icon={<Users size={24} />}
                        color="green"
                    />
                    <QuickActionCard
                        title="Create Assessment"
                        href="/instructor/assessments/new"
                        icon={<Award size={24} />}
                        color="purple"
                    />
                    <QuickActionCard
                        title="View Analytics"
                        href="/instructor/analytics"
                        icon={<TrendingUp size={24} />}
                        color="yellow"
                    />
                </div>
            </motion.div>
        </div>
    );
}

function StatCard({ icon, label, value, trend, color }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend: string;
    color: string;
}) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
                {icon}
                <span className="text-xs font-semibold text-green-400">{trend}</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}

function QuickActionCard({ title, href, icon, color }: {
    title: string;
    href: string;
    icon: React.ReactNode;
    color: string;
}) {
    const colorClasses = {
        blue: 'text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50',
        green: 'text-green-400 hover:bg-green-500/10 hover:border-green-500/50',
        purple: 'text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50',
        yellow: 'text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/50',
    };

    return (
        <Link
            href={href}
            className={`p-6 bg-slate-900/50 border border-slate-800 rounded-xl transition-all ${colorClasses[color as keyof typeof colorClasses]}`}
        >
            <div className="mb-3">{icon}</div>
            <h3 className="text-white font-semibold">{title}</h3>
        </Link>
    );
}
