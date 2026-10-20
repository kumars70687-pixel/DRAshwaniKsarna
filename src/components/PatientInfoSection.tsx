import React from "react";
import {
  FileText,
  Syringe,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Info
} from "lucide-react";
import { CLINIC_DATA } from "../data/clinicData";

interface PatientInfoSectionProps {
  onBookAppointment: () => void;
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({ onBookAppointment }) => {
  return (
    <section id="patient-info" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
            <Info className="w-3.5 h-3.5 text-[#159A9C]" />
            PATIENT INFORMATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
            Preparing for Your Clinic Visit
          </h2>
          <p className="text-base sm:text-lg text-[#576F82]">
            Helpful guidelines to ensure a seamless, comfortable consultation for you and your child.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Card 1: Vaccination Checklist */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F6F3] text-[#159A9C] flex items-center justify-center">
              <Syringe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#123B5D]">
              Child Vaccination Checklist
            </h3>
            <p className="text-xs sm:text-sm text-[#576F82] leading-relaxed">
              When bringing your infant or toddler for scheduled immunizations:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Bring the official Child Immunization Record / Yellow Card.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Keep your baby comfortably fed 20–30 minutes before arrival.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Dress your baby in easy-to-unbutton cotton clothing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Post-vaccine paracetamol dosage is explained during consultation.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Medical Consultation Tips */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F6F3] text-[#159A9C] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#123B5D]">
              Illness &amp; Follow-up Consultations
            </h3>
            <p className="text-xs sm:text-sm text-[#576F82] leading-relaxed">
              For acute fever, cough, stomach complaints, or developmental reviews:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Bring all previous prescription slips and current medications.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Note fever recordings and timings over the last 24–48 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Carry recent blood tests or hospital discharge summaries if applicable.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Feel free to write down any specific queries beforehand.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Diagnostic Lab & Clinic Etiquette */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F6F3] text-[#159A9C] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#123B5D]">
              Diagnostic &amp; Lab Protocol
            </h3>
            <p className="text-xs sm:text-sm text-[#576F82] leading-relaxed">
              For on-site blood tests, urine analysis, and digital X-Rays:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Blood sample collection begins with the morning shift from 9:00 AM.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Fever tests (CBC, Dengue NS1, Malarial antigen) done promptly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Reports can be shared directly with Dr. Sarna for immediate review.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
                <span>Both walk-in tests and doctor-prescribed tests are supported.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Notice Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>Emergency Advisory:</strong> In the event of severe breathing distress, continuous convulsions, sudden unresponsiveness, or high neonatal fever with lethargy, please take the child immediately to the nearest pediatric emergency hospital or call emergency services (112 / 102).
            </p>
          </div>
          <a
            href={`tel:${CLINIC_DATA.phone}`}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Clinic Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
};
