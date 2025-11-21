# VELLARI Database Schema Setup Guide

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and API keys

## Setup Instructions

### Step 1: Run the SQL Schema

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire contents of `supabase/schema.sql`
5. Paste into the SQL editor
6. Click **Run** to execute

This will create:
- All tables (profiles, courses, modules, lessons, purchase_requests, enrollments, etc.)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for auto-updating timestamps
- Function to auto-create profile on user signup

### Step 2: Verify Tables

After running the schema, verify in the **Table Editor**:

✅ profiles
✅ courses
✅ modules
✅ lessons
✅ purchase_requests (CRITICAL for approval workflow)
✅ enrollments
✅ login_logs (for Student Spy feature)
✅ activity_logs
✅ coding_problems
✅ test_cases
✅ code_submissions
✅ mock_tests
✅ mock_test_attempts
✅ lesson_progress

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

**Where to find these:**
- Go to **Project Settings** → **API**
- `NEXT_PUBLIC_SUPABASE_URL`: Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `anon` `public` key
- `SUPABASE_SERVICE_ROLE_KEY`: `service_role` `secret` key (⚠️ Keep this secret!)

### Step 4: Test the Connection

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features of the Schema

### 1. Purchase Approval Workflow

```sql
purchase_requests (status: PENDING/APPROVED/REJECTED)
  ↓ (Admin approves)
enrollments (auto-created)
  ↓ (Triggers Resend email)
Student gets access to course
```

### 2. Row Level Security (RLS)

- **Students** can only view their own data
- **Admins** can view all data
- **Hidden test cases** are not visible to students
- **Service role key** bypasses RLS for admin operations

### 3. Login Tracking

Every login is logged in `login_logs` with:
- IP address
- User agent
- Login/logout timestamps
- Session duration

### 4. Mux Video Integration

The `lessons` table has a `mux_playback_id` field:
- Admins upload videos to Mux
- Mux returns a playback ID
- Store playback ID in database
- Students use playback ID to stream video

### 5. Judge0 Code Execution

The `code_submissions` table stores:
- Student's code
- Language (cpp, java, python)
- Execution results from Judge0
- Score based on test cases passed

## Creating Your First Admin User

After running the schema, create an admin user:

1. Sign up normally through the app (will create a STUDENT by default)
2. Go to Supabase **Table Editor** → **profiles**
3. Find your user row
4. Edit the `role` column to `SUPER_ADMIN`
5. Save

Now you have admin access!

## Troubleshooting

### "relation does not exist" error
- Make sure you ran the entire schema.sql file
- Check for any SQL errors in the output

### RLS policies blocking access
- Use the service role key for admin operations
- Check that policies are created correctly

### Triggers not working
- Verify the `handle_new_user()` function exists
- Check that the trigger is attached to `auth.users`

## Next Steps

Once the database is set up:
1. ✅ Database schema created
2. ⏭️ Build authentication pages
3. ⏭️ Implement purchase approval workflow
4. ⏭️ Create admin dashboard
5. ⏭️ Build student interface
