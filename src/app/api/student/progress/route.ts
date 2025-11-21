import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    try {
        const supabase = supabaseAdmin;

        // Get current user from auth header (in production, extract from JWT)
        // For now, we'll use a mock user ID - this should be replaced with proper auth
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // TODO: Extract user ID from JWT token
        const userId = 'mock-user-id'; // Replace with actual user ID from token

        // Fetch course progress
        const { data: enrollments, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select(`
                id,
                course_id,
                enrolled_at,
                courses (
                    id,
                    title,
                    thumbnail
                )
            `)
            .eq('student_id', userId)
            .eq('status', 'ACTIVE');

        if (enrollmentsError) {
            return NextResponse.json(
                { error: 'Failed to fetch progress' },
                { status: 500 }
            );
        }

        // Calculate progress for each course
        const courseProgress = await Promise.all(
            (enrollments || []).map(async (enrollment: any) => {
                const { count: totalLessons } = await supabase
                    .from('lessons')
                    .select('*', { count: 'exact', head: true })
                    .eq('course_id', enrollment.course_id);

                const { count: completedLessons } = await supabase
                    .from('lesson_progress')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', userId)
                    .eq('completed', true);

                return {
                    courseId: enrollment.course_id,
                    courseTitle: enrollment.courses?.title,
                    thumbnail: enrollment.courses?.thumbnail,
                    totalLessons: totalLessons || 0,
                    completedLessons: completedLessons || 0,
                    progress: totalLessons ? Math.round((completedLessons || 0) / totalLessons * 100) : 0,
                };
            })
        );

        // Fetch mock test progress
        const { data: mockTestAttempts, error: mockTestError } = await supabase
            .from('mock_test_attempts')
            .select('id, mock_test_id, score, percentile, submitted_at')
            .eq('user_id', userId)
            .order('submitted_at', { ascending: false });

        if (mockTestError) {
            console.error('Mock test fetch error:', mockTestError);
        }

        // Calculate overall progress
        const totalCourses = courseProgress.length;
        const completedCourses = courseProgress.filter((c: any) => c.progress === 100).length;
        const overallProgress = totalCourses > 0
            ? Math.round(courseProgress.reduce((acc: number, c: any) => acc + c.progress, 0) / totalCourses)
            : 0;

        // Calculate learning streak (mock implementation)
        const streak = 7; // TODO: Calculate actual streak from activity logs

        return NextResponse.json({
            success: true,
            data: {
                courses: courseProgress,
                mockTests: mockTestAttempts || [],
                overallProgress,
                streak,
                totalCourses,
                completedCourses,
            },
        });
    } catch (error) {
        console.error('Progress fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
