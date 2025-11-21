'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminMockTestsPage() {
    const [mockTests] = useState([
        { id: 1, title: 'JavaScript Fundamentals', duration: 60, questions: 30, difficulty: 'Medium' },
        { id: 2, title: 'React Advanced Patterns', duration: 90, questions: 40, difficulty: 'Hard' },
        { id: 3, title: 'Node.js Basics', duration: 45, questions: 25, difficulty: 'Easy' },
    ]);

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">
                        Mock Tests Management
                    </h1>
                    <p className="text-slate-400">Create and manage assessment tests</p>
                </div>
                <button className="px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors flex items-center gap-2">
                    <Plus size={20} />
                    Create Test
                </button>
            </motion.div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search mock tests..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-vellari-500"
                />
            </div>

            {/* Tests Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-950/50 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Test Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Duration</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Questions</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Difficulty</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {mockTests.map((test) => (
                            <tr key={test.id} className="hover:bg-slate-900/50 transition-colors">
                                <td className="px-6 py-4 text-white font-medium">{test.title}</td>
                                <td className="px-6 py-4 text-slate-300">{test.duration} min</td>
                                <td className="px-6 py-4 text-slate-300">{test.questions}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${test.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            test.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                        {test.difficulty}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                                            <Eye size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
