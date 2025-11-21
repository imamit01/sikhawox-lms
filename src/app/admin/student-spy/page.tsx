'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Eye,
    Clock,
    MapPin,
    Activity,
    TrendingUp,
    BookOpen,
    Code,
    Trophy,
    Calendar,
    Filter,
    Search
} from 'lucide-react';

interface ActivityLog {
    id: number;
    studentName: string;
    action: string;
    timestamp: string;
    ipAddress: string;
    location: string;
    duration?: number;
}

export default function StudentSpyPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d' | 'all'>('24h');

    // Mock data
    const activityLogs: ActivityLog[] = [
        {
            id: 1,
            studentName: 'Alex Brown',
            action: 'Started lesson: React Hooks',
            timestamp: '2025-11-20 20:45:00',
            ipAddress: '192.168.1.100',
            location: 'New York, USA',
            duration: 45
        },
        {
            id: 2,
            studentName: 'Emily Davis',
            action: 'Completed mock test: JavaScript Fundamentals',
            timestamp: '2025-11-20 20:30:00',
            ipAddress: '192.168.1.101',
            location: 'London, UK',
            duration: 60
        },
        {
            id: 3,
            studentName: 'Chris Wilson',
            action: 'Logged in',
            timestamp: '2025-11-20 20:15:00',
            ipAddress: '192.168.1.102',
            location: 'Toronto, Canada'
        },
        {
            id: 4,
            studentName: 'Sarah Johnson',
            action: 'Submitted code challenge',
            timestamp: '2025-11-20 20:00:00',
            ipAddress: '192.168.1.103',
            location: 'Sydney, Australia',
            duration: 120
        },
    ];

    const stats = {
        activeNow: 12,
        todayLogins: 45,
        avgSessionTime: 38,
        totalActivities: 234
    };

    const topStudents = [
        { name: 'Sarah Johnson', hours: 42, courses: 8 },
        { name: 'Emily Davis', hours: 38, courses: 5 },
        { name: 'Alex Brown', hours: 35, courses: 3 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
                    <Eye className="text-purple-400" size={32} />
                    Student Spy Dashboard
                </h1>
                <p className="text-slate-400">Real-time student activity monitoring</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Activity className="text-green-400" size={24} />}
                    label="Active Now"
                    value={stats.activeNow}
                    color="green"
                />
                <StatCard
                    icon={<Clock className="text-blue-400" size={24} />}
                    label="Today's Logins"
                    value={stats.todayLogins}
                    color="blue"
                />
                <StatCard
                    icon={<TrendingUp className="text-purple-400" size={24} />}
                    label="Avg Session (min)"
                    value={stats.avgSessionTime}
                    color="purple"
                />
                <StatCard
                    icon={<BookOpen className="text-yellow-400" size={24} />}
                    label="Total Activities"
                    value={stats.totalActivities}
                    color="yellow"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Feed */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-heading font-bold text-white">Live Activity Feed</h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
                                />
                            </div>
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value as typeof timeFilter)}
                                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                            >
                                <option value="24h">Last 24h</option>
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="all">All time</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {activityLogs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-purple-500/50 transition-all"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">{log.studentName}</p>
                                        <p className="text-sm text-slate-400">{log.action}</p>
                                    </div>
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={12} />
                                        <span>{log.location}</span>
                                    </div>
                                    {log.duration && (
                                        <div className="flex items-center gap-1">
                                            <Activity size={12} />
                                            <span>{log.duration} min</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1 font-mono">
                                        <span>{log.ipAddress}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Top Students Sidebar */}
                <div className="space-y-4">
                    <h2 className="text-xl font-heading font-bold text-white">Most Active Students</h2>
                    <div className="space-y-3">
                        {topStudents.map((student, index) => (
                            <div
                                key={index}
                                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                            index === 1 ? 'bg-slate-500/20 text-slate-400' :
                                                'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        #{index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white text-sm">{student.name}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <Clock size={12} />
                                        <span>{student.hours}h</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <BookOpen size={12} />
                                        <span>{student.courses} courses</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-3">Today's Highlights</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-300">
                                <span>Peak Activity:</span>
                                <span className="font-semibold">8:00 PM</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Most Popular Course:</span>
                                <span className="font-semibold">React</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Completion Rate:</span>
                                <span className="font-semibold text-green-400">87%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    color: string;
}) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="mb-2">{icon}</div>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}
