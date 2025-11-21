'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Lock, User, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-heading font-bold text-white mb-2">
                    Admin Settings
                </h1>
                <p className="text-slate-400">Manage platform configuration</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="text-vellari-400" size={24} />
                        <h2 className="text-xl font-heading font-bold text-white">General</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Platform Name</label>
                            <input
                                type="text"
                                defaultValue="SIKHAWOX LMS"
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-vellari-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Support Email</label>
                            <input
                                type="email"
                                defaultValue="support@sikhawox.com"
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-vellari-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="text-blue-400" size={24} />
                        <h2 className="text-xl font-heading font-bold text-white">Notifications</h2>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between">
                            <span className="text-slate-300">Email notifications</span>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-slate-300">Purchase alerts</span>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-slate-300">User activity alerts</span>
                            <input type="checkbox" className="w-5 h-5" />
                        </label>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="text-red-400" size={24} />
                        <h2 className="text-xl font-heading font-bold text-white">Security</h2>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between">
                            <span className="text-slate-300">Two-factor authentication</span>
                            <input type="checkbox" className="w-5 h-5" />
                        </label>
                        <label className="flex items-center justify-between">
                            <span className="text-slate-300">Login attempt logging</span>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </label>
                    </div>
                </div>

                {/* Profile */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <User className="text-purple-400" size={24} />
                        <h2 className="text-xl font-heading font-bold text-white">Profile</h2>
                    </div>
                    <button className="px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors">
                        Update Profile
                    </button>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                    Cancel
                </button>
                <button className="px-6 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
