'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    User,
    BookOpen,
    Calendar
} from 'lucide-react';

type RequestStatus = 'pending' | 'approved' | 'rejected';

interface PurchaseRequest {
    id: number;
    studentName: string;
    studentEmail: string;
    courseName: string;
    amount: number;
    date: string;
    status: RequestStatus;
    reason?: string;
}

export default function PurchaseRequestsPage() {
    const [filter, setFilter] = useState<'all' | RequestStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data - replace with API
    const [requests, setRequests] = useState<PurchaseRequest[]>([
        {
            id: 1,
            studentName: 'Alex Brown',
            studentEmail: 'alex@example.com',
            courseName: 'Advanced React Patterns',
            amount: 299,
            date: '2025-11-20',
            status: 'pending'
        },
        {
            id: 2,
            studentName: 'Emily Davis',
            studentEmail: 'emily@example.com',
            courseName: 'Node.js Masterclass',
            amount: 399,
            date: '2025-11-20',
            status: 'pending'
        },
        {
            id: 3,
            studentName: 'Chris Wilson',
            studentEmail: 'chris@example.com',
            courseName: 'Python for Data Science',
            amount: 499,
            date: '2025-11-19',
            status: 'approved'
        },
        {
            id: 4,
            studentName: 'Sarah Johnson',
            studentEmail: 'sarah@example.com',
            courseName: 'Full Stack Web Development',
            amount: 599,
            date: '2025-11-18',
            status: 'rejected',
            reason: 'Insufficient documentation'
        },
    ]);

    const handleApprove = (id: number) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: 'approved' as RequestStatus } : req
        ));
    };

    const handleReject = (id: number) => {
        const reason = prompt('Reason for rejection:');
        if (reason) {
            setRequests(requests.map(req =>
                req.id === id ? { ...req, status: 'rejected' as RequestStatus, reason } : req
            ));
        }
    };

    const filteredRequests = requests.filter(req => {
        const matchesFilter = filter === 'all' || req.status === filter;
        const matchesSearch = req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.courseName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        pending: requests.filter(r => r.status === 'pending').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length,
        total: requests.length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-heading font-bold text-white mb-2">
                    Purchase Requests
                </h1>
                <p className="text-slate-400">Review and manage student purchase requests</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Total Requests" value={stats.total} icon={<DollarSign />} color="blue" />
                <StatCard label="Pending" value={stats.pending} icon={<Clock />} color="yellow" />
                <StatCard label="Approved" value={stats.approved} icon={<CheckCircle />} color="green" />
                <StatCard label="Rejected" value={stats.rejected} icon={<XCircle />} color="red" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by student or course..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as typeof filter)}
                        className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2">
                        <Download size={20} />
                        Export
                    </button>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                        <p className="text-slate-400">No requests found</p>
                    </div>
                ) : (
                    filteredRequests.map((request) => (
                        <RequestCard
                            key={request.id}
                            request={request}
                            onApprove={() => handleApprove(request.id)}
                            onReject={() => handleReject(request.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
    const colorClasses = {
        blue: 'text-blue-400',
        yellow: 'text-yellow-400',
        green: 'text-green-400',
        red: 'text-red-400'
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className={`mb-2 ${colorClasses[color as keyof typeof colorClasses]}`}>
                {icon}
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    );
}

function RequestCard({ request, onApprove, onReject }: {
    request: PurchaseRequest;
    onApprove: () => void;
    onReject: () => void;
}) {
    const statusConfig = {
        pending: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
        approved: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', label: 'Approved' },
        rejected: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', label: 'Rejected' }
    };

    const status = statusConfig[request.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-red-500/50 transition-all"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <User size={18} className="text-slate-400" />
                                {request.studentName}
                            </h3>
                            <p className="text-sm text-slate-400">{request.studentEmail}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.border} ${status.text}`}>
                            {status.label}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                            <BookOpen size={16} className="text-slate-400" />
                            <span>{request.courseName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <DollarSign size={16} className="text-green-400" />
                            <span className="font-semibold">${request.amount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Calendar size={16} />
                            <span>{request.date}</span>
                        </div>
                    </div>

                    {request.reason && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-xs text-red-400">
                                <strong>Rejection Reason:</strong> {request.reason}
                            </p>
                        </div>
                    )}
                </div>

                {request.status === 'pending' && (
                    <div className="flex gap-2">
                        <button
                            onClick={onApprove}
                            className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors flex items-center gap-2 border border-green-500/20"
                        >
                            <CheckCircle size={18} />
                            Approve
                        </button>
                        <button
                            onClick={onReject}
                            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 border border-red-500/20"
                        >
                            <XCircle size={18} />
                            Reject
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
