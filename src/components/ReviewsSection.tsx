import React from "react";
import { CLINIC_DATA, VERIFIED_REVIEWS, ReviewItem } from "../data/clinicData";
import {
  Star,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Quote,
  ThumbsUp,
  UserCheck
} from "lucide-react";

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
            <Star className="w-3.5 h-3.5 fill-[#159A9C] text-[#159A9C]" />
            PATIENT FEEDBACK &amp; RATINGS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
            Verified Experiences from Families
          </h2>
          <p className="text-base sm:text-lg text-[#576F82]">
            Over 46 years of trust reflected in consistent patient appreciation across Google Maps and public healthcare portals.
          </p>
        </div>

        {/* Rating Overview Card */}
        <div className="max-w-4xl mx-auto mb-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score Big Display */}
            <div className="md:col-span-4 text-center md:border-r border-slate-100 md:pr-6 space-y-1">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#123B5D]">
                {CLINIC_DATA.rating.score}
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-400 py-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-400/40 text-amber-400"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Based on 210+ Verified Public Ratings
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Authentic Public Records
                </span>
              </div>
            </div>

            {/* Qualitative Highlights */}
            <div className="md:col-span-8 text-left space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#123B5D]">
                What Parents Frequently Value
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Patient & calm listening to all concerns",
                  "Conservative medication without over-prescribing",
                  "Gentle handling of newborns & toddlers",
                  "Convenient on-site diagnostic & path lab tests",
                  "Decades of pediatric diagnostic accuracy",
                  "Affordable neighborhood consultation fee"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <ThumbsUp className="w-3.5 h-3.5 text-[#159A9C] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href={CLINIC_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#123B5D] bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <span>View All Reviews on Google Maps Listing</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#159A9C]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {VERIFIED_REVIEWS.map((rev: ReviewItem) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between text-left relative group hover:border-[#159A9C]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#E8F6F3] text-[#123B5D] font-bold text-xs flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#123B5D]">
                        {rev.author}
                      </h4>
                      <p className="text-[11px] text-slate-500">{rev.relation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                  {rev.date}
                </span>
                <span>{rev.verifiedSource}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action to leave review or view full profile */}
        <div className="mt-12 text-center">
          <a
            href={CLINIC_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D] shadow-sm hover:shadow-md transition-all"
          >
            <span>View Verified Google Maps Listing</span>
            <ExternalLink className="w-4 h-4 text-[#159A9C]" />
          </a>
        </div>
      </div>
    </section>
  );
};
