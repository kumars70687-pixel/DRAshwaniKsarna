import React, { useState } from "react";
import { VERIFIED_SERVICES, ServiceItem } from "../data/clinicData";
import {
  Baby,
  Syringe,
  TrendingUp,
  HeartPulse,
  Microscope,
  Stethoscope,
  CheckCircle2,
  Calendar,
  Layers
} from "lucide-react";

interface ServicesProps {
  onBookService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "pediatrics", label: "Pediatrics & Child Care" },
    { id: "diagnostics", label: "Diagnostic & Lab Tests" },
    { id: "family", label: "Family Medicine" }
  ];

  const filteredServices =
    activeCategory === "all"
      ? VERIFIED_SERVICES
      : VERIFIED_SERVICES.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Baby":
        return <Baby className="w-6 h-6" />;
      case "Syringe":
        return <Syringe className="w-6 h-6" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6" />;
      case "Microscope":
        return <Microscope className="w-6 h-6" />;
      default:
        return <Stethoscope className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
            <Layers className="w-3.5 h-3.5 text-[#159A9C]" />
            SERVICES &amp; CONSULTATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
            Comprehensive Clinical &amp; Diagnostic Solutions
          </h2>
          <p className="text-base sm:text-lg text-[#576F82]">
            From routine newborn vaccinations to full-panel blood examinations and seasonal illness care, everything under one roof.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#123B5D] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#159A9C]/40 transition-all flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F6F3] text-[#159A9C] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#123B5D] group-hover:text-white transition-all">
                    {getIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E8F6F3] text-[#0B6768] border border-[#159A9C]/20">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#123B5D] mb-2 group-hover:text-[#159A9C] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-[#576F82] mb-4 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="bg-slate-50 rounded-xl p-3.5 mb-5 space-y-2 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Care Features
                  </p>
                  <ul className="space-y-1.5">
                    {service.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#159A9C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => onBookService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#123B5D] bg-[#E8F6F3] hover:bg-[#123B5D] hover:text-white transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Facilities Highlight Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#123B5D] to-[#1a4a73] text-white text-left relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="inline-block text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#159A9C] text-white">
                ON-SITE DIAGNOSTIC ADVANTAGE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Accurate Path Lab &amp; X-Ray Facilities in the Same Centre
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                When a child runs a high fever or an elderly patient requires immediate blood tests, Dr. Sarna's family clinic provides on-site sample collection, rapid fever profiles, and digital X-Rays so diagnosis is never delayed.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onBookService("Diagnostic Lab / X-Ray Facility")}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#159A9C] hover:bg-[#0F787A] text-white transition-colors cursor-pointer text-center"
              >
                Inquire Diagnostic Tests
              </button>
              <a
                href="tel:+919810158539"
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white text-center border border-white/20 transition-colors"
              >
                Call Lab Desk: +91 98101 58539
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
