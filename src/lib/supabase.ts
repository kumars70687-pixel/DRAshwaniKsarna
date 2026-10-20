import { createClient } from "@supabase/supabase-js";

// Supabase credentials provided by user
export const SUPABASE_PROJECT_ID = "gpnrimajxodanlrbikth";
export const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "sb_publishable_EJ12jBjqXw_o5t3B7V-uCw_0ks9yKBI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export interface AppointmentRecord {
  id?: string;
  patient_name: string;
  parent_name?: string;
  phone: string;
  preferred_date: string;
  time_slot: string;
  consultation_type: string;
  message?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  created_at?: string;
  source?: string;
}

export const SUPABASE_SQL_SETUP = `-- Copy and run this in your Supabase Dashboard -> SQL Editor:
-- Project: ${SUPABASE_PROJECT_ID}

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

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow website visitors to insert new appointment requests
CREATE POLICY "Allow public insert appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading appointments for clinic reception desk
CREATE POLICY "Allow public select appointments"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updating status (confirmed / cancelled)
CREATE POLICY "Allow public update appointments"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (true);
`;

/**
 * Save an appointment record to Supabase
 */
export async function saveAppointmentToSupabase(
  appointment: Omit<AppointmentRecord, "id" | "created_at" | "status">
): Promise<{
  success: boolean;
  data?: AppointmentRecord;
  error?: any;
  tableMissing?: boolean;
}> {
  try {
    const payload = {
      patient_name: appointment.patient_name,
      parent_name: appointment.parent_name || null,
      phone: appointment.phone,
      preferred_date: appointment.preferred_date,
      time_slot: appointment.time_slot,
      consultation_type: appointment.consultation_type,
      message: appointment.message || null,
      status: "pending"
    };

    const { data, error } = await supabase
      .from("appointments")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn("Supabase insert response error:", error);
      const isTableMissing =
        error.code === "PGRST205" ||
        error.message?.includes("schema cache") ||
        error.message?.includes("does not exist") ||
        error.message?.includes("table 'public.appointments'");

      return {
        success: false,
        error: error.message,
        tableMissing: isTableMissing
      };
    }

    return {
      success: true,
      data
    };
  } catch (err: any) {
    console.error("Failed to connect or save to Supabase:", err);
    return {
      success: false,
      error: err.message || "Network or connection error"
    };
  }
}

/**
 * Fetch appointments from Supabase (for clinic reception view)
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  data: AppointmentRecord[];
  error?: string;
  tableMissing?: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      const isTableMissing =
        error.code === "PGRST205" ||
        error.message?.includes("schema cache") ||
        error.message?.includes("does not exist");
      return { data: [], error: error.message, tableMissing: isTableMissing };
    }

    return { data: data || [] };
  } catch (err: any) {
    return { data: [], error: err.message || "Failed to load" };
  }
}

/**
 * Update appointment status in Supabase
 */
export async function updateAppointmentStatusInSupabase(
  id: string,
  newStatus: "pending" | "confirmed" | "completed" | "cancelled"
) {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Test connectivity to Supabase
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  message: string;
}> {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("id")
      .limit(1);

    if (error) {
      if (
        error.code === "PGRST205" ||
        error.message?.includes("schema cache") ||
        error.message?.includes("table 'public.appointments'")
      ) {
        return {
          connected: true,
          tableExists: false,
          message: "Connected to Supabase project, but 'appointments' table needs to be created."
        };
      }
      return {
        connected: false,
        tableExists: false,
        message: error.message
      };
    }

    return {
      connected: true,
      tableExists: true,
      message: "Connected to Supabase and 'appointments' table is ready!"
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      message: err.message || "Connection failed"
    };
  }
}
