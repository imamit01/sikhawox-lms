'use client';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export default function MarketplacePage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    Course Marketplace
                </h1>
                <p className="text-slate-400">Explore and purchase premium coding courses</p>
            </motion.div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <ShoppingCart className="mx-auto mb-4 text-slate-600" size={64} />
                <h2 className="text-2xl font-bold text-white mb-2">No Courses Available Yet</h2>
                <p className="text-slate-400">
                    Courses will appear here once the admin adds them to the platform.
                </p>
            </div>
        </div>
    );
}
