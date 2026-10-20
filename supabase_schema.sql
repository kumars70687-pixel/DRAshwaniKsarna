-- =========================================================================
-- DR. ASHWANI K SARNA CLINIC & DIAGNOSTIC CENTRE
-- SUPABASE DATABASE SETUP SCRIPT
-- Project ID: gpnrimajxodanlrbikth
-- URL: https://gpnrimajxodanlrbikth.supabase.co
-- =========================================================================

-- 1. Create the appointments table to store all booking details
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  parent_name TEXT,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  consultation_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) for data protection
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow visitors to submit (insert) appointment requests
DROP POLICY IF EXISTS "Allow public insert appointments" ON public.appointments;
CREATE POLICY "Allow public insert appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Allow reading appointments (for clinic admin/staff dashboard)
DROP POLICY IF EXISTS "Allow public select appointments" ON public.appointments;
CREATE POLICY "Allow public select appointments"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Policy: Allow updating appointment status (confirmed, completed, etc.)
DROP POLICY IF EXISTS "Allow public update appointments" ON public.appointments;
CREATE POLICY "Allow public update appointments"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (true);

-- 6. Add index for faster date queries
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments (preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON public.appointments (created_at DESC);
