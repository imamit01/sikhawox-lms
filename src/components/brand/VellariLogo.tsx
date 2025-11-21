import React from 'react';
import { motion } from 'framer-motion';

interface VellariLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    animated?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
};

export function VellariLogo({ size = 'md', animated = true, className = '' }: VellariLogoProps) {
    const LogoWrapper = animated ? motion.div : 'div';

    return (
        <LogoWrapper
            className={`flex items-center gap-3 ${className}`}
            {...(animated && {
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
            })}
        >
            {/* Logo Icon */}
            <svg
                className={sizeClasses[size]}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* V Shape with gradient */}
                <defs>
                    <linearGradient id="vellari-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                </defs>

                {/* Outer V */}
                <path
                    d="M8 8 L24 40 L40 8"
                    stroke="url(#vellari-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Inner accent */}
                <path
                    d="M14 12 L24 32 L34 12"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.5"
                />

                {/* Dot accent */}
                <circle cx="24" cy="42" r="2" fill="#10b981" />
            </svg>

            {/* Text Logo */}
            <span className={`font-heading font-bold vellari-gradient-text ${size === 'sm' ? 'text-xl' :
                size === 'md' ? 'text-2xl' :
                    size === 'lg' ? 'text-4xl' :
                        'text-5xl'
                }`}>
                SIKHAWOX
            </span>
        </LogoWrapper>
    );
}
