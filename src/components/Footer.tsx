import React from "react";
import { CLINIC_DATA } from "../data/clinicData";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Heart,
  Camera,
  ChevronUp,
  Database
} from "lucide-react";

interface FooterProps {
  onBookAppointment: () => void;
  onOpenPhotoManager: () => void;
  onOpenSupabaseDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onBookAppointment,
  onOpenPhotoManager,
  onOpenSupabaseDashboard
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#123B5D] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/80 text-left">
          {/* Clinic Brand & Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#159A9C] to-emerald-400 flex items-center justify-center text-white shadow-md">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M2 12h20" />
                  <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {CLINIC_DATA.name}
                </h3>
                <p className="text-xs text-[#159A9C] font-semibold">
                  Family Clinic &amp; Diagnostic Centre
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Providing compassionate, evidence-based pediatric healthcare, infant vaccinations, and on-site clinical diagnostics to families in Lajpat Nagar and South Delhi for over 46 years.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#159A9C]" />
              <span>MBBS (1978) • MD Pediatrics (1982) • Member DMA</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Dr. Ashwani K Sarna
                </a>
              </li>
              <li>
                <a href="#specialities" className="hover:text-white transition-colors">
                  Pediatric Specialities
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services &amp; Diagnostic Centre
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Verified Clinic Photos
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Patient Reviews &amp; Ratings
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Location &amp; Timings
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Clinic Contact &amp; Address
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>
                  {CLINIC_DATA.address.line1}, {CLINIC_DATA.address.line2}, Near Rampul on Gurudwara Road, New Delhi 110024
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#159A9C] shrink-0" />
                <a
                  href={`tel:${CLINIC_DATA.phone}`}
                  className="hover:text-white font-semibold text-white transition-colors"
                >
                  {CLINIC_DATA.phoneDisplay}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <div>
                  <p>Mon–Sat: 09:00 AM–01:30 PM &amp; 05:00 PM–09:00 PM</p>
                  <p>Sun: 10:00 AM–01:00 PM (Evening Closed)</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={CLINIC_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159A9C] hover:text-white transition-colors"
                >
                  <span>Google Maps Listing (Coordinates 28.5738, 77.2431)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {CLINIC_DATA.clinicName}. All verified clinical practice information is strictly authenticated from official public records.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {onOpenSupabaseDashboard && (
              <button
                onClick={onOpenSupabaseDashboard}
                className="hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors text-slate-300 font-medium"
                title="View Supabase Appointments Database"
              >
                <Database className="w-3.5 h-3.5 text-[#159A9C]" />
                <span>Supabase Appointments DB</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}

            <button
              onClick={onOpenPhotoManager}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title="Photo update and code instructions"
            >
              <Camera className="w-3.5 h-3.5 text-[#159A9C]" />
              <span>Manage Photos</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
