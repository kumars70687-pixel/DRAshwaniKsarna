import React from "react";
import {
  Baby,
  Syringe,
  TrendingUp,
  HeartPulse,
  Microscope,
  Stethoscope,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface SpecialitiesProps {
  onSelectService: (serviceName: string) => void;
}

export const Specialities: React.FC<SpecialitiesProps> = ({ onSelectService }) => {
  const specialities = [
    {
      title: "General Pediatrics",
      icon: Baby,
      badge: "Core Speciality",
      description: "Diagnosis and compassionate care for acute and chronic childhood illnesses from day 1 through age 18.",
      points: [
        "Common cold, cough & seasonal viral flu",
        "Asthma, wheezing & respiratory allergies",
        "Digestive issues, colic & diarrhea",
        "Conservative antibiotic stewardship"
      ]
    },
    {
      title: "Immunization & Vaccinations",
      icon: Syringe,
      badge: "IAP Certified",
      description: "Safe, temperature-controlled pediatric vaccinations adhering to Indian Academy of Pediatrics (IAP) guidelines.",
      points: [
        "Zero to 18 years complete schedule",
        "Dedicated cold-chain refrigeration",
        "Computerized record tracking",
        "Gentle, stress-free administration"
      ]
    },
    {
      title: "Newborn & Infant Care",
      icon: HeartPulse,
      badge: "Infant Care",
      description: "Delicate post-birth assessments, umbilical care, lactation counseling, and infant health milestones.",
      points: [
        "Post-natal wellness evaluations",
        "Infant weight & feeding progression",
        "Neonatal jaundice assessment",
        "Colic, reflux & sleep routines"
      ]
    },
    {
      title: "Growth & Milestones Assessment",
      icon: TrendingUp,
      badge: "Development",
      description: "Regular screening of physical percentiles and motor, sensory, cognitive, and speech milestones.",
      points: [
        "WHO percentile charts monitoring",
        "Early developmental delay screening",
        "Pediatric nutritional counseling",
        "Finicky eater and weaning guidance"
      ]
    },
    {
      title: "In-House Diagnostic Centre",
      icon: Microscope,
      badge: "On-Site Lab",
      description: "Integrated clinical diagnostics, pathology blood and urine tests, and diagnostic X-Ray imaging.",
      points: [
        "Blood tests (CBC, Dengue, Typhoid, Malaria)",
        "Urine examination & routine cultures",
        "Digital X-Ray facilities on premises",
        "Rapid turnaround for urgent diagnosis"
      ]
    },
    {
      title: "Family Healthcare",
      icon: Stethoscope,
      badge: "Primary Care",
      description: "Comprehensive primary health checkups and seasonal infection management for parents and adult family members.",
      points: [
        "Primary care for adult family members",
        "Blood pressure & routine vitals",
        "Seasonal fever & flu management",
        "Convenient family consultation"
      ]
    }
  ];

  return (
    <section id="specialities" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
            <Sparkles className="w-3.5 h-3.5 text-[#159A9C]" />
            CLINICAL SPECIALITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
            Specialized Care for Every Child &amp; Family
          </h2>
          <p className="text-base sm:text-lg text-[#576F82]">
            Evidence-based medical practice shaped by 46+ years of pediatrics, emphasizing gentle examination, precise diagnosis, and minimal medication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specialities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#159A9C]/40 transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F6F3] text-[#159A9C] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#123B5D] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#123B5D] mb-2 group-hover:text-[#159A9C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#576F82] mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#159A9C]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectService(item.title)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#123B5D] group-hover:text-[#159A9C] cursor-pointer pt-2"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
