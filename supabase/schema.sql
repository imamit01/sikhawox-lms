-- ============================================
-- SIKHAWOX - Supabase SQL Schema
-- High-Performance EdTech Platform
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (Extends Supabase Auth)
-- ============================================

CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'MODERATOR', 'INSTRUCTOR', 'STUDENT');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  role user_role DEFAULT 'STUDENT',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'MODERATOR')
    )
  );

-- ============================================
-- COURSES STRUCTURE
-- ============================================

CREATE TYPE course_level AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');
CREATE TYPE course_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  level course_level DEFAULT 'BEGINNER',
  status course_status DEFAULT 'DRAFT',
  duration_hours INT,
  language TEXT DEFAULT 'English',
  tags TEXT[],
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, order_index)
);

CREATE TYPE lesson_type AS ENUM ('VIDEO', 'TEXT', 'CODING_CHALLENGE', 'MIXED');

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type lesson_type NOT NULL,
  order_index INT NOT NULL,
  
  -- Content Fields
  video_url TEXT, -- For non-Mux videos
  mux_playback_id TEXT, -- Mux video playback ID
  markdown_content TEXT,
  duration_minutes INT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(module_id, order_index)
);

-- RLS for Courses (Public read, admin write)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (status = 'PUBLISHED');

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'INSTRUCTOR', 'MODERATOR')
    )
  );

-- ============================================
-- PURCHASE REQUEST SYSTEM (CRITICAL)
-- ============================================

CREATE TYPE purchase_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE purchase_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  status purchase_status DEFAULT 'PENDING',
  
  -- Payment Details
  transaction_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_proof_url TEXT,
  
  -- Admin Actions
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, course_id)
);

-- RLS for Purchase Requests
ALTER TABLE purchase_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own requests"
  ON purchase_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create purchase requests"
  ON purchase_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all requests"
  ON purchase_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'MODERATOR')
    )
  );

CREATE POLICY "Admins can update requests"
  ON purchase_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'MODERATOR')
    )
  );

-- ============================================
-- ENROLLMENTS (Created on Approval)
-- ============================================

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Progress Tracking
  completed_lessons INT DEFAULT 0,
  total_lessons INT DEFAULT 0,
  progress_percent DECIMAL(5, 2) DEFAULT 0,
  
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, course_id)
);

CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  time_spent_seconds INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  
  UNIQUE(enrollment_id, lesson_id)
);

-- RLS for Enrollments
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create enrollments"
  ON enrollments FOR INSERT
  WITH CHECK (TRUE); -- Controlled by API

-- ============================================
-- LOGIN TRACKING (For Student Spy)
-- ============================================

CREATE TABLE login_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  login_timestamp TIMESTAMPTZ DEFAULT NOW(),
  logout_timestamp TIMESTAMPTZ,
  duration_seconds INT
);

CREATE INDEX idx_login_logs_user_id ON login_logs(user_id);
CREATE INDEX idx_login_logs_timestamp ON login_logs(login_timestamp);

-- RLS for Login Logs
ALTER TABLE login_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all login logs"
  ON login_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'MODERATOR')
    )
  );

-- ============================================
-- ACTIVITY LOGS (For Analytics)
-- ============================================

CREATE TYPE activity_type AS ENUM (
  'LOGIN', 'LOGOUT', 'LESSON_COMPLETE', 'CODE_SUBMIT',
  'MOCK_TEST_START', 'MOCK_TEST_COMPLETE'
);

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp);

-- ============================================
-- CODING PROBLEMS & TEST CASES
-- ============================================

CREATE TYPE difficulty_level AS ENUM ('EASY', 'MEDIUM', 'HARD');

CREATE TABLE coding_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty difficulty_level DEFAULT 'MEDIUM',
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  mock_test_id UUID,
  
  -- Code Templates
  starter_code TEXT,
  solution_code TEXT, -- Hidden from students
  
  -- Constraints
  time_limit_ms INT DEFAULT 2000,
  memory_limit_mb INT DEFAULT 256,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  problem_id UUID REFERENCES coding_problems(id) ON DELETE CASCADE,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  is_hidden BOOLEAN DEFAULT FALSE, -- Hidden from students
  points INT DEFAULT 10,
  order_index INT
);

-- RLS for Test Cases (Hide hidden ones from students)
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view non-hidden test cases"
  ON test_cases FOR SELECT
  USING (
    is_hidden = FALSE OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'INSTRUCTOR', 'MODERATOR')
    )
  );

-- ============================================
-- CODE SUBMISSIONS (Judge0 Results)
-- ============================================

CREATE TYPE submission_status AS ENUM (
  'PENDING', 'RUNNING', 'ACCEPTED', 'WRONG_ANSWER',
  'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED',
  'RUNTIME_ERROR', 'COMPILATION_ERROR'
);

CREATE TABLE code_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES coding_problems(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL, -- cpp, java, python
  status submission_status DEFAULT 'PENDING',
  
  -- Results
  execution_time_ms INT,
  memory_used_kb INT,
  score INT,
  tests_passed INT DEFAULT 0,
  total_tests INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_user_id ON code_submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON code_submissions(problem_id);

-- ============================================
-- MOCK TESTS
-- ============================================

CREATE TABLE mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  
  -- Configuration
  duration_minutes INT NOT NULL,
  total_marks INT NOT NULL,
  passing_marks INT NOT NULL,
  
  -- Scheduling
  is_published BOOLEAN DEFAULT FALSE,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link coding problems to mock tests
ALTER TABLE coding_problems
  ADD CONSTRAINT fk_mock_test
  FOREIGN KEY (mock_test_id)
  REFERENCES mock_tests(id)
  ON DELETE CASCADE;

CREATE TABLE mock_test_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  
  -- Results
  score INT DEFAULT 0,
  total_marks INT NOT NULL,
  percentile DECIMAL(5, 2),
  time_taken_minutes INT,
  
  -- Answers (JSON array of submission IDs)
  answers JSONB,
  
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

CREATE INDEX idx_attempts_user_id ON mock_test_attempts(user_id);
CREATE INDEX idx_attempts_test_id ON mock_test_attempts(mock_test_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchase_requests_updated_at
  BEFORE UPDATE ON purchase_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'SIKHAWOX Student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
  'LOGIN', 'LOGOUT', 'LESSON_COMPLETE', 'CODE_SUBMIT',
  'MOCK_TEST_START', 'MOCK_TEST_COMPLETE'
);

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp);

-- ============================================
-- CODING PROBLEMS & TEST CASES
-- ============================================

CREATE TYPE difficulty_level AS ENUM ('EASY', 'MEDIUM', 'HARD');

CREATE TABLE coding_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty difficulty_level DEFAULT 'MEDIUM',
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  mock_test_id UUID,
  
  -- Code Templates
  starter_code TEXT,
  solution_code TEXT, -- Hidden from students
  
  -- Constraints
  time_limit_ms INT DEFAULT 2000,
  memory_limit_mb INT DEFAULT 256,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  problem_id UUID REFERENCES coding_problems(id) ON DELETE CASCADE,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  is_hidden BOOLEAN DEFAULT FALSE, -- Hidden from students
  points INT DEFAULT 10,
  order_index INT
);

-- RLS for Test Cases (Hide hidden ones from students)
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view non-hidden test cases"
  ON test_cases FOR SELECT
  USING (
    is_hidden = FALSE OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'INSTRUCTOR', 'MODERATOR')
    )
  );

-- ============================================
-- CODE SUBMISSIONS (Judge0 Results)
-- ============================================

CREATE TYPE submission_status AS ENUM (
  'PENDING', 'RUNNING', 'ACCEPTED', 'WRONG_ANSWER',
  'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED',
  'RUNTIME_ERROR', 'COMPILATION_ERROR'
);

CREATE TABLE code_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES coding_problems(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL, -- cpp, java, python
  status submission_status DEFAULT 'PENDING',
  
  -- Results
  execution_time_ms INT,
  memory_used_kb INT,
  score INT,
  tests_passed INT DEFAULT 0,
  total_tests INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_user_id ON code_submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON code_submissions(problem_id);

-- ============================================
-- MOCK TESTS
-- ============================================

CREATE TABLE mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  
  -- Configuration
  duration_minutes INT NOT NULL,
  total_marks INT NOT NULL,
  passing_marks INT NOT NULL,
  
  -- Scheduling
  is_published BOOLEAN DEFAULT FALSE,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link coding problems to mock tests
ALTER TABLE coding_problems
  ADD CONSTRAINT fk_mock_test
  FOREIGN KEY (mock_test_id)
  REFERENCES mock_tests(id)
  ON DELETE CASCADE;

CREATE TABLE mock_test_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  
  -- Results
  score INT DEFAULT 0,
  total_marks INT NOT NULL,
  percentile DECIMAL(5, 2),
  time_taken_minutes INT,
  
  -- Answers (JSON array of submission IDs)
  answers JSONB,
  
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

CREATE INDEX idx_attempts_user_id ON mock_test_attempts(user_id);
CREATE INDEX idx_attempts_test_id ON mock_test_attempts(mock_test_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchase_requests_updated_at
  BEFORE UPDATE ON purchase_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'SIKHAWOX Student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED DATA (Optional)
-- ============================================

-- Create a Super Admin (Update with your email)
-- INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
-- VALUES ('admin@sikhawox.com', crypt('admin123', gen_salt('bf')), NOW());
-- UPDATE profiles SET role = 'SUPER_ADMIN' WHERE email = 'admin@sikhawox.com';
