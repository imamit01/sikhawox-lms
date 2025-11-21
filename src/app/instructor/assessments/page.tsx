'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Code, CheckCircle } from 'lucide-react';

export default function InstructorAssessmentsPage() {
    const [assessments] = useState([
        { id: 1, title: 'React Hooks Quiz', type: 'Quiz', questions: 20, course: 'Advanced React' },
        { id: 2, title: 'Node.js Coding Challenge', type: 'Code', questions: 5, course: 'Node.js Masterclass' },
        { id: 3, title: 'TypeScript Assessment', type: 'Quiz', questions: 15, course: 'TypeScript Deep Dive' },
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
                        Assessments
                    </h1>
                    <p className="text-slate-400">Create and manage course assessments</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <Plus size={20} />
                    Create Assessment
                </button>
            </motion.div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search assessments..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Assessments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessments.map((assessment) => (
                    <div key={assessment.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {assessment.type === 'Quiz' ? (
                                    <CheckCircle className="text-blue-400" size={20} />
                                ) : (
                                    <Code className="text-green-400" size={20} />
                                )}
                                <span className="text-xs font-semibold text-slate-400">{assessment.type}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-heading font-bold text-white mb-2">{assessment.title}</h3>
                        <p className="text-sm text-slate-400 mb-4">{assessment.course}</p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">{assessment.questions} questions</span>
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                Edit →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
