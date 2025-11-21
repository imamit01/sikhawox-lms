import React from 'react';
import { motion } from 'framer-motion';

interface VellariBrandingProps {
    variant?: 'welcome' | 'footer' | 'auth';
    className?: string;
}

export function VellariBranding({ variant = 'welcome', className = '' }: VellariBrandingProps) {
    if (variant === 'welcome') {
        return (
            <motion.div
                className={`text-center ${className}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                    Welcome to <span className="vellari-gradient-text">SIKHAWOX</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                    Advanced EdTech & Coding Platform for Modern Learners
                </p>
            </motion.div>
        );
    }

    if (variant === 'footer') {
        return (
            <div className={`text-center ${className}`}>
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} <span className="text-vellari-400 font-semibold">SIKHAWOX</span>. All rights reserved.
                </p>
                <p className="text-xs text-slate-600 mt-1">
                    Empowering learners through technology
                </p>
            </div>
        );
    }

    if (variant === 'auth') {
        return (
            <div className={`text-center ${className}`}>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    <span className="vellari-gradient-text">SIKHAWOX</span>
                </h2>
                <p className="text-slate-400">
                    Your Learning Journey Starts Here
                </p>
            </div>
        );
    }

    return null;
}
