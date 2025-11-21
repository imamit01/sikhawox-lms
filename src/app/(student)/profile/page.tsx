'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Award, BookOpen, Trophy } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-heading font-bold text-white mb-2">
                    My Profile
                </h1>
                <p className="text-slate-400">View and manage your profile information</p>
            </motion.div>

            {/* Profile Header */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-vellari-500 to-vellari-600 flex items-center justify-center text-white text-3xl font-bold">
                        VS
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-heading font-bold text-white mb-2">SIKHAWOX Student</h2>
                        <p className="text-slate-400 mb-3">student@sikhawox.com</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <Calendar size={16} />
                                Joined November 2025
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    icon={<BookOpen className="text-vellari-400" size={24} />}
                    label="Courses Enrolled"
                    value="5"
                />
                <StatCard
                    icon={<Trophy className="text-yellow-400" size={24} />}
                    label="Mock Tests Taken"
                    value="8"
                />
                <StatCard
                    icon={<Award className="text-green-400" size={24} />}
                    label="Achievements"
                    value="12"
                />
            </div>

            {/* About */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-4">About</h3>
                <p className="text-slate-300">
                    Passionate learner exploring the world of technology and programming.
                </p>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <ActivityItem
                        title="Completed JavaScript Fundamentals"
                        time="2 days ago"
                        type="course"
                    />
                    <ActivityItem
                        title="Scored 85% on React Quiz"
                        time="5 days ago"
                        type="test"
                    />
                    <ActivityItem
                        title="Started Node.js Backend Development"
                        time="1 week ago"
                        type="course"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
                {icon}
            </div>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}

function ActivityItem({ title, time, type }: { title: string; time: string; type: string }) {
    const colors = {
        course: 'text-vellari-400',
        test: 'text-yellow-400'
    };

    return (
        <div className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${type === 'course' ? 'bg-vellari-400' : 'bg-yellow-400'}`} />
            <div className="flex-1">
                <p className="text-white text-sm">{title}</p>
                <p className="text-xs text-slate-500">{time}</p>
            </div>
        </div>
    );
}
