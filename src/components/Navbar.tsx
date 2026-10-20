import React, { useState, useEffect } from "react";
import { CLINIC_DATA } from "../data/clinicData";
import { getClinicStatus } from "../utils/timeHelper";
import {
  Phone,
  Calendar,
  Clock,
  Menu,
  X,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Database
} from "lucide-react";

interface NavbarProps {
  onBookAppointment: () => void;
  onOpenSupabaseDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookAppointment,
  onOpenSupabaseDashboard
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [clinicStatus, setClinicStatus] = useState(getClinicStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Update status every 60 seconds
    const interval = setInterval(() => {
      setClinicStatus(getClinicStatus());
    }, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About Doctor", href: "#about" },
    { label: "Specialities", href: "#specialities" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Patient Info", href: "#patient-info" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#123B5D] text-white text-xs py-2 px-4 border-b border-[#123B5D]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#159A9C]" />
              E-218-216, Krishna Market, Lajpat Nagar-1, New Delhi
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#159A9C]" />
              Mon–Sat: 9:00 AM–1:30 PM &amp; 5:00 PM–9:00 PM | Sun: 10:00 AM–1:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 text-[11px]">
              <span
                className={`w-2 h-2 rounded-full ${
                  clinicStatus.isOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="text-slate-200 font-medium">{clinicStatus.message}</span>
            </div>
            <a
              href={`tel:${CLINIC_DATA.phone}`}
              className="font-semibold text-[#159A9C] hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {CLINIC_DATA.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-md py-2.5 border-b border-slate-200/80"
            : "bg-white/95 backdrop-blur-sm py-3.5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Clinic Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#hero");
            }}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#123B5D] to-[#159A9C] flex items-center justify-center text-white shadow-md shadow-[#123B5D]/20 group-hover:scale-105 transition-transform">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M2 12h20" />
                <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-[#123B5D] tracking-tight group-hover:text-[#159A9C] transition-colors">
                  {CLINIC_DATA.name}
                </span>
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] bg-[#E8F6F3] text-[#0B6768] font-semibold px-1.5 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3 text-[#159A9C]" />
                  MD (Peds)
                </span>
              </div>
              <p className="text-xs text-[#576F82] font-medium hidden sm:block">
                Family Clinic &amp; Diagnostic Centre • 46+ Years Experience
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-1.5 text-sm font-medium text-[#172B3A] hover:text-[#159A9C] rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSupabaseDashboard}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#123B5D] bg-[#E8F6F3] hover:bg-[#d8f0ec] rounded-lg transition-colors border border-[#159A9C]/30 cursor-pointer"
              title="View all patient appointments in Supabase"
            >
              <Database className="w-3.5 h-3.5 text-[#159A9C]" />
              <span className="hidden md:inline">Supabase DB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <a
              href={`tel:${CLINIC_DATA.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#123B5D] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Call clinic directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#159A9C]" />
              <span>Call Clinic</span>
            </a>

            <button
              onClick={onBookAppointment}
              className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D] active:scale-95 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#159A9C]" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#172B3A] hover:bg-slate-100 lg:hidden cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl px-4 py-6 transition-all animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-3 py-2.5 text-base font-medium text-[#172B3A] hover:text-[#159A9C] hover:bg-[#E8F6F3]/50 rounded-lg flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupabaseDashboard();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-[#123B5D] bg-[#E8F6F3] border border-[#159A9C]/30 hover:bg-[#d8f0ec]"
              >
                <Database className="w-4 h-4 text-[#159A9C]" />
                <span>Supabase Appointments Database</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
              </button>

              <a
                href={`tel:${CLINIC_DATA.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-[#123B5D] bg-slate-100 hover:bg-slate-200"
              >
                <Phone className="w-4 h-4 text-[#159A9C]" />
                <span>Call Clinic: {CLINIC_DATA.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookAppointment();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D]"
              >
                <Calendar className="w-4 h-4 text-[#159A9C]" />
                <span>Request Appointment</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
