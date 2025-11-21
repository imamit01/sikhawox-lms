import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
    try {
        const supabase = await createServerClient();

        // Test database connection
        const { error } = await supabase.from('profiles').select('count').limit(1);

        if (error) {
            return NextResponse.json({
                status: 'unhealthy',
                error: 'Database connection failed',
                timestamp: new Date().toISOString(),
            }, { status: 503 });
        }

        return NextResponse.json({
            status: 'healthy',
            database: 'connected',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json({
            status: 'unhealthy',
            error: 'Service error',
            timestamp: new Date().toISOString(),
        }, { status: 503 });
    }
}
