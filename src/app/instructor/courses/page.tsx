'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    BookOpen,
    Users,
    DollarSign,
    Edit,
    Eye,
    Trash2,
    MoreVertical,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface Course {
    id: number;
    title: string;
    description: string;
    students: number;
    revenue: number;
    rating: number;
    status: 'published' | 'draft';
    lastUpdated: string;
}

export default function InstructorCoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

    const [courses] = useState<Course[]>([
        {
            id: 1,
            title: 'Advanced React Patterns',
            description: 'Master advanced React concepts and patterns',
            students: 145,
            revenue: 4350,
            rating: 4.9,
            status: 'published',
            lastUpdated: '2025-11-15'
        },
        {
            id: 2,
            title: 'Node.js Masterclass',
            description: 'Complete guide to backend development with Node.js',
            students: 98,
            revenue: 3920,
            rating: 4.7,
            status: 'published',
            lastUpdated: '2025-11-10'
        },
        {
            id: 3,
            title: 'TypeScript Deep Dive',
            description: 'Learn TypeScript from basics to advanced',
            students: 67,
            revenue: 2680,
            rating: 4.8,
            status: 'published',
            lastUpdated: '2025-11-05'
        },
        {
            id: 4,
            title: 'GraphQL Fundamentals',
            description: 'Build modern APIs with GraphQL',
            students: 0,
            revenue: 0,
            rating: 0,
            status: 'draft',
            lastUpdated: '2025-11-20'
        },
    ]);

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: courses.length,
        published: courses.filter(c => c.status === 'published').length,
        draft: courses.filter(c => c.status === 'draft').length,
        totalStudents: courses.reduce((acc, c) => acc + c.students, 0)
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
                        My Courses
                    </h1>
                    <p className="text-slate-400">Manage and track your course performance</p>
                </div>
                <Link
                    href="/instructor/courses/new"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Create Course
                </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Total Courses" value={stats.total} color="blue" />
                <StatCard label="Published" value={stats.published} color="green" />
                <StatCard label="Drafts" value={stats.draft} color="yellow" />
                <StatCard label="Total Students" value={stats.totalStudents} color="purple" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                    <BookOpen className="mx-auto text-slate-600 mb-4" size={48} />
                    <p className="text-slate-400">No courses found</p>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
    const colorClasses = {
        blue: 'text-blue-400',
        green: 'text-green-400',
        yellow: 'text-yellow-400',
        purple: 'text-purple-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${colorClasses[color as keyof typeof colorClasses]}`}>{label}</p>
        </div>
    );
}

function CourseCard({ course }: { course: Course }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-heading font-bold text-white">{course.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${course.status === 'published'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                        {course.status}
                    </span>
                </div>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>

                {course.status === 'published' && (
                    <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-slate-400">
                            <Users size={14} />
                            <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                            <DollarSign size={14} />
                            <span>${course.revenue}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                            <span>⭐</span>
                            <span>{course.rating}</span>
                        </div>
                    </div>
                )}

                <div className="flex gap-2">
                    <Link
                        href={`/instructor/courses/${course.id}/edit`}
                        className="flex-1 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2 text-sm border border-blue-500/20"
                    >
                        <Edit size={16} />
                        Edit
                    </Link>
                    <Link
                        href={`/instructor/courses/${course.id}`}
                        className="flex-1 px-3 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        <Eye size={16} />
                        View
                    </Link>
                </div>
            </div>
            <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
                <button className="p-1 hover:bg-slate-800 rounded transition-colors">
                    <MoreVertical size={14} />
                </button>
            </div>
        </motion.div>
    );
}
