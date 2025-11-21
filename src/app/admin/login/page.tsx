'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VellariBranding } from '@/components/brand/VellariBranding';
import { VellariLogo } from '@/components/brand/VellariLogo';
import { Mail, Lock, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
                setLoading(false);
                return;
            }

            // Verify admin role
            if (data.user?.role !== 'SUPER_ADMIN' && data.user?.role !== 'MODERATOR') {
                setError('Access denied. Admin credentials required.');
                setLoading(false);
                return;
            }

            // Redirect to admin dashboard
            if (data.redirectUrl) {
                router.push(data.redirectUrl);
            } else {
                router.push('/admin/dashboard');
            }
        } catch (err) {
            console.error('Admin login error:', err);
            setError('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <VellariLogo size="lg" className="justify-center mb-4" />
                    </Link>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield className="text-red-400" size={24} />
                        <h2 className="text-2xl font-heading font-bold text-white">Admin Portal</h2>
                    </div>
                    <p className="text-slate-400 text-sm">Authorized Personnel Only</p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 shadow-2xl">
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-xs text-red-400 text-center">
                            <Shield className="inline-block mr-1" size={14} />
                            Secure Admin Access
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
                            <AlertCircle size={20} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                                    placeholder="admin@sikhawox.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Verifying...' : 'Access Admin Portal'}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    {/* Back to Main Login */}
                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                            ← Back to Student Login
                        </Link>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-slate-900/30 border border-slate-800 rounded-lg">
                    <p className="text-xs text-slate-500 text-center">
                        All admin access is logged and monitored. Unauthorized access attempts will be reported.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
