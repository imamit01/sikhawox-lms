'use client';

import { VellariLogo } from '@/components/brand/VellariLogo';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Trophy } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 relative overflow-hidden">
                {/* Animated background effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vellari-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="container mx-auto px-4 py-16 relative z-10">
                    {/* Header */}
                    <motion.header
                        className="flex justify-between items-center mb-20"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <VellariLogo size="lg" />
                        <div className="flex gap-4">
                            <Link
                                href="/login"
                                className="px-6 py-2 text-white hover:text-vellari-400 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.header>

                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6">
                                <span className="vellari-gradient-text">SIKHAWOX</span>
                            </h1>
                            <p className="text-2xl md:text-3xl text-slate-300 mb-4">
                                Advanced EdTech Platform
                            </p>
                            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                                Master coding with professional video streaming, integrated IDE, and personalized learning paths
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/marketplace"
                                    className="group px-8 py-4 bg-vellari-500 text-white rounded-lg font-semibold hover:bg-vellari-600 transition-all flex items-center gap-2"
                                >
                                    Explore Courses
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="px-8 py-4 border border-vellari-500 text-vellari-400 rounded-lg font-semibold hover:bg-vellari-500/10 transition-all"
                                >
                                    View Dashboard
                                </Link>
                            </div>
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <FeatureCard
                                icon={<BookOpen size={32} />}
                                title="Premium Courses"
                                description="Learn from industry experts with high-quality video content"
                                href="/marketplace"
                            />
                            <FeatureCard
                                icon={<Code size={32} />}
                                title="Integrated IDE"
                                description="Practice coding directly in the browser with instant feedback"
                                href="/my-courses"
                            />
                            <FeatureCard
                                icon={<Trophy size={32} />}
                                title="Mock Tests"
                                description="Test your skills with timed coding challenges and get percentile rankings"
                                href="/mock-tests"
                            />
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
    return (
        <Link href={href}>
            <div className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-vellari-500/50 transition-all hover:scale-105 cursor-pointer h-full">
                <div className="text-vellari-400 mb-4 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400">{description}</p>
                <div className="mt-4 flex items-center text-vellari-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold">Learn more</span>
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
