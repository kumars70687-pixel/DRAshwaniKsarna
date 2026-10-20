import React from "react";
import { CLINIC_DATA } from "../data/clinicData";
import { getClinicStatus } from "../utils/timeHelper";
import {
  Calendar,
  Phone,
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  Camera,
  HeartPulse
} from "lucide-react";

interface HeroProps {
  onBookAppointment: () => void;
  onOpenGallery: () => void;
  onOpenPhotoManager: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookAppointment,
  onOpenGallery,
  onOpenPhotoManager
}) => {
  const clinicStatus = getClinicStatus();

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#F8FAFC] via-[#F1F7F9] to-[#F8FAFC] bg-medical-pattern border-b border-slate-200/60"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#159A9C]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#123B5D]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Verified Information, Credentials & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Label & Live Status */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768] border border-[#159A9C]/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#159A9C]" />
                COMPASSIONATE HEALTHCARE
              </span>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-[#172B3A] border border-slate-200 shadow-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    clinicStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                <span className="font-semibold text-slate-800">{clinicStatus.message}</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 hidden sm:inline">{clinicStatus.subMessage}</span>
              </div>
            </div>

            {/* Speciality-specific Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123B5D] tracking-tight leading-[1.15]">
                Dedicated Pediatric &amp; Family Care for Over Four Decades
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#159A9C]">
                {CLINIC_DATA.name} — MD (Pediatrics), MBBS
              </p>
            </div>

            {/* Brief Verified Introduction */}
            <p className="text-base sm:text-lg text-[#576F82] leading-relaxed">
              Senior Consultant Pediatrician &amp; Family Physician serving Lajpat Nagar and South Delhi
              since 1978. Providing compassionate, evidence-based child healthcare, certified vaccinations,
              routine developmental checks, and on-site diagnostic services.
            </p>

            {/* Verified Qualifications & Key Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#159A9C]/40 transition-colors">
                <div className="p-2 rounded-lg bg-[#E8F6F3] text-[#159A9C]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Qualifications
                  </h4>
                  <p className="text-sm font-semibold text-[#123B5D]">
                    MBBS (1978) • MD Pediatrics (1982)
                  </p>
                  <p className="text-xs text-slate-500">UCMS &amp; GTB Hospital, Delhi</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#159A9C]/40 transition-colors">
                <div className="p-2 rounded-lg bg-[#E8F6F3] text-[#159A9C]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Professional Standing
                  </h4>
                  <p className="text-sm font-semibold text-[#123B5D]">
                    46+ Years Experience
                  </p>
                  <p className="text-xs text-slate-500">Member, Delhi Medical Association (DMA)</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D] active:scale-[0.98] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#159A9C]" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${CLINIC_DATA.phone}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-[#123B5D] bg-white border-2 border-[#123B5D]/20 hover:border-[#123B5D] hover:bg-slate-50 active:scale-[0.98] transition-all"
              >
                <Phone className="w-5 h-5 text-[#159A9C]" />
                <span>Call Clinic: {CLINIC_DATA.phoneDisplay}</span>
              </a>
            </div>

            {/* Verified Google Rating & Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#576F82] border-t border-slate-200/80">
              <a
                href={CLINIC_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group hover:text-[#123B5D] transition-colors"
                title="View original Google Maps profile"
              >
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-900 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>4.2 / 5.0</span>
                </div>
                <span className="font-medium text-xs sm:text-sm">
                  210+ Verified Reviews on Google Maps
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#159A9C] transition-colors" />
              </a>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>On-Site Diagnostics &amp; Path Lab</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Verified Photos & Authentic Doctor Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200/90 relative">
                {/* Authentic Google Maps Photo Banner */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3] group shadow-inner">
                  <img
                    src={CLINIC_DATA.images.mapsAuthenticConsultationDesk}
                    alt="Dr. Ashwani K Sarna consultation desk and clinic chamber from Google Maps listing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge: Verified Photo */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#123B5D]/90 text-white backdrop-blur-md border border-white/20">
                      <Camera className="w-3 h-3 text-[#159A9C]" />
                      Authentic Google Maps Listing Photo
                    </span>
                    <button
                      onClick={onOpenGallery}
                      className="text-[11px] font-semibold bg-white/90 hover:bg-white text-slate-800 px-2.5 py-1 rounded-full shadow-xs transition-colors flex items-center gap-1"
                      title="Enlarge photograph"
                    >
                      Enlarge
                    </button>
                  </div>

                  {/* Bottom Caption identifying desk nameplate */}
                  <div className="absolute bottom-3 left-3 right-3 text-left text-white">
                    <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Doctor Desk with "Dr. Ashwani K. Sarna" Nameplate
                    </p>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Consultation Chamber &amp; Diagnostic Unit, Krishna Market, Lajpat Nagar-1
                    </p>
                  </div>
                </div>

                {/* Doctor Bio Card Details */}
                <div className="pt-4 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#123B5D]">
                        {CLINIC_DATA.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#159A9C]">
                        MBBS, MD (Pediatrics) • 46+ Yrs Clinical Practice
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#E8F6F3] flex items-center justify-center text-[#159A9C]">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Clinic Address & Hours Quick Strip */}
                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 text-slate-600 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#159A9C] shrink-0" />
                      <span className="truncate">Near Rampul, Gurudwara Rd, Lajpat Nagar-1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#159A9C] shrink-0" />
                      <span>Mon–Sat: 9:00 AM–1:30 PM &amp; 5:00 PM–9:00 PM</span>
                    </div>
                  </div>

                  {/* Actions for Photo Management & Maps */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    <a
                      href={CLINIC_DATA.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#123B5D] hover:text-[#159A9C] flex items-center gap-1 transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={onOpenPhotoManager}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
                      title="Replace or add custom clinic photographs"
                    >
                      <Camera className="w-3 h-3 text-[#159A9C]" />
                      <span>Manage Photos</span>
                    </button>
                  </div>
                </div>

                {/* Floating experience pill badge */}
                <div className="absolute -top-3 -right-3 sm:-right-4 bg-[#123B5D] text-white px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold tracking-tight">46+ Years Caring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
