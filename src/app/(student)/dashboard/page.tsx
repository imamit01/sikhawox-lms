'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Code, Trophy, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    Welcome to <span className="vellari-gradient-text">SIKHAWOX</span>
                </h1>
                <p className="text-slate-400">Continue your learning journey</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<BookOpen className="text-vellari-400" size={24} />}
                    label="Enrolled Courses"
                    value="0"
                    trend="+0%"
                />
                <StatCard
                    icon={<Code className="text-blue-400" size={24} />}
                    label="Problems Solved"
                    value="0"
                    trend="+0%"
                />
                <StatCard
                    icon={<Trophy className="text-yellow-400" size={24} />}
                    label="Mock Tests"
                    value="0"
                    trend="+0%"
                />
                <StatCard
                    icon={<TrendingUp className="text-green-400" size={24} />}
                    label="Progress"
                    value="0%"
                    trend="+0%"
                />
            </div>

            {/* Daily Tasks */}
            <motion.div
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                    Daily Tasks
                </h2>
                <div className="text-slate-400 text-center py-12">
                    <p>No courses enrolled yet.</p>
                    <Link
                        href="/marketplace"
                        className="inline-block mt-4 px-6 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors"
                    >
                        Browse Courses
                    </Link>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickActionCard
                    title="My Courses"
                    description="Continue where you left off"
                    href="/my-courses"
                    icon={<BookOpen size={32} />}
                />
                <QuickActionCard
                    title="Marketplace"
                    description="Explore new courses"
                    href="/marketplace"
                    icon={<Code size={32} />}
                />
                <QuickActionCard
                    title="Mock Tests"
                    description="Test your skills"
                    href="/mock-tests"
                    icon={<Trophy size={32} />}
                />
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-vellari-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
                {icon}
                <span className="text-sm text-green-400">{trend}</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}

function QuickActionCard({ title, description, href, icon }: { title: string; description: string; href: string; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-vellari-500/50 transition-all hover:scale-105"
        >
            <div className="text-vellari-400 mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </Link>
    );
}
