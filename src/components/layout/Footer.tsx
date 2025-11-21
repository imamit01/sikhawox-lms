import React from 'react';
import { VellariBranding } from '@/components/brand/VellariBranding';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {


    return (
        <footer className="bg-slate-950 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-heading font-bold mb-4">
                            <span className="vellari-gradient-text">SIKHAWOX</span>
                        </h3>
                        <p className="text-slate-400 mb-4 max-w-md">
                            Advanced EdTech & Coding Platform empowering learners with cutting-edge technology and comprehensive learning resources.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-vellari-500/10 text-slate-400 hover:text-vellari-400 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-vellari-500/10 text-slate-400 hover:text-vellari-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-vellari-500/10 text-slate-400 hover:text-vellari-400 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-vellari-500/10 text-slate-400 hover:text-vellari-400 transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/marketplace" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-courses" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    My Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/mock-tests" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    Mock Tests
                                </Link>
                            </li>
                            <li>
                                <Link href="/progress" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    Progress
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-slate-400 hover:text-vellari-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <VellariBranding variant="footer" />
                </div>
            </div>
        </footer>
    );
}
