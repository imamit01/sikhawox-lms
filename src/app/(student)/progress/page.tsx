'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, BookOpen, Code, Trophy, Award, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProgressPage() {
    // Mock data - replace with real data from API
    const stats = {
        coursesCompleted: 3,
        coursesInProgress: 2,
        totalCourses: 5,
        problemsSolved: 45,
        mockTestsTaken: 8,
        averageScore: 85,
        currentStreak: 7,
        totalHours: 42
    };

    const courseProgress = [
        {
            id: 1,
            title: 'JavaScript Fundamentals',
            progress: 100,
            lessonsCompleted: 20,
            totalLessons: 20,
            status: 'completed'
        },
        {
            id: 2,
            title: 'React Advanced Patterns',
            progress: 65,
            lessonsCompleted: 13,
            totalLessons: 20,
            status: 'in-progress'
        },
        {
            id: 3,
            title: 'Node.js Backend Development',
            progress: 30,
            lessonsCompleted: 6,
            totalLessons: 20,
            status: 'in-progress'
        }
    ];

    const skillProgress = [
        { skill: 'JavaScript', level: 85 },
        { skill: 'React', level: 70 },
        { skill: 'Node.js', level: 45 },
        { skill: 'TypeScript', level: 60 },
        { skill: 'Data Structures', level: 75 }
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
                    <TrendingUp className="inline-block mr-3 text-vellari-400" size={40} />
                    My Progress
                </h1>
                <p className="text-slate-400">Track your learning journey and achievements</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<BookOpen className="text-vellari-400" size={24} />}
                    label="Courses Completed"
                    value={`${stats.coursesCompleted}/${stats.totalCourses}`}
                />
                <StatCard
                    icon={<Code className="text-blue-400" size={24} />}
                    label="Problems Solved"
                    value={stats.problemsSolved.toString()}
                />
                <StatCard
                    icon={<Trophy className="text-yellow-400" size={24} />}
                    label="Mock Tests"
                    value={stats.mockTestsTaken.toString()}
                />
                <StatCard
                    icon={<Award className="text-green-400" size={24} />}
                    label="Average Score"
                    value={`${stats.averageScore}%`}
                />
            </div>

            {/* Course Progress */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Course Progress</h2>
                <div className="space-y-4">
                    {courseProgress.map((course) => (
                        <CourseProgressCard key={course.id} course={course} />
                    ))}
                </div>
            </motion.div>

            {/* Skills Progress */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Skills Development</h2>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="space-y-6">
                        {skillProgress.map((skill, index) => (
                            <SkillBar key={index} skill={skill.skill} level={skill.level} />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Activity Chart Placeholder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Learning Activity</h2>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                    <BarChart3 className="mx-auto text-vellari-400 mb-4" size={48} />
                    <p className="text-slate-400">Activity chart coming soon</p>
                    <p className="text-sm text-slate-500 mt-2">Track your daily learning hours and consistency</p>
                </div>
            </motion.div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                {icon}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}

function CourseProgressCard({ course }: { course: any }) {
    const statusColors = {
        'completed': 'text-green-400 bg-green-500/10 border-green-500/20',
        'in-progress': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
        'not-started': 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-vellari-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-heading font-bold text-white mb-1">{course.title}</h3>
                    <p className="text-sm text-slate-400">
                        {course.lessonsCompleted} of {course.totalLessons} lessons completed
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[course.status as keyof typeof statusColors]}`}>
                    {course.progress}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-vellari-500 to-vellari-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>

            <div className="mt-4 flex justify-between items-center">
                <Link
                    href={`/my-courses/${course.id}`}
                    className="text-sm text-vellari-400 hover:text-vellari-300 transition-colors"
                >
                    Continue Learning →
                </Link>
            </div>
        </div>
    );
}

function SkillBar({ skill, level }: { skill: string; level: number }) {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-white">{skill}</span>
                <span className="text-sm text-vellari-400">{level}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-vellari-500 to-vellari-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1, delay: 0.1 }}
                />
            </div>
        </div>
    );
}
