import React from "react";
import { CLINIC_DATA } from "../data/clinicData";
import { Phone, MessageSquare, Navigation, Calendar } from "lucide-react";

interface QuickActionBarProps {
  onBookAppointment: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onBookAppointment }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 sm:hidden shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5">
        <a
          href={`tel:${CLINIC_DATA.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#123B5D] hover:bg-slate-100 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#159A9C]" />
          <span className="text-[10px] font-semibold mt-0.5">Call</span>
        </a>

        <a
          href={`https://wa.me/919810158539?text=${encodeURIComponent("Hello Dr. Ashwani K Sarna clinic, I would like to inquire about consultation timings.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#123B5D] hover:bg-slate-100 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        <a
          href={CLINIC_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#123B5D] hover:bg-slate-100 transition-colors"
        >
          <Navigation className="w-4 h-4 text-[#123B5D]" />
          <span className="text-[10px] font-semibold mt-0.5">Maps</span>
        </a>

        <button
          onClick={onBookAppointment}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#123B5D] text-white shadow-xs"
        >
          <Calendar className="w-4 h-4 text-[#159A9C]" />
          <span className="text-[10px] font-bold mt-0.5">Book</span>
        </button>
      </div>
    </div>
  );
};
