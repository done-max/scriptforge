-- ==============================================================================
-- SCRIPTFORGE ODYSSEY — COMPLETE SUPABASE POSTGRESQL SCHEMA
-- Paste this entire SQL script into your Supabase Dashboard -> SQL Editor and click "Run".
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create User Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'Screenwriter',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Screenplays Table
CREATE TABLE IF NOT EXISTS public.screenplays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT DEFAULT 'Drama',
  page_count INT DEFAULT 1,
  story_intelligence_score INT DEFAULT 85,
  logline TEXT,
  full_raw_text TEXT NOT NULL,
  category_scores JSONB DEFAULT '{}'::jsonb,
  scenes JSONB DEFAULT '[]'::jsonb,
  characters JSONB DEFAULT '[]'::jsonb,
  story_beats JSONB DEFAULT '[]'::jsonb,
  theme_motifs JSONB DEFAULT '[]'::jsonb,
  continuity_issues JSONB DEFAULT '[]'::jsonb,
  coverage JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Dispatched Emails Table
CREATE TABLE IF NOT EXISTS public.dispatched_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  category TEXT DEFAULT 'welcome_login',
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) for Total Privacy & Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screenplays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatched_emails ENABLE ROW LEVEL SECURITY;

-- 6. Profiles Security Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 7. Screenplays Security Policies (Only the owner can view, edit, or delete their scripts)
DROP POLICY IF EXISTS "Users can view their own screenplays" ON public.screenplays;
CREATE POLICY "Users can view their own screenplays" ON public.screenplays FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own screenplays" ON public.screenplays;
CREATE POLICY "Users can insert their own screenplays" ON public.screenplays FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own screenplays" ON public.screenplays;
CREATE POLICY "Users can update their own screenplays" ON public.screenplays FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own screenplays" ON public.screenplays;
CREATE POLICY "Users can delete their own screenplays" ON public.screenplays FOR DELETE USING (auth.uid() = user_id);

-- 8. Dispatched Emails Security Policies
DROP POLICY IF EXISTS "Users can view their own emails" ON public.dispatched_emails;
CREATE POLICY "Users can view their own emails" ON public.dispatched_emails FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert emails" ON public.dispatched_emails;
CREATE POLICY "System can insert emails" ON public.dispatched_emails FOR INSERT WITH CHECK (true);

-- 9. Automatic Profile Creation Trigger on Supabase User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    'Screenwriter'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Indexes for Lightning Fast Queries
CREATE INDEX IF NOT EXISTS idx_screenplays_user_id ON public.screenplays(user_id);
CREATE INDEX IF NOT EXISTS idx_screenplays_created_at ON public.screenplays(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emails_user_id ON public.dispatched_emails(user_id);
