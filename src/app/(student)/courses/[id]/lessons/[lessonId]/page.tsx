'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, FileText, Code } from 'lucide-react';

export default function LessonPlayerPage({ params }: { params: { id: string; lessonId: string } }) {
    const router = useRouter();
    const [completed, setCompleted] = useState(false);
    const [notes, setNotes] = useState('');

    // Mock lesson data
    const lesson = {
        id: params.lessonId,
        courseId: params.id,
        title: 'Introduction to Variables',
        type: 'video', // 'video', 'markdown', 'coding'
        videoUrl: 'https://stream.mux.com/your-video-id.m3u8',
        content: `
# Variables in JavaScript

Variables are containers for storing data values. In JavaScript, we can declare variables using:

- \`var\` (old way, avoid using)
- \`let\` (modern, block-scoped)
- \`const\` (modern, block-scoped, immutable)

## Example:

\`\`\`javascript
let name = "John";
const age = 25;
var city = "New York"; // avoid using var
\`\`\`

## Best Practices:

1. Use \`const\` by default
2. Use \`let\` when you need to reassign
3. Avoid \`var\` in modern JavaScript
        `,
        duration: '15:30',
        nextLesson: { id: '4', title: 'Data Types' },
        prevLesson: { id: '2', title: 'Setting up Environment' },
    };

    const handleMarkComplete = async () => {
        setCompleted(true);
        // API call to mark lesson as complete
        // await fetch(`/api/courses/${params.id}/lessons/${params.lessonId}/progress`, {
        //     method: 'POST',
        //     body: JSON.stringify({ completed: true })
        // });
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/courses/${params.id}`}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back to Course
                        </Link>
                        <h1 className="text-lg font-heading font-bold text-white">{lesson.title}</h1>
                        <button
                            onClick={handleMarkComplete}
                            disabled={completed}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${completed
                                    ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                                    : 'bg-vellari-500 text-white hover:bg-vellari-600'
                                }`}
                        >
                            <CheckCircle size={20} />
                            {completed ? 'Completed' : 'Mark as Complete'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        {lesson.type === 'video' && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                                <div className="aspect-video bg-slate-950 flex items-center justify-center">
                                    {/* Replace with actual Mux player */}
                                    <div className="text-center">
                                        <BookOpen className="mx-auto text-vellari-400 mb-4" size={64} />
                                        <p className="text-slate-400">Video Player (Mux Integration)</p>
                                        <p className="text-sm text-slate-500 mt-2">Duration: {lesson.duration}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Markdown Content */}
                        {lesson.type === 'markdown' && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                                <div className="prose prose-invert max-w-none">
                                    {/* Render markdown content */}
                                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                                </div>
                            </div>
                        )}

                        {/* Lesson Description */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-xl font-heading font-bold text-white mb-4">About this Lesson</h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-300">
                                    In this lesson, you'll learn about variables in JavaScript, including how to declare them
                                    using let, const, and var. We'll cover best practices and common pitfalls to avoid.
                                </p>
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-xl font-heading font-bold text-white mb-4">
                                <FileText className="inline-block mr-2" size={24} />
                                My Notes
                            </h2>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Take notes while learning..."
                                className="w-full h-32 p-4 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-vellari-500 resize-none"
                            />
                            <button className="mt-3 px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors text-sm">
                                Save Notes
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            {lesson.prevLesson ? (
                                <Link
                                    href={`/courses/${params.id}/lessons/${lesson.prevLesson.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                    Previous: {lesson.prevLesson.title}
                                </Link>
                            ) : (
                                <div />
                            )}
                            {lesson.nextLesson && (
                                <Link
                                    href={`/courses/${params.id}/lessons/${lesson.nextLesson.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors"
                                >
                                    Next: {lesson.nextLesson.title}
                                    <ChevronRight size={20} />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-24">
                            <h3 className="text-lg font-heading font-bold text-white mb-4">Course Content</h3>
                            <div className="space-y-2">
                                {/* Mock course lessons */}
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Link
                                        key={i}
                                        href={`/courses/${params.id}/lessons/${i + 1}`}
                                        className={`block p-3 rounded-lg transition-colors ${i + 1 === parseInt(params.lessonId)
                                                ? 'bg-vellari-500/20 border border-vellari-500/50'
                                                : 'hover:bg-slate-800'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {i < parseInt(params.lessonId) ? (
                                                <CheckCircle className="text-green-400" size={16} />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-sm text-white font-medium">Lesson {i + 1}</p>
                                                <p className="text-xs text-slate-400">15:30</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
