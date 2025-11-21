'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Edit, Trash2, Plus, UserCheck } from 'lucide-react';

export default function ModeratorsPage() {
    const [moderators] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@sikhawox.com', status: 'active', actionsToday: 12 },
        { id: 2, name: 'Bob Smith', email: 'bob@sikhawox.com', status: 'active', actionsToday: 8 },
        { id: 3, name: 'Carol Williams', email: 'carol@sikhawox.com', status: 'inactive', actionsToday: 0 },
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
                        Moderators
                    </h1>
                    <p className="text-slate-400">Manage platform moderators and their permissions</p>
                </div>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2">
                    <Plus size={20} />
                    Add Moderator
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Total Moderators" value="3" color="yellow" />
                <StatCard label="Active Today" value="2" color="green" />
                <StatCard label="Actions Today" value="20" color="blue" />
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search moderators..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                />
            </div>

            {/* Moderators Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-950/50 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Moderator</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions Today</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {moderators.map((mod) => (
                            <tr key={mod.id} className="hover:bg-slate-900/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                                            {mod.name.charAt(0)}
                                        </div>
                                        <span className="text-white font-medium">{mod.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-300">{mod.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${mod.status === 'active'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                        {mod.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-300">{mod.actionsToday}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                                            <UserCheck size={18} />
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

            {/* Moderator Permissions Info */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-3 flex items-center gap-2">
                    <Shield className="text-yellow-400" size={20} />
                    Moderator Permissions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                        <p className="font-semibold text-white mb-2">✓ Allowed:</p>
                        <ul className="space-y-1 ml-4">
                            <li>• Approve/Reject purchase requests</li>
                            <li>• View all student activity logs</li>
                            <li>• Monitor real-time student logins</li>
                            <li>• View user profiles and enrollments</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white mb-2">✗ Restricted:</p>
                        <ul className="space-y-1 ml-4">
                            <li>• Cannot create/edit courses</li>
                            <li>• Cannot delete users</li>
                            <li>• Cannot modify platform settings</li>
                            <li>• Cannot manage other moderators</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
    const colorClasses = {
        yellow: 'text-yellow-400',
        green: 'text-green-400',
        blue: 'text-blue-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${colorClasses[color as keyof typeof colorClasses]}`}>{label}</p>
        </div>
    );
}
