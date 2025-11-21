import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { answers } = await request.json();

        if (!answers || typeof answers !== 'object') {
            return NextResponse.json(
                { error: 'Answers are required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch mock test with questions
        const { data: mockTest, error: mockTestError } = await supabase
            .from('mock_tests')
            .select('id, title, questions, duration, total_marks')
            .eq('id', params.id)
            .single();

        if (mockTestError || !mockTest) {
            return NextResponse.json(
                { error: 'Mock test not found' },
                { status: 404 }
            );
        }

        // Calculate score (simplified - in production, evaluate each answer)
        const questions = mockTest.questions as any[];
        let correctAnswers = 0;
        const results: any[] = [];

        questions.forEach((question, idx) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            if (isCorrect) correctAnswers++;

            results.push({
                questionId: question.id,
                userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect,
            });
        });

        const score = Math.round((correctAnswers / questions.length) * 100);

        // Calculate percentile (mock - in production, compare with other attempts)
        const percentile = Math.min(95, score + Math.floor(Math.random() * 10));

        // Save attempt
        const { data: attempt, error: attemptError } = await supabase
            .from('mock_test_attempts')
            .insert({
                user_id: user.id,
                mock_test_id: params.id,
                score,
                total_marks: mockTest.total_marks,
                percentile,
                answers,
                submitted_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (attemptError) {
            return NextResponse.json(
                { error: 'Failed to save attempt' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            attemptId: attempt.id,
            score,
            percentile,
            correctAnswers,
            totalQuestions: questions.length,
            results,
        });
    } catch (error) {
        console.error('Mock test submission error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = await createClient();

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch user's attempts for this mock test
        const { data: attempts, error: attemptsError } = await supabase
            .from('mock_test_attempts')
            .select('*')
            .eq('user_id', user.id)
            .eq('mock_test_id', params.id)
            .order('submitted_at', { ascending: false });

        if (attemptsError) {
            return NextResponse.json(
                { error: 'Failed to fetch attempts' },
                { status: 500 }
            );
        }

        // Fetch mock test details
        const { data: mockTest, error: mockTestError } = await supabase
            .from('mock_tests')
            .select('id, title, questions, duration')
            .eq('id', params.id)
            .single();

        if (mockTestError) {
            return NextResponse.json(
                { error: 'Mock test not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            mockTest,
            attempts,
        });
    } catch (error) {
        console.error('Mock test fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
