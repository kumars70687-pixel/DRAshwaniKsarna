import React, { useState } from "react";
import { CLINIC_FAQS, CLINIC_DATA } from "../data/clinicData";
import { ChevronDown, HelpCircle, Phone, MapPin } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
            <HelpCircle className="w-3.5 h-3.5 text-[#159A9C]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
            Common Patient Questions
          </h2>
          <p className="text-base text-[#576F82]">
            Clear, verified answers regarding clinic timings, appointments, and facilities in Lajpat Nagar-1.
          </p>
        </div>

        <div className="space-y-3">
          {CLINIC_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all text-left"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#123B5D]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#E8F6F3] text-[#159A9C]" : "text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-[#576F82] leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-[#123B5D]">
              Have a specific question not listed here?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Speak directly with Dr. Sarna's reception desk during working hours.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${CLINIC_DATA.phone}`}
              className="px-4 py-2.5 rounded-xl bg-[#123B5D] hover:bg-[#0B263D] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#159A9C]" />
              <span>Call: {CLINIC_DATA.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
