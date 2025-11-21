'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    BookOpen,
    DollarSign,
    Eye,
    Clock,
    Award,
    BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InstructorAnalyticsPage() {
    // Mock data
    const revenueData = [
        { month: 'Jan', revenue: 2400 },
        { month: 'Feb', revenue: 3200 },
        { month: 'Mar', revenue: 2800 },
        { month: 'Apr', revenue: 3900 },
        { month: 'May', revenue: 4200 },
        { month: 'Jun', revenue: 3800 },
    ];

    const enrollmentData = [
        { month: 'Jan', students: 45 },
        { month: 'Feb', students: 62 },
        { month: 'Mar', students: 58 },
        { month: 'Apr', students: 78 },
        { month: 'May', students: 85 },
        { month: 'Jun', students: 72 },
    ];

    const coursePerformance = [
        { course: 'Advanced React', completion: 78, rating: 4.9, students: 145 },
        { course: 'Node.js', completion: 65, rating: 4.7, students: 98 },
        { course: 'TypeScript', completion: 82, rating: 4.8, students: 67 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-heading font-bold text-white mb-2">
                    Analytics Dashboard
                </h1>
                <p className="text-slate-400">Track your teaching performance and revenue</p>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                    icon={<DollarSign className="text-green-400" size={24} />}
                    label="Total Revenue"
                    value="$12,450"
                    trend="+15%"
                    color="green"
                />
                <MetricCard
                    icon={<Users className="text-blue-400" size={24} />}
                    label="Total Students"
                    value="342"
                    trend="+23"
                    color="blue"
                />
                <MetricCard
                    icon={<Award className="text-yellow-400" size={24} />}
                    label="Avg Rating"
                    value="4.8"
                    trend="⭐"
                    color="yellow"
                />
                <MetricCard
                    icon={<TrendingUp className="text-purple-400" size={24} />}
                    label="Completion Rate"
                    value="76%"
                    trend="+5%"
                    color="purple"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-heading font-bold text-white mb-4">Revenue Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Enrollment Chart */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-heading font-bold text-white mb-4">Student Enrollment</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={enrollmentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="students" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Course Performance */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-heading font-bold text-white mb-4">Course Performance</h2>
                <div className="space-y-4">
                    {coursePerformance.map((course, index) => (
                        <div key={index} className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-white">{course.course}</h3>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-slate-400 flex items-center gap-1">
                                        <Users size={14} />
                                        {course.students} students
                                    </span>
                                    <span className="text-yellow-400 flex items-center gap-1">
                                        <Award size={14} />
                                        {course.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-slate-800 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${course.completion}%` }}
                                    />
                                </div>
                                <span className="text-sm text-slate-300">{course.completion}% completion</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, trend, color }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    trend: string;
    color: string;
}) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                {icon}
                <span className="text-xs font-semibold text-green-400">{trend}</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}

