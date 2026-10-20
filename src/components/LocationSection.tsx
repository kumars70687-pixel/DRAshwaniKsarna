import React from "react";
import { CLINIC_DATA } from "../data/clinicData";
import { getClinicStatus } from "../utils/timeHelper";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
  Calendar,
  Share2,
  CheckCircle2,
  Building2,
  Compass
} from "lucide-react";

interface LocationSectionProps {
  onBookAppointment: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onBookAppointment }) => {
  const clinicStatus = getClinicStatus();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: CLINIC_DATA.clinicName,
        text: `Dr. Ashwani K Sarna Family Clinic & Diagnostic Centre, Lajpat Nagar-1, Delhi. Phone: ${CLINIC_DATA.phoneDisplay}`,
        url: CLINIC_DATA.googleMapsUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(CLINIC_DATA.googleMapsUrl);
      alert("Clinic Google Maps location link copied to clipboard!");
    }
  };

  // Google Maps embed URL with exact coordinates: 28.5738475, 77.243183
  const mapEmbedUrl = `https://maps.google.com/maps?q=${CLINIC_DATA.coordinates.lat},${CLINIC_DATA.coordinates.lng}&z=16&output=embed`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F3] text-[#0B6768]">
            <MapPin className="w-3.5 h-3.5 text-[#159A9C]" />
            LOCATION &amp; CONTACT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B5D] tracking-tight">
            Visit the Clinic in Lajpat Nagar
          </h2>
          <p className="text-base sm:text-lg text-[#576F82]">
            Easily accessible in Krishna Market, near Rampul on Gurudwara Road, South Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Verified Contact Details & Hours Card */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-6">
              {/* Address Box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F6F3] text-[#159A9C] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#123B5D]">
                      {CLINIC_DATA.clinicName}
                    </h3>
                    <p className="text-xs font-semibold text-[#159A9C]">
                      Dr. Ashwani K Sarna (MBBS, MD Pediatrics)
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-700 pt-2 border-t border-slate-200">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#159A9C] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900">{CLINIC_DATA.address.line1}</p>
                      <p>{CLINIC_DATA.address.line2}</p>
                      <p className="text-xs text-[#0B6768] font-medium bg-[#E8F6F3] inline-block px-2 py-0.5 rounded mt-1">
                        Landmark: {CLINIC_DATA.address.landmark}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {CLINIC_DATA.address.city}, {CLINIC_DATA.address.state} — {CLINIC_DATA.address.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2">
                    <Phone className="w-4 h-4 text-[#159A9C] shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">Direct Clinic Line</span>
                      <a
                        href={`tel:${CLINIC_DATA.phone}`}
                        className="font-bold text-[#123B5D] hover:text-[#159A9C] text-base transition-colors"
                      >
                        {CLINIC_DATA.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Working Hours Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#123B5D] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#159A9C]" />
                    Verified Timings
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        clinicStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <span>{clinicStatus.message}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Monday – Saturday</span>
                    <div className="text-right">
                      <span className="block text-slate-700 font-medium">09:00 AM – 01:30 PM</span>
                      <span className="block text-slate-700 font-medium">05:00 PM – 09:00 PM</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-slate-800 block">Sunday</span>
                      <span className="text-[10px] text-amber-700">Morning Session Only</span>
                    </div>
                    <span className="text-slate-700 font-medium">10:00 AM – 01:00 PM</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic pt-1">
                  * Emergency cases and walk-ins are accommodated during consultation hours.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <a
                href={`tel:${CLINIC_DATA.phone}`}
                className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#123B5D] hover:bg-[#0B263D] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#159A9C]" />
                <span>Call Now</span>
              </a>

              <a
                href={CLINIC_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#123B5D] bg-[#E8F6F3] hover:bg-[#d8f0ec] flex items-center justify-center gap-2 transition-colors border border-[#159A9C]/30"
              >
                <Navigation className="w-4 h-4 text-[#159A9C]" />
                <span>Directions</span>
              </a>

              <button
                onClick={handleShare}
                className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed & Directions Guide */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-slate-100 rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-md flex-1 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[360px] w-full border border-slate-200 shadow-inner">
                <iframe
                  title="Dr. Ashwani K Sarna Family Clinic & Diagnostic Centre Google Maps Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Overlay Button */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10">
                  <a
                    href={CLINIC_DATA.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#123B5D] text-white shadow-lg hover:bg-[#0B263D] transition-all"
                  >
                    <Navigation className="w-4 h-4 text-[#159A9C]" />
                    <span>Open in Google Maps App</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  </a>
                </div>
              </div>

              {/* Landmark Guidance Strip */}
              <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs text-left text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#159A9C] shrink-0" />
                  <span>
                    <strong>Transit Tip:</strong> Located 5 minutes from Lajpat Nagar Metro Station (Violet &amp; Pink Lines), near Rampul bridge.
                  </span>
                </div>
                <button
                  onClick={onBookAppointment}
                  className="text-xs font-bold text-[#159A9C] hover:underline cursor-pointer shrink-0"
                >
                  Book Appointment &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
