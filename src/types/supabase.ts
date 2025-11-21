// Supabase Database Types
// Generated from schema.sql

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type UserRole = 'SUPER_ADMIN' | 'MODERATOR' | 'INSTRUCTOR' | 'STUDENT';
export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type LessonType = 'VIDEO' | 'TEXT' | 'CODING_CHALLENGE' | 'MIXED';
export type PurchaseStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type ActivityType =
    | 'LOGIN'
    | 'LOGOUT'
    | 'LESSON_COMPLETE'
    | 'CODE_SUBMIT'
    | 'MOCK_TEST_START'
    | 'MOCK_TEST_COMPLETE';
export type SubmissionStatus =
    | 'PENDING'
    | 'RUNNING'
    | 'ACCEPTED'
    | 'WRONG_ANSWER'
    | 'TIME_LIMIT_EXCEEDED'
    | 'MEMORY_LIMIT_EXCEEDED'
    | 'RUNTIME_ERROR'
    | 'COMPILATION_ERROR';

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    name: string;
                    avatar_url: string | null;
                    bio: string | null;
                    role: UserRole;
                    last_login: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    name: string;
                    avatar_url?: string | null;
                    bio?: string | null;
                    role?: UserRole;
                    last_login?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    name?: string;
                    avatar_url?: string | null;
                    bio?: string | null;
                    role?: UserRole;
                    last_login?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            courses: {
                Row: {
                    id: string;
                    title: string;
                    slug: string;
                    description: string | null;
                    thumbnail_url: string | null;
                    price: number;
                    level: CourseLevel;
                    status: CourseStatus;
                    duration_hours: number | null;
                    language: string;
                    tags: string[];
                    creator_id: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    slug: string;
                    description?: string | null;
                    thumbnail_url?: string | null;
                    price: number;
                    level?: CourseLevel;
                    status?: CourseStatus;
                    duration_hours?: number | null;
                    language?: string;
                    tags?: string[];
                    creator_id: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    title?: string;
                    slug?: string;
                    description?: string | null;
                    thumbnail_url?: string | null;
                    price?: number;
                    level?: CourseLevel;
                    status?: CourseStatus;
                    duration_hours?: number | null;
                    language?: string;
                    tags?: string[];
                    creator_id?: string;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            modules: {
                Row: {
                    id: string;
                    course_id: string;
                    title: string;
                    description: string | null;
                    order_index: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    course_id: string;
                    title: string;
                    description?: string | null;
                    order_index: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    course_id?: string;
                    title?: string;
                    description?: string | null;
                    order_index?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            lessons: {
                Row: {
                    id: string;
                    module_id: string;
                    title: string;
                    type: LessonType;
                    order_index: number;
                    video_url: string | null;
                    mux_playback_id: string | null;
                    markdown_content: string | null;
                    duration_minutes: number | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    module_id: string;
                    title: string;
                    type: LessonType;
                    order_index: number;
                    video_url?: string | null;
                    mux_playback_id?: string | null;
                    markdown_content?: string | null;
                    duration_minutes?: number | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    module_id?: string;
                    title?: string;
                    type?: LessonType;
                    order_index?: number;
                    video_url?: string | null;
                    mux_playback_id?: string | null;
                    markdown_content?: string | null;
                    duration_minutes?: number | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            purchase_requests: {
                Row: {
                    id: string;
                    user_id: string;
                    course_id: string;
                    status: PurchaseStatus;
                    transaction_id: string | null;
                    amount: number;
                    payment_proof_url: string | null;
                    reviewed_by: string | null;
                    reviewed_at: string | null;
                    rejection_reason: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    course_id: string;
                    status?: PurchaseStatus;
                    transaction_id?: string | null;
                    amount: number;
                    payment_proof_url?: string | null;
                    reviewed_by?: string | null;
                    reviewed_at?: string | null;
                    rejection_reason?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    course_id?: string;
                    status?: PurchaseStatus;
                    transaction_id?: string | null;
                    amount?: number;
                    payment_proof_url?: string | null;
                    reviewed_by?: string | null;
                    reviewed_at?: string | null;
                    rejection_reason?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            enrollments: {
                Row: {
                    id: string;
                    user_id: string;
                    course_id: string;
                    completed_lessons: number;
                    total_lessons: number;
                    progress_percent: number;
                    enrolled_at: string;
                    last_accessed_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    course_id: string;
                    completed_lessons?: number;
                    total_lessons?: number;
                    progress_percent?: number;
                    enrolled_at?: string;
                    last_accessed_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    course_id?: string;
                    completed_lessons?: number;
                    total_lessons?: number;
                    progress_percent?: number;
                    enrolled_at?: string;
                    last_accessed_at?: string;
                };
            };
            login_logs: {
                Row: {
                    id: string;
                    user_id: string;
                    ip_address: string | null;
                    user_agent: string | null;
                    login_timestamp: string;
                    logout_timestamp: string | null;
                    duration_seconds: number | null;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    login_timestamp?: string;
                    logout_timestamp?: string | null;
                    duration_seconds?: number | null;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    login_timestamp?: string;
                    logout_timestamp?: string | null;
                    duration_seconds?: number | null;
                };
            };
            activity_logs: {
                Row: {
                    id: string;
                    user_id: string;
                    activity_type: ActivityType;
                    metadata: Json | null;
                    timestamp: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    activity_type: ActivityType;
                    metadata?: Json | null;
                    timestamp?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    activity_type?: ActivityType;
                    metadata?: Json | null;
                    timestamp?: string;
                };
            };
            coding_problems: {
                Row: {
                    id: string;
                    title: string;
                    description: string;
                    difficulty: DifficultyLevel;
                    lesson_id: string | null;
                    mock_test_id: string | null;
                    starter_code: string | null;
                    solution_code: string | null;
                    time_limit_ms: number;
                    memory_limit_mb: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    description: string;
                    difficulty?: DifficultyLevel;
                    lesson_id?: string | null;
                    mock_test_id?: string | null;
                    starter_code?: string | null;
                    solution_code?: string | null;
                    time_limit_ms?: number;
                    memory_limit_mb?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    title?: string;
                    description?: string;
                    difficulty?: DifficultyLevel;
                    lesson_id?: string | null;
                    mock_test_id?: string | null;
                    starter_code?: string | null;
                    solution_code?: string | null;
                    time_limit_ms?: number;
                    memory_limit_mb?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            test_cases: {
                Row: {
                    id: string;
                    problem_id: string;
                    input: string;
                    expected_output: string;
                    is_hidden: boolean;
                    points: number;
                    order_index: number | null;
                };
                Insert: {
                    id?: string;
                    problem_id: string;
                    input: string;
                    expected_output: string;
                    is_hidden?: boolean;
                    points?: number;
                    order_index?: number | null;
                };
                Update: {
                    id?: string;
                    problem_id?: string;
                    input?: string;
                    expected_output?: string;
                    is_hidden?: boolean;
                    points?: number;
                    order_index?: number | null;
                };
            };
            code_submissions: {
                Row: {
                    id: string;
                    user_id: string;
                    problem_id: string;
                    code: string;
                    language: string;
                    status: SubmissionStatus;
                    execution_time_ms: number | null;
                    memory_used_kb: number | null;
                    score: number | null;
                    tests_passed: number;
                    total_tests: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    problem_id: string;
                    code: string;
                    language: string;
                    status?: SubmissionStatus;
                    execution_time_ms?: number | null;
                    memory_used_kb?: number | null;
                    score?: number | null;
                    tests_passed?: number;
                    total_tests?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    problem_id?: string;
                    code?: string;
                    language?: string;
                    status?: SubmissionStatus;
                    execution_time_ms?: number | null;
                    memory_used_kb?: number | null;
                    score?: number | null;
                    tests_passed?: number;
                    total_tests?: number;
                    created_at?: string;
                };
            };
            mock_tests: {
                Row: {
                    id: string;
                    title: string;
                    description: string | null;
                    course_id: string | null;
                    duration_minutes: number;
                    total_marks: number;
                    passing_marks: number;
                    is_published: boolean;
                    start_time: string | null;
                    end_time: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    description?: string | null;
                    course_id?: string | null;
                    duration_minutes: number;
                    total_marks: number;
                    passing_marks: number;
                    is_published?: boolean;
                    start_time?: string | null;
                    end_time?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    title?: string;
                    description?: string | null;
                    course_id?: string | null;
                    duration_minutes?: number;
                    total_marks?: number;
                    passing_marks?: number;
                    is_published?: boolean;
                    start_time?: string | null;
                    end_time?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            mock_test_attempts: {
                Row: {
                    id: string;
                    user_id: string;
                    mock_test_id: string;
                    score: number;
                    total_marks: number;
                    percentile: number | null;
                    time_taken_minutes: number | null;
                    answers: Json | null;
                    started_at: string;
                    submitted_at: string | null;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    mock_test_id: string;
                    score?: number;
                    total_marks: number;
                    percentile?: number | null;
                    time_taken_minutes?: number | null;
                    answers?: Json | null;
                    started_at?: string;
                    submitted_at?: string | null;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    mock_test_id?: string;
                    score?: number;
                    total_marks?: number;
                    percentile?: number | null;
                    time_taken_minutes?: number | null;
                    answers?: Json | null;
                    started_at?: string;
                    submitted_at?: string | null;
                };
            };
            lesson_progress: {
                Row: {
                    id: string;
                    enrollment_id: string;
                    lesson_id: string;
                    is_completed: boolean;
                    time_spent_seconds: number;
                    completed_at: string | null;
                };
                Insert: {
                    id?: string;
                    enrollment_id: string;
                    lesson_id: string;
                    is_completed?: boolean;
                    time_spent_seconds?: number;
                    completed_at?: string | null;
                };
                Update: {
                    id?: string;
                    enrollment_id?: string;
                    lesson_id?: string;
                    is_completed?: boolean;
                    time_spent_seconds?: number;
                    completed_at?: string | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            user_role: UserRole;
            course_level: CourseLevel;
            course_status: CourseStatus;
            lesson_type: LessonType;
            purchase_status: PurchaseStatus;
            difficulty_level: DifficultyLevel;
            activity_type: ActivityType;
            submission_status: SubmissionStatus;
        };
    };
}
