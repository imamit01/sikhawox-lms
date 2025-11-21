'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, TrendingUp, CheckCircle, XCircle, Download, Home } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MockTestResultsPage({ params }: { params: { id: string } }) {
    // Mock results data
    const results = {
        testId: params.id,
        testTitle: 'JavaScript Fundamentals',
        score: 85,
        totalMarks: 100,
        percentile: 92,
        timeTaken: 45, // minutes
        totalQuestions: 20,
        correctAnswers: 17,
        wrongAnswers: 2,
        unanswered: 1,
        passed: true,
        passingMarks: 60,
        attemptDate: new Date().toLocaleDateString(),
    };

    const questionBreakdown = Array.from({ length: 20 }, (_, i) => ({
        questionNo: i + 1,
        correct: i < 17,
        timeTaken: Math.floor(Math.random() * 5) + 1,
        topic: ['Variables', 'Functions', 'Arrays', 'Objects'][i % 4],
    }));

    const performanceData = [
        { name: 'Test 1', score: 65 },
        { name: 'Test 2', score: 72 },
        { name: 'Test 3', score: 78 },
        { name: 'Test 4', score: 85 },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-2">
                            Test Results
                        </h1>
                        <p className="text-slate-400">{results.testTitle}</p>
                    </div>
                    <Link
                        href="/mock-tests"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        <Home size={20} />
                        Back to Tests
                    </Link>
                </div>
            </motion.div>

            {/* Score Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className={`bg-gradient-to-br ${results.passed
                        ? 'from-green-500/10 to-emerald-500/10 border-green-500/20'
                        : 'from-red-500/10 to-orange-500/10 border-red-500/20'
                    } border rounded-xl p-8 text-center`}
            >
                <Trophy className={`mx-auto mb-4 ${results.passed ? 'text-green-400' : 'text-red-400'}`} size={64} />
                <h2 className="text-6xl font-bold text-white mb-2">{results.score}%</h2>
                <p className="text-xl text-slate-300 mb-4">
                    {results.passed ? 'Congratulations! You Passed!' : 'Keep Practicing!'}
                </p>
                <div className="flex items-center justify-center gap-8 mt-6">
                    <div>
                        <p className="text-3xl font-bold text-yellow-400">{results.percentile}th</p>
                        <p className="text-sm text-slate-400">Percentile</p>
                    </div>
                    <div className="w-px h-12 bg-slate-700" />
                    <div>
                        <p className="text-3xl font-bold text-blue-400">{results.timeTaken}m</p>
                        <p className="text-sm text-slate-400">Time Taken</p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<CheckCircle className="text-green-400" size={24} />}
                    label="Correct"
                    value={results.correctAnswers.toString()}
                    color="green"
                />
                <StatCard
                    icon={<XCircle className="text-red-400" size={24} />}
                    label="Wrong"
                    value={results.wrongAnswers.toString()}
                    color="red"
                />
                <StatCard
                    icon={<Target className="text-yellow-400" size={24} />}
                    label="Unanswered"
                    value={results.unanswered.toString()}
                    color="yellow"
                />
                <StatCard
                    icon={<Clock className="text-blue-400" size={24} />}
                    label="Avg Time/Q"
                    value={`${Math.floor(results.timeTaken / results.totalQuestions)}m`}
                    color="blue"
                />
            </div>

            {/* Performance Trend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
                <h3 className="text-xl font-heading font-bold text-white mb-4">Performance Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: '#10b981', r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Question-wise Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
            >
                <div className="p-6 border-b border-slate-800">
                    <h3 className="text-xl font-heading font-bold text-white">Question-wise Analysis</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Question</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Topic</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {questionBreakdown.map((q) => (
                                <tr key={q.questionNo} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 text-white">Question {q.questionNo}</td>
                                    <td className="px-6 py-4 text-slate-300">{q.topic}</td>
                                    <td className="px-6 py-4">
                                        {q.correct ? (
                                            <span className="flex items-center gap-2 text-green-400">
                                                <CheckCircle size={16} />
                                                Correct
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-red-400">
                                                <XCircle size={16} />
                                                Wrong
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">{q.timeTaken}m</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors font-semibold">
                    <Download size={20} />
                    Download Certificate
                </button>
                <Link
                    href={`/mock-tests/${params.id}`}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                    Retake Test
                </Link>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}) {
    const colorClasses = {
        green: 'border-green-500/20',
        red: 'border-red-500/20',
        yellow: 'border-yellow-500/20',
        blue: 'border-blue-500/20',
    };

    return (
        <div className={`bg-slate-900 border ${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-4`}>
            <div className="flex items-center gap-3 mb-2">
                {icon}
            </div>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}
