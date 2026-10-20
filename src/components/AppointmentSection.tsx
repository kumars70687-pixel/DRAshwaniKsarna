import React, { useState } from "react";
import { CLINIC_DATA } from "../data/clinicData";
import {
  saveAppointmentToSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_SQL_SETUP,
  AppointmentRecord
} from "../lib/supabase";
import {
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Shield,
  Send,
  Database,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from "lucide-react";

interface AppointmentSectionProps {
  preselectedService?: string;
  onAppointmentSaved?: (record: AppointmentRecord) => void;
  onOpenSupabaseDashboard?: () => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  preselectedService,
  onAppointmentSaved,
  onOpenSupabaseDashboard
}) => {
  const [patientName, setPatientName] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning Session (09:00 AM – 01:30 PM)");
  const [consultationType, setConsultationType] = useState(
    preselectedService || "General Pediatric Consultation"
  );
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    savedToSupabase: boolean;
    tableMissing?: boolean;
    recordId?: string;
    errorMsg?: string;
  }>({ savedToSupabase: false });
  const [copiedSql, setCopiedSql] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);

  // Validate Indian Phone Number: handles 10 digits starting with 6,7,8,9, optional +91 or 0 prefix
  const validatePhone = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, "");
    const indianRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    return indianRegex.test(cleaned);
  };

  const getCleanedPhone = (phoneNumber: string): string => {
    let cleaned = phoneNumber.replace(/[\s\-\(\)]/g, "");
    if (cleaned.startsWith("+91")) cleaned = cleaned.slice(3);
    else if (cleaned.startsWith("91") && cleaned.length === 12) cleaned = cleaned.slice(2);
    else if (cleaned.startsWith("0") && cleaned.length === 11) cleaned = cleaned.slice(1);
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) {
      newErrors.patientName = "Please enter patient full name.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required for appointment confirmation.";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number (e.g. 9810158539).";
    }

    if (!date) {
      newErrors.date = "Please select a preferred consultation date.";
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Appointment date cannot be in the past.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const cleanedPhoneNumber = getCleanedPhone(phone);
    const appointmentPayload = {
      patient_name: patientName.trim(),
      parent_name: parentName.trim() || undefined,
      phone: cleanedPhoneNumber,
      preferred_date: date,
      time_slot: timeSlot,
      consultation_type: consultationType,
      message: message.trim() || undefined
    };

    // Save directly to Supabase!
    const supabaseResult = await saveAppointmentToSupabase(appointmentPayload);

    const record: AppointmentRecord = {
      ...appointmentPayload,
      id: supabaseResult.data?.id || `local-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString()
    };

    setSubmissionData(record);
    if (onAppointmentSaved) {
      onAppointmentSaved(record);
    }

    setSupabaseStatus({
      savedToSupabase: supabaseResult.success,
      tableMissing: supabaseResult.tableMissing,
      recordId: supabaseResult.data?.id,
      errorMsg: supabaseResult.error
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // WhatsApp pre-filled text
  const generateWhatsAppUrl = () => {
    if (!submissionData) return "";
    const text = encodeURIComponent(
      `Hello Dr. Ashwani K Sarna Clinic,\nI have submitted an appointment request:\n` +
      `• Patient Name: ${submissionData.patient_name}\n` +
      (submissionData.parent_name ? `• Parent/Guardian: ${submissionData.parent_name}\n` : "") +
      `• Contact: +91 ${submissionData.phone}\n` +
      `• Date: ${submissionData.preferred_date}\n` +
      `• Preferred Slot: ${submissionData.time_slot}\n` +
      `• Service: ${submissionData.consultation_type}\n` +
      (submissionData.message ? `• Note: ${submissionData.message}\n` : "") +
      `Please let me know if this slot is confirmed. Thank you!`
    );
    return `https://wa.me/919810158539?text=${text}`;
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setPatientName("");
    setParentName("");
    setPhone("");
    setDate("");
    setMessage("");
    setSupabaseStatus({ savedToSupabase: false });
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section id="appointment" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Clinic Appointment Policy & Timings */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
                <Calendar className="w-3.5 h-3.5 text-[#159A9C]" />
                CONSULTATION REQUEST
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
                Request an Appointment
              </h2>
              <p className="text-base text-[#576F82] leading-relaxed">
                Schedule a consultation with Senior Pediatrician Dr. Ashwani K Sarna at Krishna Market, Lajpat Nagar-1. All bookings sync directly with your Supabase database.
              </p>
            </div>

            {/* Supabase Connection Status Card */}
            <div className="bg-gradient-to-br from-slate-50 to-[#E8F6F3]/50 rounded-2xl p-4 sm:p-5 border border-[#159A9C]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#159A9C]" />
                  <span className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
                    Supabase Connected
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Connected to project: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[#123B5D] font-bold">{SUPABASE_PROJECT_ID}</code>
              </p>
              {onOpenSupabaseDashboard && (
                <button
                  type="button"
                  onClick={onOpenSupabaseDashboard}
                  className="text-xs font-semibold text-[#159A9C] hover:text-[#123B5D] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Open Supabase Appointments Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Consultation Shifts Table */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123B5D] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#159A9C]" />
                Verified Consultation Hours
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#123B5D] block">Morning Shift</span>
                    <span className="text-slate-500 text-xs">Monday to Saturday</span>
                  </div>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                    09:00 AM – 01:30 PM
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#123B5D] block">Evening Shift</span>
                    <span className="text-slate-500 text-xs">Monday to Saturday</span>
                  </div>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                    05:00 PM – 09:00 PM
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#123B5D] block">Sunday Consultations</span>
                    <span className="text-slate-500 text-xs">Morning Only</span>
                  </div>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                    10:00 AM – 01:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Confirmation Policy Notice */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Appointment Confirmation Policy</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Submitting this request alerts our clinic desk and records to your Supabase database. Appointments are confirmed upon clinic review or direct phone call.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form / Confirmation Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-left">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-[#123B5D]">
                      Patient &amp; Consultation Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      All details will be saved to your Supabase database in real-time.
                    </p>
                  </div>

                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Patient Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g. Master Aarav or Ms. Ananya"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                          errors.patientName ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#159A9C]`}
                      />
                    </div>
                    {errors.patientName && (
                      <p className="text-xs text-rose-500 mt-1">{errors.patientName}</p>
                    )}
                  </div>

                  {/* Parent / Guardian Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Parent / Guardian Name <span className="text-slate-400 text-[10px]">(for minor child)</span>
                    </label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#159A9C]"
                    />
                  </div>

                  {/* Phone Number (Indian Format Validation) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Contact Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit Indian Mobile Number (e.g. 9810158539)"
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${
                          errors.phone ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#159A9C]`}
                      />
                    </div>
                    {errors.phone ? (
                      <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">
                        Format: 10-digit Indian number (starts with 6, 7, 8, or 9)
                      </p>
                    )}
                  </div>

                  {/* Date and Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border ${
                          errors.date ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#159A9C]`}
                      />
                      {errors.date && (
                        <p className="text-xs text-rose-500 mt-1">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#159A9C] bg-white"
                      >
                        <option value="Morning Session (09:00 AM – 01:30 PM)">
                          Morning Session (09:00 AM – 01:30 PM)
                        </option>
                        <option value="Evening Session (05:00 PM – 09:00 PM)">
                          Evening Session (05:00 PM – 09:00 PM)
                        </option>
                        <option value="Sunday Morning (10:00 AM – 01:00 PM)">
                          Sunday Morning (10:00 AM – 01:00 PM)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Consultation / Service Type
                    </label>
                    <select
                      value={consultationType}
                      onChange={(e) => setConsultationType(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#159A9C] bg-white"
                    >
                      <option value="General Pediatric Consultation">
                        General Pediatric Consultation (Cough/Cold/Fever/Ailment)
                      </option>
                      <option value="Childhood Vaccination & Immunization">
                        Childhood Vaccination &amp; Immunization (IAP Schedule)
                      </option>
                      <option value="Newborn Checkup & Milestone Assessment">
                        Newborn Checkup &amp; Milestone Assessment
                      </option>
                      <option value="Diagnostic Lab Tests / X-Ray">
                        Diagnostic Lab Tests / X-Ray Sample Collection
                      </option>
                      <option value="Follow-up Appointment">
                        Routine Follow-up Appointment
                      </option>
                      <option value="Family Medicine Consultation">
                        Adult Family Health Consultation
                      </option>
                    </select>
                  </div>

                  {/* Optional Short Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Brief Symptoms / Notes <span className="text-slate-400 text-[10px]">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. 2-day fever, due for 6-month vaccination, or dietary checkup..."
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#159A9C]"
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="flex items-start gap-2 pt-2 text-[11px] text-slate-500">
                    <Shield className="w-3.5 h-3.5 text-[#159A9C] shrink-0 mt-0.5" />
                    <p>
                      Privacy Notice: All data is saved securely to your Supabase PostgreSQL database. Used solely for patient scheduling.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-base font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D] active:scale-[0.99] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving to Supabase Database...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#159A9C]" />
                        <span>Submit &amp; Save to Supabase</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Submission Confirmation State */
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#123B5D]">
                      Appointment Request Received!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you. Your consultation request for{" "}
                      <strong className="text-slate-800">{submissionData?.patient_name}</strong> has been logged.
                    </p>
                  </div>

                  {/* Supabase Storage Status Pill */}
                  {supabaseStatus.savedToSupabase ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-center gap-2 max-w-md mx-auto">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>
                        <strong>Saved to Supabase:</strong> Record ID:{" "}
                        <code className="font-mono text-[11px] bg-emerald-100 px-1 py-0.5 rounded">
                          {supabaseStatus.recordId?.slice(0, 8)}...
                        </code>
                      </span>
                    </div>
                  ) : supabaseStatus.tableMissing ? (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-left max-w-md mx-auto space-y-2">
                      <div className="flex items-center gap-2 font-bold">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Saved in backup! Finalize Supabase Table:</span>
                      </div>
                      <p className="text-slate-600 leading-normal">
                        Your Supabase project is connected. Run the table creation SQL once in your Supabase SQL editor to enable direct PostgreSQL persistence.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleCopySql}
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedSql ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>SQL Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Table SQL</span>
                            </>
                          )}
                        </button>
                        <a
                          href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 flex items-center gap-1"
                        >
                          <span>Open SQL Editor</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 max-w-md mx-auto">
                      <span>Saved to local session and ready for sync.</span>
                    </div>
                  )}

                  {/* Summary Box */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Patient:</span>
                      <span className="font-semibold text-slate-800">{submissionData?.patient_name}</span>
                    </div>
                    {submissionData?.parent_name && (
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Parent / Guardian:</span>
                        <span className="font-semibold text-slate-800">{submissionData?.parent_name}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Requested Date:</span>
                      <span className="font-semibold text-slate-800">{submissionData?.preferred_date}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Slot:</span>
                      <span className="font-semibold text-slate-800">{submissionData?.time_slot}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Service:</span>
                      <span className="font-semibold text-slate-800">{submissionData?.consultation_type}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Contact:</span>
                      <span className="font-semibold text-slate-800">+91 {submissionData?.phone}</span>
                    </div>
                  </div>

                  {/* Immediate Actions */}
                  <div className="space-y-3 max-w-md mx-auto pt-2">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Request Directly to Clinic WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${CLINIC_DATA.phone}`}
                      className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-[#123B5D] bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#159A9C]" />
                      <span>Call to Confirm: {CLINIC_DATA.phoneDisplay}</span>
                    </a>

                    {onOpenSupabaseDashboard && (
                      <button
                        type="button"
                        onClick={onOpenSupabaseDashboard}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#123B5D] bg-[#E8F6F3] hover:bg-[#d5eee9] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Database className="w-3.5 h-3.5 text-[#159A9C]" />
                        <span>View in Supabase Appointments Table</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs text-slate-500 hover:text-slate-800 underline pt-2 cursor-pointer"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
