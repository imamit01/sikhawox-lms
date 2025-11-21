import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const { problemId, code, language } = await request.json();

        if (!problemId || !code || !language) {
            return NextResponse.json(
                { error: 'Problem ID, code, and language are required' },
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

        // Fetch problem details with test cases
        const { data: problem, error: problemError } = await supabase
            .from('coding_problems')
            .select('id, title, test_cases')
            .eq('id', problemId)
            .single();

        if (problemError || !problem) {
            return NextResponse.json(
                { error: 'Problem not found' },
                { status: 404 }
            );
        }

        // TODO: Integrate with Judge0 API
        // For now, return mock results
        const mockResults = {
            status: 'Accepted',
            testResults: problem.test_cases?.map((tc: any, idx: number) => ({
                testCase: idx + 1,
                passed: Math.random() > 0.3, // 70% pass rate for demo
                executionTime: Math.floor(Math.random() * 100) + 10,
                memoryUsed: Math.floor(Math.random() * 1000) + 500,
            })) || [],
        };

        const testsPassed = mockResults.testResults.filter((r: any) => r.passed).length;
        const totalTests = mockResults.testResults.length;
        const score = Math.round((testsPassed / totalTests) * 100);

        // Save submission
        const { data: submission, error: submissionError } = await supabase
            .from('code_submissions')
            .insert({
                user_id: user.id,
                problem_id: problemId,
                code,
                language,
                status: mockResults.status,
                score,
                tests_passed: testsPassed,
                total_tests: totalTests,
                execution_time_ms: mockResults.testResults[0]?.executionTime || 0,
                memory_used_kb: mockResults.testResults[0]?.memoryUsed || 0,
            })
            .select()
            .single();

        if (submissionError) {
            console.error('Submission save error:', submissionError);
        }

        return NextResponse.json({
            success: true,
            status: mockResults.status,
            testResults: mockResults.testResults,
            score,
            testsPassed,
            totalTests,
            submissionId: submission?.id,
        });
    } catch (error) {
        console.error('Code submission error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

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

        const { searchParams } = new URL(request.url);
        const problemId = searchParams.get('problemId');

        let query = supabase
            .from('code_submissions')
            .select(`
                id,
                problem_id,
                code,
                language,
                status,
                score,
                tests_passed,
                total_tests,
                created_at,
                coding_problems (
                    title
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(20);

        if (problemId) {
            query = query.eq('problem_id', problemId);
        }

        const { data: submissions, error: submissionsError } = await query;

        if (submissionsError) {
            return NextResponse.json(
                { error: 'Failed to fetch submissions' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            submissions,
        });
    } catch (error) {
        console.error('Submissions fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
