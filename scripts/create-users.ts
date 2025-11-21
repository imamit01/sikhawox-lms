import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manually read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
let envContent = '';

try {
    envContent = fs.readFileSync(envPath, 'utf-8');
} catch (error) {
    console.error('Could not read .env.local file');
    process.exit(1);
}

// Parse env file
const envVars: Record<string, string> = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
        envVars[key] = value;
    }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase environment variables in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createUser(email: string, role: 'SUPER_ADMIN' | 'MODERATOR' | 'INSTRUCTOR' | 'STUDENT', name: string) {
    console.log(`Creating ${role} user: ${email}...`);

    // Use environment variable for password (secure deployment)
    const password = process.env.SEED_PASSWORD || 'password123';

    if (!process.env.SEED_PASSWORD) {
        console.warn('⚠️  WARNING: Using default password. Set SEED_PASSWORD environment variable for production!');
    }

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
    });

    if (authError) {
        console.log(`User ${email} might already exist or error: ${authError.message}`);
        // If user exists, we try to get their ID to update profile
        if (authError.message.includes('already registered')) {
            // We can't easily get the ID if we don't have it, but we can try to sign in or list users
            // For this script, let's just try to find the user by email if possible or skip
            // Admin list users is possible
            const { data: users } = await supabase.auth.admin.listUsers();
            const existingUser = users.users.find(u => u.email === email);
            if (existingUser) {
                await updateProfile(existingUser.id, email, role, name);
            }
            return;
        }
        return;
    }

    const userId = authData.user.id;
    console.log(`Auth user created with ID: ${userId}`);
    await updateProfile(userId, email, role, name);
}

async function updateProfile(userId: string, email: string, role: string, name: string) {
    // 2. Create/Update profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (profile) {
        // Update role
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ role, name })
            .eq('id', userId);

        if (updateError) {
            console.error(`Error updating profile for ${email}:`, updateError.message);
        } else {
            console.log(`Profile updated for ${email}`);
        }
    } else {
        // Insert profile
        const { error: insertError } = await supabase
            .from('profiles')
            .insert({
                id: userId,
                email,
                name,
                role,
                avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            });

        if (insertError) {
            console.error(`Error inserting profile for ${email}:`, insertError.message);
        } else {
            console.log(`Profile created for ${email}`);
        }
    }
}

async function main() {
    await createUser('admin@sikhawox.com', 'SUPER_ADMIN', 'Admin User');
    await createUser('moderator@sikhawox.com', 'MODERATOR', 'Moderator User');
    await createUser('instructor@sikhawox.com', 'INSTRUCTOR', 'Instructor User');
    await createUser('student@sikhawox.com', 'STUDENT', 'Student User');
}

main();
