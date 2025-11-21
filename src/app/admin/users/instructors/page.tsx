'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    UserPlus,
    BookOpen,
    DollarSign,
    TrendingUp,
    MoreVertical,
    Edit,
    Mail
} from 'lucide-react';

interface Instructor {
    id: number;
    name: string;
    email: string;
    joinDate: string;
    coursesCreated: number;
    totalStudents: number;
    revenue: number;
    status: 'active' | 'suspended';
}

export default function InstructorsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const [instructors] = useState<Instructor[]>([
        {
            id: 1,
            name: 'Dr. Sarah Mitchell',
            email: 'sarah.mitchell@sikhawox.com',
            joinDate: '2024-06-15',
            coursesCreated: 8,
            totalStudents: 342,
            revenue: 12450,
            status: 'active'
        },
        {
            id: 2,
            name: 'Prof. James Chen',
            email: 'james.chen@sikhawox.com',
            joinDate: '2024-08-20',
            coursesCreated: 5,
            totalStudents: 198,
            revenue: 8900,
            status: 'active'
        },
        {
            id: 3,
            name: 'Dr. Maria Garcia',
            email: 'maria.garcia@sikhawox.com',
            joinDate: '2024-09-10',
            coursesCreated: 3,
            totalStudents: 125,
            revenue: 5600,
            status: 'active'
        },
    ]);

    const filteredInstructors = instructors.filter(instructor =>
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: instructors.length,
        totalCourses: instructors.reduce((acc, i) => acc + i.coursesCreated, 0),
        totalStudents: instructors.reduce((acc, i) => acc + i.totalStudents, 0),
        totalRevenue: instructors.reduce((acc, i) => acc + i.revenue, 0)
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
                        Instructor Management
                    </h1>
                    <p className="text-slate-400">Manage and monitor instructor accounts</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <UserPlus size={20} />
                    Add Instructor
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Total Instructors" value={stats.total} color="blue" />
                <StatCard label="Total Courses" value={stats.totalCourses} color="purple" />
                <StatCard label="Total Students" value={stats.totalStudents} color="green" />
                <StatCard label="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="yellow" />
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Instructors Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950/50 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Instructor</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Join Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Courses</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Students</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Revenue</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredInstructors.map((instructor) => (
                                <tr key={instructor.id} className="hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-white">{instructor.name}</p>
                                            <p className="text-sm text-slate-400">{instructor.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {new Date(instructor.joinDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <BookOpen size={16} className="text-purple-400" />
                                            {instructor.coursesCreated}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {instructor.totalStudents.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                                            <DollarSign size={16} />
                                            ${instructor.revenue.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                                            {instructor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                                                <Edit size={18} />
                                            </button>
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
        purple: 'text-purple-400',
        green: 'text-green-400',
        yellow: 'text-yellow-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${colorClasses[color as keyof typeof colorClasses]}`}>{label}</p>
        </div>
    );
}
