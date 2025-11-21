'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    BookOpen,
    Video,
    FileText,
    Code,
    CheckCircle,
    Save,
    Eye,
    Trash2,
    GripVertical,
    Upload
} from 'lucide-react';

interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'text' | 'code' | 'quiz';
    duration: number;
    order: number;
}

interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    order: number;
}

export default function CourseBuilderPage() {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [modules, setModules] = useState<Module[]>([]);
    const [activeModule, setActiveModule] = useState<string | null>(null);

    const addModule = () => {
        const newModule: Module = {
            id: `module-${Date.now()}`,
            title: 'New Module',
            description: '',
            lessons: [],
            order: modules.length
        };
        setModules([...modules, newModule]);
        setActiveModule(newModule.id);
    };

    const addLesson = (moduleId: string, type: Lesson['type']) => {
        setModules(modules.map(module => {
            if (module.id === moduleId) {
                const newLesson: Lesson = {
                    id: `lesson-${Date.now()}`,
                    title: 'New Lesson',
                    type,
                    duration: 0,
                    order: module.lessons.length
                };
                return {
                    ...module,
                    lessons: [...module.lessons, newLesson]
                };
            }
            return module;
        }));
    };

    const deleteModule = (moduleId: string) => {
        setModules(modules.filter(m => m.id !== moduleId));
        if (activeModule === moduleId) {
            setActiveModule(null);
        }
    };

    const deleteLesson = (moduleId: string, lessonId: string) => {
        setModules(modules.map(module => {
            if (module.id === moduleId) {
                return {
                    ...module,
                    lessons: module.lessons.filter(l => l.id !== lessonId)
                };
            }
            return module;
        }));
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
                    Course Builder
                </h1>
                <p className="text-slate-400">Create and manage comprehensive courses</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Details */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-heading font-bold text-white mb-4">Course Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Course Name
                                </label>
                                <input
                                    type="text"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    placeholder="e.g., Advanced React Patterns"
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-vellari-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    placeholder="Course description..."
                                    rows={4}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-vellari-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    value={coursePrice}
                                    onChange={(e) => setCoursePrice(e.target.value)}
                                    placeholder="299"
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-vellari-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Thumbnail
                                </label>
                                <button className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-400 hover:border-vellari-500 transition-colors flex items-center justify-center gap-2">
                                    <Upload size={20} />
                                    Upload Image
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Course Stats */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-heading font-bold text-white mb-4">Course Stats</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Modules:</span>
                                <span className="text-white font-semibold">{modules.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Total Lessons:</span>
                                <span className="text-white font-semibold">
                                    {modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Est. Duration:</span>
                                <span className="text-white font-semibold">
                                    {Math.round(modules.reduce((acc, m) =>
                                        acc + m.lessons.reduce((sum, l) => sum + l.duration, 0), 0) / 60)}h
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Structure */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-heading font-bold text-white">Course Structure</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={addModule}
                                className="px-4 py-2 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Add Module
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                                <Eye size={20} />
                                Preview
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                                <Save size={20} />
                                Save
                            </button>
                        </div>
                    </div>

                    {modules.length === 0 ? (
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                            <BookOpen className="mx-auto text-slate-600 mb-4" size={48} />
                            <p className="text-slate-400 mb-4">No modules yet. Start building your course!</p>
                            <button
                                onClick={addModule}
                                className="px-6 py-3 bg-vellari-500 text-white rounded-lg hover:bg-vellari-600 transition-colors"
                            >
                                Create First Module
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {modules.map((module, index) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    index={index}
                                    isActive={activeModule === module.id}
                                    onToggle={() => setActiveModule(activeModule === module.id ? null : module.id)}
                                    onAddLesson={(type) => addLesson(module.id, type)}
                                    onDelete={() => deleteModule(module.id)}
                                    onDeleteLesson={(lessonId) => deleteLesson(module.id, lessonId)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ModuleCard({
    module,
    index,
    isActive,
    onToggle,
    onAddLesson,
    onDelete,
    onDeleteLesson
}: {
    module: Module;
    index: number;
    isActive: boolean;
    onToggle: () => void;
    onAddLesson: (type: Lesson['type']) => void;
    onDelete: () => void;
    onDeleteLesson: (lessonId: string) => void;
}) {
    const lessonTypes: { type: Lesson['type']; icon: any; label: string; color: string }[] = [
        { type: 'video', icon: Video, label: 'Video', color: 'text-red-400' },
        { type: 'text', icon: FileText, label: 'Article', color: 'text-blue-400' },
        { type: 'code', icon: Code, label: 'Code', color: 'text-green-400' },
        { type: 'quiz', icon: CheckCircle, label: 'Quiz', color: 'text-yellow-400' },
    ];

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/70 transition-colors"
                onClick={onToggle}
            >
                <div className="flex items-center gap-3">
                    <GripVertical className="text-slate-600" size={20} />
                    <div className="w-8 h-8 rounded-lg bg-vellari-500/20 text-vellari-400 flex items-center justify-center font-bold">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">{module.title}</h3>
                        <p className="text-sm text-slate-400">{module.lessons.length} lessons</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {isActive && (
                <div className="border-t border-slate-800 p-4 space-y-3">
                    {/* Add Lesson Buttons */}
                    <div className="flex gap-2 flex-wrap">
                        {lessonTypes.map(({ type, icon: Icon, label, color }) => (
                            <button
                                key={type}
                                onClick={() => onAddLesson(type)}
                                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg hover:border-vellari-500 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Icon size={16} className={color} />
                                <span className="text-slate-300">Add {label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Lessons List */}
                    {module.lessons.length > 0 && (
                        <div className="space-y-2">
                            {module.lessons.map((lesson) => {
                                const lessonType = lessonTypes.find(t => t.type === lesson.type);
                                const Icon = lessonType?.icon || FileText;
                                return (
                                    <div
                                        key={lesson.id}
                                        className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={16} className={lessonType?.color} />
                                            <span className="text-sm text-white">{lesson.title}</span>
                                        </div>
                                        <button
                                            onClick={() => onDeleteLesson(lesson.id)}
                                            className="p-1 hover:bg-red-500/10 rounded text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
