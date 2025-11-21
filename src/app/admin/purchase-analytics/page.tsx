'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PurchaseAnalyticsPage() {
    const revenueData = [
        { month: 'Jan', revenue: 15400, purchases: 52 },
        { month: 'Feb', revenue: 18200, purchases: 61 },
        { month: 'Mar', revenue: 16800, purchases: 56 },
        { month: 'Apr', revenue: 21900, purchases: 73 },
        { month: 'May', revenue: 24200, purchases: 81 },
        { month: 'Jun', revenue: 22800, purchases: 76 },
    ];

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-heading font-bold text-white mb-2">
                    Purchase Analytics
                </h1>
                <p className="text-slate-400">Track revenue and purchase trends</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Total Revenue" value="$119,300" color="green" />
                <StatCard label="Total Purchases" value="399" color="blue" />
                <StatCard label="Avg Purchase" value="$299" color="purple" />
                <StatCard label="This Month" value="$22,800" color="yellow" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-heading font-bold text-white mb-4">Revenue Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-heading font-bold text-white mb-4">Purchase Volume</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="purchases" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
    const colorClasses = {
        green: 'text-green-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        yellow: 'text-yellow-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${colorClasses[color as keyof typeof colorClasses]}`}>{label}</p>
        </div>
    );
}
