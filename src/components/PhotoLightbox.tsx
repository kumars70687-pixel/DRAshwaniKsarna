import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, Download } from "lucide-react";

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: string;
  isAuthenticMaps: boolean;
  caption: string;
  verificationDetails: string;
}

interface PhotoLightboxProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!photo) return;
      const currentIndex = photos.findIndex((p) => p.id === photo.id);
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, photos, onClose, onNavigate]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-wide text-slate-300">
            {currentIndex + 1} of {photos.length}
          </span>
          {photo.isAuthenticMaps ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Google Maps Listing Photo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Replaceable Clinic Placeholder
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close photo viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4 overflow-hidden">
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-h-[70vh] flex items-center justify-center">
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>

        {currentIndex < photos.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption Bar */}
      <div className="max-w-4xl mx-auto w-full text-center text-white space-y-1.5 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold text-white">{photo.title}</h3>
        <p className="text-xs sm:text-sm text-slate-300">{photo.caption}</p>
        <p className="text-[11px] text-slate-400 italic">{photo.verificationDetails}</p>
      </div>
    </div>
  );
};
