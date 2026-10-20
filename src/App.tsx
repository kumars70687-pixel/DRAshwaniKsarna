/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CLINIC_DATA } from "./data/clinicData";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutDoctor } from "./components/AboutDoctor";
import { Specialities } from "./components/Specialities";
import { Services } from "./components/Services";
import { PhotoGallery } from "./components/PhotoGallery";
import { AppointmentSection } from "./components/AppointmentSection";
import { LocationSection } from "./components/LocationSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { PatientInfoSection } from "./components/PatientInfoSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { QuickActionBar } from "./components/QuickActionBar";
import { PhotoLightbox, GalleryPhoto } from "./components/PhotoLightbox";
import { PhotoManagerModal } from "./components/PhotoManagerModal";
import { SupabaseDashboardModal } from "./components/SupabaseDashboardModal";
import { AppointmentRecord } from "./lib/supabase";

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [isSupabaseDashboardOpen, setIsSupabaseDashboardOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>("");

  // Custom photos state with localStorage persistence
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("dr_sarna_clinic_custom_photos");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Local appointment backup records
  const [localBookings, setLocalBookings] = useState<AppointmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem("dr_sarna_clinic_appointments_backup");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleNewBooking = (record: AppointmentRecord) => {
    setLocalBookings((prev) => {
      const updated = [record, ...prev];
      try {
        localStorage.setItem("dr_sarna_clinic_appointments_backup", JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not save to localStorage", e);
      }
      return updated;
    });
  };

  const handleUpdatePhoto = (photoId: string, newUrl: string) => {
    setCustomPhotos((prev) => {
      const updated = { ...prev, [photoId]: newUrl };
      try {
        localStorage.setItem("dr_sarna_clinic_custom_photos", JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not save to localStorage", e);
      }
      return updated;
    });
  };

  const scrollToAppointment = () => {
    const el = document.getElementById("appointment");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToAppointment();
  };

  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Gallery photos list for lightbox navigation
  const allPhotos: GalleryPhoto[] = [
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172B3A] pb-14 sm:pb-0">
      {/* Sticky Header Navigation */}
      <Navbar
        onBookAppointment={scrollToAppointment}
        onOpenSupabaseDashboard={() => setIsSupabaseDashboardOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onBookAppointment={scrollToAppointment}
          onOpenGallery={scrollToGallery}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
        />

        {/* 2. About Doctor Section */}
        <AboutDoctor onBookAppointment={scrollToAppointment} />

        {/* 3. Clinical Specialities */}
        <Specialities onSelectService={handleSelectService} />

        {/* 4. Services & Diagnostics */}
        <Services onBookService={handleSelectService} />

        {/* 5. Verified Clinic Photographs & Lightbox */}
        <PhotoGallery
          onOpenLightbox={(photo) => setSelectedPhoto(photo)}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
          customPhotos={customPhotos}
        />

        {/* 6. Appointment Booking (Connected to Supabase) */}
        <AppointmentSection
          preselectedService={preselectedService}
          onAppointmentSaved={handleNewBooking}
          onOpenSupabaseDashboard={() => setIsSupabaseDashboardOpen(true)}
        />

        {/* 7. Location & Interactive Map */}
        <LocationSection onBookAppointment={scrollToAppointment} />

        {/* 8. Google Reviews & Patient Feedback */}
        <ReviewsSection />

        {/* 9. Patient Information & Clinic Protocol */}
        <PatientInfoSection onBookAppointment={scrollToAppointment} />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onBookAppointment={scrollToAppointment}
        onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
        onOpenSupabaseDashboard={() => setIsSupabaseDashboardOpen(true)}
      />

      {/* Mobile Floating Quick Action Bar */}
      <QuickActionBar onBookAppointment={scrollToAppointment} />

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        photos={allPhotos}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={(newIdx) => setSelectedPhoto(allPhotos[newIdx])}
      />

      {/* Photo Manager Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        onUpdatePhoto={handleUpdatePhoto}
      />

      {/* Supabase Appointments Database Dashboard Modal */}
      <SupabaseDashboardModal
        isOpen={isSupabaseDashboardOpen}
        onClose={() => setIsSupabaseDashboardOpen(false)}
        localBackups={localBookings}
      />
    </div>
  );
}
