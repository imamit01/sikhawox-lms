'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Play, CheckCircle, Trophy, Clock, ChevronLeft } from 'lucide-react';

export default function CodingChallengePage({ params }: { params: { id: string; challengeId: string } }) {
    const [code, setCode] = useState('// Write your solution here\n\n');
    const [language, setLanguage] = useState('javascript');
    const [testResults, setTestResults] = useState<any>(null);
    const [isRunning, setIsRunning] = useState(false);

    // Mock challenge data
    const challenge = {
        id: params.challengeId,
        courseId: params.id,
        title: 'Reverse a String',
        difficulty: 'Easy',
        description: `Write a function that reverses a string. The input string is given as an array of characters.

You must do this by modifying the input array in-place with O(1) extra memory.`,
        examples: [
            {
                input: '["h","e","l","l","o"]',
                output: '["o","l","l","e","h"]',
            },
            {
                input: '["H","a","n","n","a","h"]',
                output: '["h","a","n","n","a","H"]',
            },
        ],
        constraints: [
            '1 <= s.length <= 10^5',
            's[i] is a printable ascii character',
        ],
        testCases: [
            { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]', hidden: false },
            { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]', hidden: false },
            { input: '["a"]', expected: '["a"]', hidden: true },
        ],
    };

    const handleRunCode = async () => {
        setIsRunning(true);

        // Simulate API call to Judge0
        setTimeout(() => {
            setTestResults({
                passed: 2,
                total: 3,
                results: [
                    { testCase: 1, passed: true, time: '0.02s' },
                    { testCase: 2, passed: true, time: '0.03s' },
                    { testCase: 3, passed: false, time: '0.01s', error: 'Wrong Answer' },
                ],
            });
            setIsRunning(false);
        }, 2000);
    };

    const handleSubmit = async () => {
        // Submit solution to API
        alert('Solution submitted!');
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/courses/${params.id}`}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back to Course
                        </Link>
                        <h1 className="text-lg font-heading font-bold text-white">{challenge.title}</h1>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleRunCode}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
                            >
                                <Play size={16} />
                                {isRunning ? 'Running...' : 'Run Code'}
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors"
                            >
                                <CheckCircle size={16} />
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Problem Description */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-heading font-bold text-white">{challenge.title}</h2>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${challenge.difficulty === 'Easy'
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                                        : challenge.difficulty === 'Medium'
                                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
                                            : 'bg-red-500/20 text-red-400 border border-red-500/20'
                                    }`}>
                                    {challenge.difficulty}
                                </span>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-300">{challenge.description}</p>

                                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Examples:</h3>
                                {challenge.examples.map((example, idx) => (
                                    <div key={idx} className="bg-slate-950 border border-slate-700 rounded-lg p-4 mb-3">
                                        <p className="text-sm text-slate-400 mb-1">Example {idx + 1}:</p>
                                        <p className="text-white font-mono text-sm">
                                            <strong>Input:</strong> {example.input}
                                        </p>
                                        <p className="text-white font-mono text-sm">
                                            <strong>Output:</strong> {example.output}
                                        </p>
                                    </div>
                                ))}

                                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Constraints:</h3>
                                <ul className="list-disc list-inside text-slate-300 space-y-1">
                                    {challenge.constraints.map((constraint, idx) => (
                                        <li key={idx}>{constraint}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Test Results */}
                        {testResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                            >
                                <h3 className="text-lg font-heading font-bold text-white mb-4">Test Results</h3>
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400">Passed</span>
                                        <span className={`font-semibold ${testResults.passed === testResults.total ? 'text-green-400' : 'text-yellow-400'
                                            }`}>
                                            {testResults.passed}/{testResults.total}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-vellari-500 to-vellari-600 h-2 rounded-full"
                                            style={{ width: `${(testResults.passed / testResults.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {testResults.results.map((result: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center justify-between p-3 rounded-lg ${result.passed ? 'bg-green-500/10' : 'bg-red-500/10'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {result.passed ? (
                                                    <CheckCircle className="text-green-400" size={16} />
                                                ) : (
                                                    <Code className="text-red-400" size={16} />
                                                )}
                                                <span className="text-white text-sm">Test Case {result.testCase}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-slate-400">{result.time}</span>
                                                {result.error && (
                                                    <span className="text-xs text-red-400">{result.error}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Code Editor */}
                    <div className="space-y-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-slate-800">
                                <h3 className="text-sm font-semibold text-white">Code Editor</h3>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="px-3 py-1 bg-slate-800 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-vellari-500"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                </select>
                            </div>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-[600px] p-4 bg-slate-950 text-white font-mono text-sm focus:outline-none resize-none"
                                spellCheck={false}
                            />
                        </div>

                        {/* Leaderboard Preview */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-heading font-bold text-white mb-4">
                                <Trophy className="inline-block mr-2 text-yellow-400" size={20} />
                                Leaderboard
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { rank: 1, name: 'Alice', time: '0.01s', language: 'Python' },
                                    { rank: 2, name: 'Bob', time: '0.02s', language: 'JavaScript' },
                                    { rank: 3, name: 'Charlie', time: '0.03s', language: 'C++' },
                                ].map((entry) => (
                                    <div key={entry.rank} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${entry.rank === 1 ? 'bg-yellow-500 text-black' :
                                                    entry.rank === 2 ? 'bg-slate-400 text-black' :
                                                        'bg-orange-600 text-white'
                                                }`}>
                                                {entry.rank}
                                            </span>
                                            <span className="text-white font-medium">{entry.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-slate-400">{entry.language}</span>
                                            <span className="text-vellari-400 font-mono">{entry.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
