import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const supabase = await createServerClient();

        // Sign in with Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            return NextResponse.json(
                { error: authError.message },
                { status: 401 }
            );
        }

        // Fetch user profile with role (use admin client to bypass RLS)
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('id, email, name, role, avatar_url')
            .eq('id', authData.user.id)
            .single<{ id: string; email: string; name: string; role: string; avatar_url: string | null }>();

        if (profileError) {
            console.error('Profile fetch error:', profileError);
            return NextResponse.json(
                { error: 'Failed to fetch user profile' },
                { status: 500 }
            );
        }

        // Determine redirect URL based on role
        let redirectUrl = '/dashboard';
        if (profile.role === 'SUPER_ADMIN') {
            redirectUrl = '/admin/dashboard';
        } else if (profile.role === 'MODERATOR') {
            redirectUrl = '/admin/moderator';
        } else if (profile.role === 'INSTRUCTOR') {
            redirectUrl = '/instructor/dashboard';
        }

        // TODO: Re-add after Supabase type generation
        // Update last login and log activity
        // Currently commented out due to TypeScript inference issues

        return NextResponse.json({
            success: true,
            user: {
                id: profile.id,
                email: profile.email,
                name: profile.name,
                role: profile.role,
                avatar_url: profile.avatar_url,
            },
            redirectUrl,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
