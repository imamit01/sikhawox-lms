import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string; lessonId: string } }
) {
    try {
        const { completed, timeSpent } = await request.json();

        const supabase = await createServerClient();

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify enrollment
        const { data: enrollment } = await supabase
            .from('enrollments')
            .select('id')
            .eq('student_id', user.id)
            .eq('course_id', params.id)
            .eq('status', 'ACTIVE')
            .single();

        if (!enrollment) {
            return NextResponse.json(
                { error: 'Not enrolled in this course' },
                { status: 403 }
            );
        }

        // Update or create lesson progress
        const { data: existingProgress } = await supabase
            .from('lesson_progress')
            .select('id, time_spent_seconds, completed')
            .eq('user_id', user.id)
            .eq('lesson_id', params.lessonId)
            .single();

        let progress;

        if (existingProgress) {
            // Update existing progress
            const { data, error } = await supabase
                .from('lesson_progress')
                .update({
                    completed: completed ?? existingProgress.completed,
                    time_spent_seconds: (existingProgress.time_spent_seconds || 0) + (timeSpent || 0),
                    completed_at: completed ? new Date().toISOString() : null,
                })
                .eq('id', existingProgress.id)
                .select()
                .single();

            if (error) {
                return NextResponse.json(
                    { error: 'Failed to update progress' },
                    { status: 500 }
                );
            }

            progress = data;
        } else {
            // Create new progress
            const { data, error } = await supabase
                .from('lesson_progress')
                .insert({
                    user_id: user.id,
                    lesson_id: params.lessonId,
                    completed: completed || false,
                    time_spent_seconds: timeSpent || 0,
                    completed_at: completed ? new Date().toISOString() : null,
                })
                .select()
                .single();

            if (error) {
                return NextResponse.json(
                    { error: 'Failed to create progress' },
                    { status: 500 }
                );
            }

            progress = data;
        }

        // Log activity
        await supabase.from('activity_logs').insert({
            user_id: user.id,
            action: completed ? 'LESSON_COMPLETED' : 'LESSON_PROGRESS',
            details: {
                courseId: params.id,
                lessonId: params.lessonId,
                timeSpent,
            },
        });

        return NextResponse.json({
            success: true,
            progress,
        });
    } catch (error) {
        console.error('Lesson progress update error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string; lessonId: string } }
) {
    try {
        const supabase = await createServerClient();

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch lesson progress
        const { data: progress, error: progressError } = await supabase
            .from('lesson_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('lesson_id', params.lessonId)
            .single();

        if (progressError && progressError.code !== 'PGRST116') {
            return NextResponse.json(
                { error: 'Failed to fetch progress' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            progress: progress || {
                completed: false,
                time_spent_seconds: 0,
            },
        });
    } catch (error) {
        console.error('Lesson progress fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
