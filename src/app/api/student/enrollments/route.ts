import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
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

        // Fetch enrollments with course details
        const { data: enrollments, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select(`
                id,
                course_id,
                enrolled_at,
                courses (
                    id,
                    title,
                    description,
                    thumbnail,
                    instructor_id,
                    profiles:instructor_id (
                        name
                    )
                )
            `)
            .eq('student_id', user.id)
            .eq('status', 'ACTIVE');

        if (enrollmentsError) {
            return NextResponse.json(
                { error: 'Failed to fetch enrollments' },
                { status: 500 }
            );
        }

        // Calculate progress for each enrollment
        const enrollmentsWithProgress = await Promise.all(
            (enrollments || []).map(async (enrollment: any) => {
                // Get total lessons
                const { count: totalLessons } = await supabase
                    .from('lessons')
                    .select('*', { count: 'exact', head: true })
                    .eq('course_id', enrollment.course_id);

                // Get completed lessons
                const { count: completedLessons } = await supabase
                    .from('lesson_progress')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', user.id)
                    .eq('completed', true)
                    .in('lesson_id',
                        supabase
                            .from('lessons')
                            .select('id')
                            .eq('course_id', enrollment.course_id)
                    );

                const progress = totalLessons ? Math.round((completedLessons || 0) / totalLessons * 100) : 0;

                return {
                    ...enrollment,
                    progress,
                    totalLessons: totalLessons || 0,
                    completedLessons: completedLessons || 0,
                };
            })
        );

        return NextResponse.json({
            success: true,
            enrollments: enrollmentsWithProgress,
        });
    } catch (error) {
        console.error('Enrollments fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { courseId } = await request.json();

        if (!courseId) {
            return NextResponse.json(
                { error: 'Course ID is required' },
                { status: 400 }
            );
        }

        const supabase = await createServerClient();

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if already enrolled
        const { data: existing } = await supabase
            .from('enrollments')
            .select('id')
            .eq('student_id', user.id)
            .eq('course_id', courseId)
            .single();

        if (existing) {
            return NextResponse.json(
                { error: 'Already enrolled in this course' },
                { status: 400 }
            );
        }

        // Create enrollment (requires purchase approval in real scenario)
        const { data: enrollment, error: enrollmentError } = await supabase
            .from('enrollments')
            .insert({
                student_id: user.id,
                course_id: courseId,
                status: 'PENDING', // Will be ACTIVE after purchase approval
            })
            .select()
            .single();

        if (enrollmentError) {
            return NextResponse.json(
                { error: 'Failed to create enrollment' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            enrollment,
        });
    } catch (error) {
        console.error('Enrollment creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
