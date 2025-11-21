'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Flag, CheckCircle, AlertCircle, Code, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MockTestAttemptPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);

    // Mock test data
    const test = {
        id: params.id,
        title: 'JavaScript Fundamentals',
        duration: 60,
        totalQuestions: 20,
        questions: Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            type: i % 3 === 0 ? 'coding' : 'mcq',
            question: i % 3 === 0
                ? `Write a function to ${['reverse a string', 'find factorial', 'check palindrome'][i % 3]}`
                : `What is the output of the following code?`,
            options: i % 3 === 0 ? null : ['Option A', 'Option B', 'Option C', 'Option D'],
            code: i % 3 === 0 ? null : 'console.log(typeof null);',
        }))
    };

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Auto-save every 30 seconds
    useEffect(() => {
        const autoSave = setInterval(() => {
            // Save to localStorage or API
            localStorage.setItem(`test-${params.id}-progress`, JSON.stringify({
                answers,
                markedForReview: Array.from(markedForReview),
                currentQuestion,
                timeLeft
            }));
        }, 30000);

        return () => clearInterval(autoSave);
    }, [answers, markedForReview, currentQuestion, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (questionId: number, answer: any) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = () => {
        // Submit answers to API
        router.push(`/mock-tests/${params.id}/results`);
    };

    const toggleMarkForReview = (questionId: number) => {
        const newMarked = new Set(markedForReview);
        if (newMarked.has(questionId)) {
            newMarked.delete(questionId);
        } else {
            newMarked.add(questionId);
        }
        setMarkedForReview(newMarked);
    };

    const question = test.questions[currentQuestion];
    const isAnswered = answers[question.id] !== undefined;
    const isMarked = markedForReview.has(question.id);

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-heading font-bold text-white">{test.title}</h1>
                            <p className="text-sm text-slate-400">Question {currentQuestion + 1} of {test.totalQuestions}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeLeft < 300 ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-white'
                                }`}>
                                <Clock size={20} />
                                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                            </div>
                            <button
                                onClick={() => setShowSubmitDialog(true)}
                                className="px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors font-semibold"
                            >
                                Submit Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Question Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sticky top-24">
                            <h3 className="text-sm font-semibold text-white mb-3">Questions</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {test.questions.map((q, idx) => {
                                    const answered = answers[q.id] !== undefined;
                                    const marked = markedForReview.has(q.id);

                                    return (
                                        <button
                                            key={q.id}
                                            onClick={() => setCurrentQuestion(idx)}
                                            className={`
                                                w-10 h-10 rounded-lg text-sm font-semibold transition-all
                                                ${idx === currentQuestion ? 'ring-2 ring-vellari-500' : ''}
                                                ${answered && !marked ? 'bg-green-500/20 text-green-400' : ''}
                                                ${marked ? 'bg-yellow-500/20 text-yellow-400' : ''}
                                                ${!answered && !marked ? 'bg-slate-800 text-slate-400' : ''}
                                            `}
                                        >
                                            {idx + 1}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="mt-4 space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-green-500/20" />
                                    <span className="text-slate-400">Answered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-yellow-500/20" />
                                    <span className="text-slate-400">Marked</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-slate-800" />
                                    <span className="text-slate-400">Not Answered</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-8"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <h2 className="text-xl font-heading font-bold text-white">
                                    Question {currentQuestion + 1}
                                </h2>
                                <button
                                    onClick={() => toggleMarkForReview(question.id)}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${isMarked
                                            ? 'bg-yellow-500/20 text-yellow-400'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                        }`}
                                >
                                    <Flag size={16} />
                                    {isMarked ? 'Marked' : 'Mark for Review'}
                                </button>
                            </div>

                            <p className="text-lg text-white mb-6">{question.question}</p>

                            {question.code && (
                                <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 mb-6">
                                    <pre className="text-sm text-slate-300 font-mono">{question.code}</pre>
                                </div>
                            )}

                            {question.type === 'mcq' && question.options && (
                                <div className="space-y-3">
                                    {question.options.map((option, idx) => (
                                        <label
                                            key={idx}
                                            className={`
                                                flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all
                                                ${answers[question.id] === idx
                                                    ? 'bg-vellari-500/10 border-vellari-500 text-white'
                                                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                                                }
                                            `}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                checked={answers[question.id] === idx}
                                                onChange={() => handleAnswer(question.id, idx)}
                                                className="w-4 h-4"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {question.type === 'coding' && (
                                <div>
                                    <textarea
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                                        placeholder="Write your code here..."
                                        className="w-full h-64 p-4 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-vellari-500 resize-none"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        Tip: You can use C++, Java, or Python
                                    </p>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
                                <button
                                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                    disabled={currentQuestion === 0}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={20} />
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentQuestion(Math.min(test.totalQuestions - 1, currentQuestion + 1))}
                                    disabled={currentQuestion === test.totalQuestions - 1}
                                    className="flex items-center gap-2 px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Submit Confirmation Dialog */}
            {showSubmitDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full"
                    >
                        <h3 className="text-xl font-heading font-bold text-white mb-4">Submit Test?</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Answered:</span>
                                <span className="text-green-400 font-semibold">{Object.keys(answers).length}/{test.totalQuestions}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Marked for Review:</span>
                                <span className="text-yellow-400 font-semibold">{markedForReview.size}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Time Remaining:</span>
                                <span className="text-white font-semibold">{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-6">
                            Are you sure you want to submit? You won't be able to change your answers after submission.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSubmitDialog(false)}
                                className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors font-semibold"
                            >
                                Submit
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
