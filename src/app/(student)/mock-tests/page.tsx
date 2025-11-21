'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Clock, Target, TrendingUp, Award, CheckCircle } from 'lucide-react';

export default function MockTestsPage() {
    // Mock data - replace with real data from API
    const availableTests = [
        {
            id: 1,
            title: 'JavaScript Fundamentals',
            duration: 60,
            questions: 20,
            difficulty: 'Easy',
            topics: ['Variables', 'Functions', 'Arrays']
        },
        {
            id: 2,
            title: 'Data Structures & Algorithms',
            duration: 90,
            questions: 15,
            difficulty: 'Medium',
            topics: ['Arrays', 'Linked Lists', 'Trees']
        },
        {
            id: 3,
            title: 'Advanced React Patterns',
            duration: 120,
            questions: 25,
            difficulty: 'Hard',
            topics: ['Hooks', 'Context', 'Performance']
        }
    ];

    const completedTests = [
        {
            id: 1,
            title: 'Python Basics',
            score: 85,
            percentile: 92,
            date: '2025-11-15',
            totalQuestions: 20
        }
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
                    <Trophy className="inline-block mr-3 text-vellari-400" size={40} />
                    Mock Tests
                </h1>
                <p className="text-slate-400">Test your skills with timed coding challenges</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    icon={<Target className="text-vellari-400" size={24} />}
                    label="Tests Completed"
                    value={completedTests.length.toString()}
                />
                <StatCard
                    icon={<Award className="text-yellow-400" size={24} />}
                    label="Average Score"
                    value="85%"
                />
                <StatCard
                    icon={<TrendingUp className="text-green-400" size={24} />}
                    label="Best Percentile"
                    value="92nd"
                />
                <StatCard
                    icon={<CheckCircle className="text-blue-400" size={24} />}
                    label="Success Rate"
                    value="100%"
                />
            </div>

            {/* Available Tests */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Available Tests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableTests.map((test) => (
                        <TestCard key={test.id} test={test} />
                    ))}
                </div>
            </motion.div>

            {/* Test History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Test History</h2>
                <div className="space-y-4">
                    {completedTests.length > 0 ? (
                        completedTests.map((test) => (
                            <HistoryCard key={test.id} test={test} />
                        ))
                    ) : (
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                            <p className="text-slate-400">No tests completed yet. Start your first test above!</p>
                        </div>
                    )}
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

function TestCard({ test }: { test: any }) {
    const difficultyColors = {
        Easy: 'text-green-400 bg-green-500/10 border-green-500/20',
        Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
        Hard: 'text-red-400 bg-red-500/10 border-red-500/20'
    };

    return (
        <div className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-vellari-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-heading font-bold text-white">{test.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColors[test.difficulty as keyof typeof difficultyColors]}`}>
                    {test.difficulty}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock size={16} />
                    <span>{test.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Target size={16} />
                    <span>{test.questions} questions</span>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">Topics:</p>
                <div className="flex flex-wrap gap-2">
                    {test.topics.map((topic: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

            <Link
                href={`/mock-tests/${test.id}`}
                className="block w-full py-2 px-4 bg-vellari-500 text-white rounded-lg text-center font-semibold hover:bg-vellari-600 transition-colors"
            >
                Start Test
            </Link>
        </div>
    );
}

function HistoryCard({ test }: { test: any }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-vellari-500/50 transition-all">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-heading font-bold text-white mb-1">{test.title}</h3>
                    <p className="text-sm text-slate-400">Completed on {new Date(test.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-vellari-400">{test.score}%</p>
                        <p className="text-xs text-slate-500">Score</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-400">{test.percentile}th</p>
                        <p className="text-xs text-slate-500">Percentile</p>
                    </div>
                    <Link
                        href={`/mock-tests/${test.id}/results`}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm"
                    >
                        View Results
                    </Link>
                </div>
            </div>
        </div>
    );
}
