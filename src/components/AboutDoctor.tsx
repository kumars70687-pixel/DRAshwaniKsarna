import React from "react";
import { CLINIC_DATA } from "../data/clinicData";
import {
  GraduationCap,
  Calendar,
  Building2,
  Stethoscope,
  Heart,
  Baby,
  Activity,
  CheckCircle,
  ShieldAlert,
  ExternalLink
} from "lucide-react";

interface AboutDoctorProps {
  onBookAppointment: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ onBookAppointment }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
            <Heart className="w-3.5 h-3.5 text-[#159A9C]" />
            ABOUT THE DOCTOR
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
            Meet Dr. Ashwani K Sarna
          </h2>
          <p className="text-base sm:text-lg text-[#576F82]">
            MBBS (1978) • MD - Pediatrics (1982) • Senior Consultant Pediatrician
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Clinical Photo & Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <img
                  src={CLINIC_DATA.images.mapsAuthenticConsultationDesk}
                  alt="Dr. Ashwani K Sarna's consultation room & desk from verified Google Maps listing"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                  <span className="inline-block text-[11px] font-semibold bg-[#159A9C] px-2 py-0.5 rounded-full mb-1">
                    Verified Clinic Chamber
                  </span>
                  <p className="text-xs font-medium text-slate-100">
                    Official consultation room at Krishna Market, Lajpat Nagar-1
                  </p>
                </div>
              </div>

              {/* Verified Timeline Badge Strip */}
              <div className="mt-5 space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center text-[#159A9C] shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      MD in Pediatrics (1982)
                    </h4>
                    <p className="text-xs font-semibold text-[#123B5D]">
                      UCMS &amp; Guru Teg Bahadur Hospital, Delhi University
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center text-[#159A9C] shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      MBBS (1978)
                    </h4>
                    <p className="text-xs font-semibold text-[#123B5D]">
                      University College of Medical Sciences (UCMS), Delhi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F6F3] flex items-center justify-center text-[#159A9C] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Professional Affiliation
                    </h4>
                    <p className="text-xs font-semibold text-[#123B5D]">
                      Delhi Medical Association (DMA)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-4 text-base text-[#576F82] leading-relaxed">
              <h3 className="text-2xl font-bold text-[#123B5D]">
                A Pillar of Compassionate Child Healthcare Since 1978
              </h3>

              <p>
                For more than <strong className="text-[#123B5D]">46 years</strong>, Dr. Ashwani K Sarna has been one of the most trusted pediatricians in South Delhi. Families throughout Lajpat Nagar, Defence Colony, Amar Colony, and East of Kailash rely on his clinical judgment, calm reassurance, and gentle approach with young children.
              </p>

              <p>
                Having graduated with his MBBS in 1978 and completing his MD in Pediatrics in 1982 from the prestigious University College of Medical Sciences (UCMS) &amp; GTB Hospital, Dr. Sarna embodies the golden standard of patient-centric medicine. Many of the young parents walking into his clinic today were once treated by Dr. Sarna when they were infants themselves.
              </p>

              <p>
                Dr. Sarna strongly believes in <span className="text-[#123B5D] font-semibold">conservative medical management</span>—avoiding over-prescription of heavy antibiotics for self-limiting viral infections, prioritizing nutritional guidance, and thoroughly answering every question from anxious parents.
              </p>
            </div>

            {/* Areas of Clinical Focus */}
            <div className="pt-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#123B5D] mb-3">
                Key Clinical Specialties &amp; Interests
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Neonatal & Infant Health Monitoring",
                  "IAP Cold-Chain Child Vaccinations",
                  "Growth & Milestone Assessments",
                  "Childhood Respiratory & Seasonal Fevers",
                  "Pediatric Nutrition & Finicky Eater Care",
                  "Integrated Primary Diagnostics & Lab Tests"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-[#159A9C] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Verification Notice */}
            <div className="p-4 rounded-xl bg-[#E8F6F3]/70 border border-[#159A9C]/30 flex items-start gap-3">
              <Activity className="w-5 h-5 text-[#159A9C] shrink-0 mt-0.5" />
              <div className="text-xs text-[#0B6768] space-y-1">
                <p className="font-semibold">
                  Verified Practitioner Information
                </p>
                <p className="text-slate-600 leading-normal">
                  All qualifications, dates, memberships, and clinical addresses listed on this website are directly verified from the Delhi Medical Association directory, public medical registers, and the official Google Maps listing.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookAppointment}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D] transition-colors cursor-pointer shadow-sm"
              >
                Schedule Consultation with Dr. Sarna
              </button>

              <a
                href={CLINIC_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#159A9C] hover:underline flex items-center gap-1"
              >
                <span>View Google Maps Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
