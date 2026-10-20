import React, { useState, useEffect } from "react";
import {
  Database,
  X,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Search,
  Filter
} from "lucide-react";
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_SQL_SETUP,
  AppointmentRecord,
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase,
  testSupabaseConnection
} from "../lib/supabase";

interface SupabaseDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  localBackups?: AppointmentRecord[];
}

export const SupabaseDashboardModal: React.FC<SupabaseDashboardModalProps> = ({
  isOpen,
  onClose,
  localBackups = []
}) => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [connStatus, setConnStatus] = useState<{
    connected: boolean;
    tableExists: boolean;
    message: string;
  } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const testResult = await testSupabaseConnection();
    setConnStatus(testResult);

    const { data, tableMissing } = await fetchAppointmentsFromSupabase();
    if (tableMissing || data.length === 0) {
      // Merge with any local submissions
      setAppointments(localBackups);
    } else {
      // Merge unique
      const combined = [...data];
      for (const loc of localBackups) {
        if (!combined.some((c) => c.phone === loc.phone && c.preferred_date === loc.preferred_date)) {
          combined.push(loc);
        }
      }
      setAppointments(combined);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleStatusChange = async (
    id: string | undefined,
    newStatus: "pending" | "confirmed" | "completed" | "cancelled"
  ) => {
    if (!id) return;
    setUpdatingId(id);
    const result = await updateAppointmentStatusInSupabase(id, newStatus);
    if (result.success) {
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    }
    setUpdatingId(null);
  };

  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      app.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      (app.consultation_type && app.consultation_type.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden text-left flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-[#123B5D] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#159A9C] flex items-center justify-center text-white shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold">
                  Supabase Appointments Database
                </h3>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Project ID: {SUPABASE_PROJECT_ID} • {SUPABASE_URL}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh appointments"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Connection Status Banner */}
        <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-3 h-3 rounded-full shrink-0 ${
                connStatus?.tableExists
                  ? "bg-emerald-500 animate-pulse"
                  : connStatus?.connected
                  ? "bg-amber-500"
                  : "bg-rose-500"
              }`}
            />
            <span className="font-semibold text-slate-700">
              {connStatus ? connStatus.message : "Testing Supabase connection..."}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopySql}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#159A9C] font-semibold text-[#123B5D] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy the SQL table setup query"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">SQL Script Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#159A9C]" />
                  <span>Copy SQL Table Script</span>
                </>
              )}
            </button>

            <a
              href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#123B5D] text-white font-semibold flex items-center gap-1.5 hover:bg-[#0B263D] transition-colors"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#159A9C]" />
            </a>
          </div>
        </div>

        {/* If Table is not created yet, show 1-click instruction card */}
        {connStatus && !connStatus.tableExists && (
          <div className="m-4 sm:mx-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Step-by-step: Create the 'appointments' table in Supabase (1-minute setup)</span>
            </div>
            <p className="leading-relaxed">
              Your Supabase project <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">{SUPABASE_PROJECT_ID}</code> is connected, but PostgreSQL needs the <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">appointments</code> table to store records.
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-700 pt-1">
              <li>Click the <strong>"Copy SQL Table Script"</strong> button above.</li>
              <li>Click <strong>"Open Supabase SQL Editor"</strong> (or go to your Supabase Dashboard &rarr; SQL Editor).</li>
              <li>Paste the SQL script and click <strong>"Run"</strong>. That's it!</li>
            </ol>
            <p className="text-[11px] text-amber-800 italic pt-1">
              * Any appointments submitted while the table is being created are automatically preserved in local storage backup.
            </p>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="p-4 sm:px-6 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, phone, service..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#159A9C]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <div className="flex items-center gap-1">
              {["all", "pending", "confirmed", "completed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    statusFilter === st
                      ? "bg-[#123B5D] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table / List View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-700">No appointments found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters or search query."
                  : "When patients submit the booking form on the website, their appointment details will appear here and in your Supabase database in real-time."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((app, idx) => (
                <div
                  key={app.id || idx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-[#159A9C]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Patient Details */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-base font-bold text-[#123B5D]">
                        {app.patient_name}
                      </h4>
                      {app.parent_name && (
                        <span className="text-xs text-slate-500">
                          (Parent: {app.parent_name})
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          app.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {app.status || "Pending"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-[#159A9C]" />
                        +91 {app.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {app.preferred_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {app.time_slot}
                      </span>
                    </div>

                    <div className="text-xs text-[#0B6768] font-medium bg-[#E8F6F3] inline-block px-2.5 py-0.5 rounded-md mt-1">
                      {app.consultation_type}
                    </div>

                    {app.message && (
                      <p className="text-xs text-slate-500 italic mt-1">
                        Note: "{app.message}"
                      </p>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <a
                      href={`tel:+91${app.phone}`}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#123B5D] text-xs font-semibold transition-colors flex items-center gap-1"
                      title="Call Patient"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#159A9C]" />
                      <span className="hidden sm:inline">Call</span>
                    </a>

                    <a
                      href={`https://wa.me/91${app.phone}?text=${encodeURIComponent(
                        `Hello ${app.patient_name}, regarding your consultation request with Dr. Ashwani K Sarna on ${app.preferred_date} (${app.time_slot})...`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors flex items-center gap-1"
                      title="WhatsApp Patient"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>

                    {app.id && (
                      <select
                        value={app.status || "pending"}
                        disabled={updatingId === app.id}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            e.target.value as "pending" | "confirmed" | "completed" | "cancelled"
                          )
                        }
                        className="text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#159A9C]"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            Connected to Supabase PostgreSQL • Real-time patient appointment records
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-semibold cursor-pointer transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
