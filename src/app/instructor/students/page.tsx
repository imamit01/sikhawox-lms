'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Users,
    BookOpen,
    TrendingUp,
    Mail,
    Eye,
    Filter
} from 'lucide-react';

interface Student {
    id: number;
    name: string;
    email: string;
    enrolledCourses: string[];
    progress: number;
    lastActive: string;
    status: 'active' | 'inactive';
}

export default function InstructorStudentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState<string>('all');

    const [students] = useState<Student[]>([
        {
            id: 1,
            name: 'Alex Brown',
            email: 'alex@example.com',
            enrolledCourses: ['Advanced React Patterns', 'TypeScript Deep Dive'],
            progress: 65,
            lastActive: '2 hours ago',
            status: 'active'
        },
        {
            id: 2,
            name: 'Emily Davis',
            email: 'emily@example.com',
            enrolledCourses: ['Node.js Masterclass'],
            progress: 82,
            lastActive: '1 day ago',
            status: 'active'
        },
        {
            id: 3,
            name: 'Chris Wilson',
            email: 'chris@example.com',
            enrolledCourses: ['Advanced React Patterns'],
            progress: 45,
            lastActive: '3 days ago',
            status: 'inactive'
        },
    ]);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: students.length,
        active: students.filter(s => s.status === 'active').length,
        avgProgress: Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-heading font-bold text-white mb-2">
                    My Students
                </h1>
                <p className="text-slate-400">Track and manage your students' progress</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Total Students" value={stats.total} color="blue" />
                <StatCard label="Active Students" value={stats.active} color="green" />
                <StatCard label="Avg Progress" value={`${stats.avgProgress}%`} color="purple" />
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Students Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950/50 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Student</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Enrolled Courses</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Progress</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Active</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-white">{student.name}</p>
                                            <p className="text-sm text-slate-400">{student.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {student.enrolledCourses.map((course, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-slate-800 rounded-full h-2 max-w-[100px]">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${student.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-slate-300">{student.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300 text-sm">
                                        {student.lastActive}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.status === 'active'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
    const colorClasses = {
        blue: 'text-blue-400',
        green: 'text-green-400',
        purple: 'text-purple-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${colorClasses[color as keyof typeof colorClasses]}`}>{label}</p>
        </div>
    );
}
