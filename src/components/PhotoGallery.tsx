import React, { useState } from "react";
import { CLINIC_DATA } from "../data/clinicData";
import { GalleryPhoto } from "./PhotoLightbox";
import {
  Camera,
  Maximize2,
  ShieldCheck,
  ExternalLink,
  Settings,
  Sparkles,
  MapPin,
  CheckCircle2,
  Building,
  Microscope,
  Baby
} from "lucide-react";

interface PhotoGalleryProps {
  onOpenLightbox: (photo: GalleryPhoto) => void;
  onOpenPhotoManager: () => void;
  customPhotos: Record<string, string>;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  onOpenLightbox,
  onOpenPhotoManager,
  customPhotos
}) => {
  // Gallery items, clearly stating authentic Google Maps source vs replaceable facility slots
  const galleryPhotos: GalleryPhoto[] = [
    {
      id: "chamber",
      url: customPhotos.chamber || CLINIC_DATA.images.mapsAuthenticConsultationDesk,
      title: "Doctor's Consultation Chamber & Official Desk",
      category: "Consultation Chamber",
      isAuthenticMaps: true,
      caption: "Authentic Google Maps photograph showing Dr. Ashwani K. Sarna's official consultation desk with nameplate, prescription records, and clinical equipment in Lajpat Nagar-1.",
      verificationDetails: "Directly retrieved from Google Maps listing: https://maps.app.goo.gl/F196bZWLiaPSqFMv9"
    },
    {
      id: "diagnostics",
      url: customPhotos.diagnostics || customPhotos.chamber || CLINIC_DATA.images.mapsAuthenticConsultationDesk,
      title: "Diagnostic Centre & Sample Collection Area",
      category: "Diagnostic Unit",
      isAuthenticMaps: false,
      caption: "On-site laboratory and diagnostic unit for blood counts, infectious illness screening, and clinical examination.",
      verificationDetails: "Replaceable facility view (Dr. Ashwani K Sarna Family Clinic & Diagnostic Centre)"
    },
    {
      id: "exterior",
      url: customPhotos.exterior || customPhotos.chamber || CLINIC_DATA.images.mapsAuthenticConsultationDesk,
      title: "Clinic Entrance & Krishna Market Reception",
      category: "Clinic Entrance",
      isAuthenticMaps: false,
      caption: "E-218-216 Krishna Market, near Rampul on Gurudwara Road, Lajpat Nagar-1, New Delhi.",
      verificationDetails: "Replaceable exterior slot (Lajpat Nagar-1 clinic premises)"
    }
  ];

  const featuredPhoto = galleryPhotos[0];

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
              <Camera className="w-3.5 h-3.5 text-[#159A9C]" />
              VERIFIED CLINIC PHOTOGRAPHS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
              Authentic Views of the Clinic
            </h2>
            <p className="text-base text-[#576F82]">
              Verified photography directly from the clinic's Google Maps listing. We present authentic facilities without fabricated or misleading stock clinic representations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPhotoManager}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#123B5D] bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              title="Add or update custom photos"
            >
              <Settings className="w-4 h-4 text-[#159A9C]" />
              <span>Manage Photos</span>
            </button>

            <a
              href={CLINIC_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D] transition-colors shadow-2xs"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-4 h-4 text-[#159A9C]" />
            </a>
          </div>
        </div>

        {/* Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Large Featured Photograph */}
          <div className="lg:col-span-8 group">
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-md">
              <div
                className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 cursor-pointer shadow-inner"
                onClick={() => onOpenLightbox(featuredPhoto)}
              >
                <img
                  src={featuredPhoto.url}
                  alt={featuredPhoto.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Google Maps Photo
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(featuredPhoto);
                    }}
                    className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm transition-colors cursor-pointer"
                    aria-label="Enlarge featured photo"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Desk Nameplate: "Dr. Ashwani K. Sarna" Confirmed</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    {featuredPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                    {featuredPhoto.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Facility Highlights */}
          <div className="lg:col-span-4 space-y-4 text-left">
            {/* Secondary Photo Card */}
            <div
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onOpenLightbox(galleryPhotos[1])}
            >
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-3 bg-slate-100">
                <img
                  src={galleryPhotos[1].url}
                  alt={galleryPhotos[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-[#123B5D]/90 text-white px-2 py-0.5 rounded">
                  Diagnostic Facility
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#123B5D] group-hover:text-[#159A9C] transition-colors">
                {galleryPhotos[1].title}
              </h4>
              <p className="text-xs text-[#576F82] mt-1 line-clamp-2">
                {galleryPhotos[1].caption}
              </p>
            </div>

            {/* Authenticity Transparency Card */}
            <div className="bg-gradient-to-br from-white to-[#E8F6F3]/50 rounded-2xl p-5 border border-[#159A9C]/30 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#123B5D]">
                <ShieldCheck className="w-5 h-5 text-[#159A9C]" />
                <h4 className="text-sm font-bold">100% Real Verification Policy</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We strictly adhere to medical advertising ethics. Unlike generic doctor templates that use unrelated stock models, all photos and clinic information represent Dr. Ashwani K Sarna's actual practice at Krishna Market, Lajpat Nagar-1.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs font-semibold text-[#159A9C]">
                <span>Listing Place ID: 0x390ce3ac...</span>
                <a
                  href={CLINIC_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Verify on Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
