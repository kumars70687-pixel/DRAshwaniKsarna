import React, { useState } from "react";
import { X, Upload, Check, RefreshCw, Info, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { CLINIC_DATA } from "../data/clinicData";

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePhoto: (photoId: string, newUrl: string) => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  onUpdatePhoto
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>("chamber");
  const [customUrl, setCustomUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  if (!isOpen) return null;

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    onUpdatePhoto(selectedSlot, customUrl.trim());
    setFeedback("Custom image applied successfully to preview!");
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdatePhoto(selectedSlot, dataUrl);
        setFeedback("Uploaded image preview applied!");
        setTimeout(() => setFeedback(""), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onUpdatePhoto("chamber", CLINIC_DATA.images.mapsAuthenticConsultationDesk);
    setFeedback("Reset to verified Google Maps listing photograph.");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F6F3] text-[#159A9C] flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#123B5D]">
                Clinic Photo &amp; Portrait Manager
              </h3>
              <p className="text-xs text-slate-500">
                Easy customization for clinic owners &amp; administrators
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Guidance */}
        <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-start gap-2 text-[#123B5D] font-semibold">
            <Info className="w-4 h-4 text-[#159A9C] shrink-0 mt-0.5" />
            <span>How Photographs Are Stored in Code:</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            The authentic Google Maps photo is stored at:
            <code className="mx-1 px-1.5 py-0.5 bg-slate-200/80 rounded text-slate-800 font-mono text-[11px]">
              /public/images/dr_sarna_consultation_desk.jpg
            </code>
            and referenced in <code className="mx-1 px-1.5 py-0.5 bg-slate-200/80 rounded text-slate-800 font-mono text-[11px]">src/data/clinicData.ts</code>.
          </p>
          <p className="text-slate-500">
            You can also test new high-resolution photos right now by pasting a public web URL or uploading an image file below:
          </p>
        </div>

        {/* Slot Selection */}
        <div className="space-y-3 mb-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Photo Slot to Replace:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "chamber", label: "Consultation Chamber & Desk" },
              { id: "exterior", label: "Clinic Exterior / Reception" },
              { id: "diagnostics", label: "Diagnostic & Lab Area" },
              { id: "portrait", label: "Doctor Formal Portrait" }
            ].map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlot(slot.id)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                  selectedSlot === slot.id
                    ? "bg-[#123B5D] text-white border-[#123B5D] shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>

        {/* Paste URL Form */}
        <form onSubmit={handleApplyUrl} className="space-y-3 mb-4">
          <label className="block text-xs font-bold text-slate-700">
            Paste Direct Image URL:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/clinic-photo.jpg"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#159A9C]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#159A9C] hover:bg-[#0F787A] text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
            >
              Apply URL
            </button>
          </div>
        </form>

        {/* File Upload Option */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Or Upload Image from Device:
          </label>
          <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-[#159A9C] rounded-xl cursor-pointer text-xs font-medium text-slate-600 bg-slate-50 hover:bg-[#E8F6F3]/50 transition-colors">
            <Upload className="w-4 h-4 text-[#159A9C]" />
            <span>Select file (PNG, JPG, WebP)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2 border border-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Original Maps Photo</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
