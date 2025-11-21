'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, User, Play, CheckCircle, Lock } from 'lucide-react';

export default function CourseViewPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

    // Mock course data
    const course = {
        id: params.id,
        title: 'Complete JavaScript Masterclass',
        description: 'Master JavaScript from basics to advanced concepts with hands-on projects and real-world applications.',
        instructor: {
            name: 'John Doe',
            avatar: '/avatars/instructor.jpg',
            title: 'Senior Software Engineer',
            students: 15000,
        },
        thumbnail: '/course-thumbnails/js.jpg',
        price: 2999,
        rating: 4.8,
        totalReviews: 1250,
        totalStudents: 15420,
        duration: '42 hours',
        level: 'Intermediate',
        language: 'English',
        lastUpdated: '2025-11-15',
        enrolled: true,
        progress: 35,
        modules: [
            {
                id: 1,
                title: 'Introduction to JavaScript',
                lessons: [
                    { id: 1, title: 'What is JavaScript?', duration: '10:30', type: 'video', completed: true, locked: false },
                    { id: 2, title: 'Setting up Environment', duration: '15:20', type: 'video', completed: true, locked: false },
                    { id: 3, title: 'Your First Program', duration: '12:45', type: 'video', completed: false, locked: false },
                ],
            },
            {
                id: 2,
                title: 'Variables and Data Types',
                lessons: [
                    { id: 4, title: 'Variables in JavaScript', duration: '18:30', type: 'video', completed: false, locked: false },
                    { id: 5, title: 'Data Types', duration: '20:15', type: 'video', completed: false, locked: false },
                    { id: 6, title: 'Type Conversion', duration: '14:50', type: 'video', completed: false, locked: false },
                    { id: 7, title: 'Practice Challenge', duration: '30:00', type: 'coding', completed: false, locked: false },
                ],
            },
            {
                id: 3,
                title: 'Functions and Scope',
                lessons: [
                    { id: 8, title: 'Function Basics', duration: '22:30', type: 'video', completed: false, locked: true },
                    { id: 9, title: 'Arrow Functions', duration: '16:20', type: 'video', completed: false, locked: true },
                ],
            },
        ],
    };

    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = course.modules.reduce(
        (acc, module) => acc + module.lessons.filter(l => l.completed).length,
        0
    );

    return (
        <div className="space-y-8">
            {/* Course Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-vellari-500/10 to-emerald-500/10 border border-vellari-500/20 rounded-xl p-8"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-heading font-bold text-white mb-4">{course.title}</h1>
                        <p className="text-lg text-slate-300 mb-6">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-6 mb-6">
                            <div className="flex items-center gap-2">
                                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                                <span className="text-white font-semibold">{course.rating}</span>
                                <span className="text-slate-400">({course.totalReviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <User size={20} />
                                <span>{course.totalStudents.toLocaleString()} students</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Clock size={20} />
                                <span>{course.duration}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-vellari-500 flex items-center justify-center text-white font-bold">
                                {course.instructor.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-semibold">{course.instructor.name}</p>
                                <p className="text-sm text-slate-400">{course.instructor.title}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {course.enrolled && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-sm">Your Progress</span>
                                        <span className="text-vellari-400 font-semibold">{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-vellari-500 to-vellari-600 h-2 rounded-full transition-all"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        {completedLessons} of {totalLessons} lessons completed
                                    </p>
                                </div>
                                <Link
                                    href={`/courses/${course.id}/lessons/3`}
                                    className="block w-full py-3 px-4 bg-vellari-500 text-white rounded-lg text-center font-semibold hover:bg-vellari-600 transition-colors"
                                >
                                    Continue Learning
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="border-b border-slate-800">
                <div className="flex gap-8">
                    {(['overview', 'curriculum', 'reviews'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-2 font-semibold capitalize transition-colors ${activeTab === tab
                                ? 'text-vellari-400 border-b-2 border-vellari-400'
                                : 'text-slate-400 hover:text-slate-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'curriculum' && (
                <div className="space-y-4">
                    {course.modules.map((module, moduleIdx) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: moduleIdx * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                        >
                            <div className="p-6 bg-slate-950/50">
                                <h3 className="text-xl font-heading font-bold text-white">
                                    Module {module.id}: {module.title}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    {module.lessons.length} lessons
                                </p>
                            </div>
                            <div className="divide-y divide-slate-800">
                                {module.lessons.map((lesson) => (
                                    <Link
                                        key={lesson.id}
                                        href={lesson.locked ? '#' : `/courses/${course.id}/lessons/${lesson.id}`}
                                        className={`flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {lesson.completed ? (
                                                <CheckCircle className="text-green-400" size={20} />
                                            ) : lesson.locked ? (
                                                <Lock className="text-slate-500" size={20} />
                                            ) : (
                                                <Play className="text-vellari-400" size={20} />
                                            )}
                                            <div>
                                                <p className="text-white font-medium">{lesson.title}</p>
                                                <p className="text-xs text-slate-500 capitalize">{lesson.type}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-slate-400">{lesson.duration}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'overview' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                    <h3 className="text-2xl font-heading font-bold text-white mb-4">What you'll learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Master JavaScript fundamentals',
                            'Build real-world projects',
                            'Understand ES6+ features',
                            'Work with APIs and async code',
                            'DOM manipulation techniques',
                            'Modern development practices',
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="text-vellari-400 mt-1" size={20} />
                                <span className="text-slate-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                    <Star className="mx-auto text-yellow-400 mb-4" size={48} />
                    <p className="text-slate-400">Reviews coming soon</p>
                </div>
            )}
        </div>
    );
}
