-- Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    grade TEXT NOT NULL,
    school_name TEXT NOT NULL,
    subjects TEXT[] NOT NULL,
    character_focus TEXT,
    total_monthly_fee NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to registrations
CREATE POLICY "Allow anonymous inserts to registrations"
ON public.registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- Allowed anonymous read and modify to registrations for simplicity (In a real app, use authentication!)
CREATE POLICY "Allow anonymous read to registrations"
ON public.registrations
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous update to registrations"
ON public.registrations
FOR UPDATE
TO anon
USING (true);

CREATE POLICY "Allow anonymous delete to registrations"
ON public.registrations
FOR DELETE
TO anon
USING (true);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to bookings
CREATE POLICY "Allow anonymous inserts to bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous read to bookings"
ON public.bookings
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous update to bookings"
ON public.bookings
FOR UPDATE
TO anon
USING (true);

CREATE POLICY "Allow anonymous delete to bookings"
ON public.bookings
FOR DELETE
TO anon
USING (true);
