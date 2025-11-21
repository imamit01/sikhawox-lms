'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    UserPlus,
    Mail,
    Calendar,
    BookOpen,
    TrendingUp,
    MoreVertical,
    Ban,
    CheckCircle,
    Edit
} from 'lucide-react';
import Link from 'next/link';

interface Student {
    id: number;
    name: string;
    email: string;
    joinDate: string;
    coursesEnrolled: number;
    progress: number;
    status: 'active' | 'suspended';
}

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

    // Mock data
    const [students, setStudents] = useState<Student[]>([
        {
            id: 1,
            name: 'Alex Brown',
            email: 'alex@example.com',
            joinDate: '2025-01-15',
            coursesEnrolled: 3,
            progress: 65,
            status: 'active'
        },
        {
            id: 2,
            name: 'Emily Davis',
            email: 'emily@example.com',
            joinDate: '2025-02-20',
            coursesEnrolled: 5,
            progress: 82,
            status: 'active'
        },
        {
            id: 3,
            name: 'Chris Wilson',
            email: 'chris@example.com',
            joinDate: '2025-03-10',
            coursesEnrolled: 2,
            progress: 45,
            status: 'active'
        },
        {
            id: 4,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            joinDate: '2024-12-05',
            coursesEnrolled: 8,
            progress: 95,
            status: 'active'
        },
    ]);

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: students.length,
        active: students.filter(s => s.status === 'active').length,
        suspended: students.filter(s => s.status === 'suspended').length,
        avgProgress: Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">
                        Student Management
                    </h1>
                    <p className="text-slate-400">Manage and monitor student accounts</p>
                </div>
                <button className="px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors flex items-center gap-2">
                    <UserPlus size={20} />
                    Add Student
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Total Students" value={stats.total} color="blue" />
                <StatCard label="Active" value={stats.active} color="green" />
                <StatCard label="Suspended" value={stats.suspended} color="red" />
                <StatCard label="Avg Progress" value={`${stats.avgProgress}%`} color="purple" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-vellari-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-vellari-500"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                </select>
            </div>

            {/* Students Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950/50 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Student</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Join Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Courses</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Progress</th>
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
                                    <td className="px-6 py-4 text-slate-300">
                                        {new Date(student.joinDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {student.coursesEnrolled}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-slate-800 rounded-full h-2 max-w-[100px]">
                                                <div
                                                    className="bg-vellari-500 h-2 rounded-full"
                                                    style={{ width: `${student.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-slate-300">{student.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.status === 'active'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/users/students/${student.id}`}
                                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
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
        red: 'text-red-400',
        purple: 'text-purple-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${colorClasses[color as keyof typeof colorClasses]}`}>{label}</p>
        </div>
    );
}
