'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function MyCoursesPage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    My Courses
                </h1>
                <p className="text-slate-400">Your enrolled courses will appear here</p>
            </motion.div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <BookOpen className="mx-auto mb-4 text-slate-600" size={64} />
                <h2 className="text-2xl font-bold text-white mb-2">No Enrolled Courses</h2>
                <p className="text-slate-400 mb-6">
                    Purchase a course from the marketplace to start learning.
                </p>
                <a
                    href="/marketplace"
                    className="inline-block px-6 py-3 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors"
                >
                    Browse Courses
                </a>
            </div>
        </div>
    );
}
