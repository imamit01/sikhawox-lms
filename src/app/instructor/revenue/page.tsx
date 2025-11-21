'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InstructorRevenuePage() {
    const revenueData = [
        { month: 'Jan', revenue: 2400 },
        { month: 'Feb', revenue: 3200 },
        { month: 'Mar', revenue: 2800 },
        { month: 'Apr', revenue: 3900 },
        { month: 'May', revenue: 4200 },
        { month: 'Jun', revenue: 3800 },
    ];

    const transactions = [
        { id: 1, course: 'Advanced React Patterns', amount: 299, date: '2025-11-20', student: 'John Doe' },
        { id: 2, course: 'Node.js Masterclass', amount: 399, date: '2025-11-19', student: 'Jane Smith' },
        { id: 3, course: 'TypeScript Deep Dive', amount: 249, date: '2025-11-18', student: 'Bob Johnson' },
    ];

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">
                        Revenue Dashboard
                    </h1>
                    <p className="text-slate-400">Track your earnings and payouts</p>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                    <Download size={20} />
                    Export Report
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Total Earnings" value="$12,450" color="green" />
                <StatCard label="This Month" value="$3,800" color="blue" />
                <StatCard label="Pending" value="$1,200" color="yellow" />
                <StatCard label="Paid Out" value="$11,250" color="purple" />
            </div>

            {/* Revenue Chart */}
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

            {/* Recent Transactions */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-heading font-bold text-white">Recent Transactions</h2>
                </div>
                <table className="w-full">
                    <thead className="bg-slate-950/50 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Course</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Student</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-900/50 transition-colors">
                                <td className="px-6 py-4 text-white font-medium">{tx.course}</td>
                                <td className="px-6 py-4 text-slate-300">{tx.student}</td>
                                <td className="px-6 py-4 text-slate-300">{new Date(tx.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-green-400 font-semibold">${tx.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
    const colorClasses = {
        green: 'text-green-400',
        blue: 'text-blue-400',
        yellow: 'text-yellow-400',
        purple: 'text-purple-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${colorClasses[color as keyof typeof colorClasses]}`}>{label}</p>
        </div>
    );
}
