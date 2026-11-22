"use client";

import React, { useRef, useState } from "react";
import { FileUp, SlidersHorizontal, Sparkles, CheckCircle2 } from "lucide-react";

interface ResumeUploaderProps {
  onSubmit: (file: File, preferences: string) => void;
  isLoading: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preferences, setPreferences] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setSelectedFile(file);
      } else {
        alert("Please upload a PDF document.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select your PDF resume first!");
      return;
    }
    onSubmit(selectedFile, preferences);
  };

  return (
    <section className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm mb-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Drag & Drop Zone */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Resume PDF
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors group ${
              isDragging
                ? "border-indigo-400 bg-indigo-950/20"
                : selectedFile
                ? "border-emerald-500/50 bg-emerald-950/10"
                : "border-slate-600 hover:border-indigo-400 bg-slate-900/40"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110 ${
                  selectedFile
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                }`}
              >
                {selectedFile ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <FileUp className="w-6 h-6" />
                )}
              </div>
              <div className="text-sm font-medium text-slate-200">
                {selectedFile ? (
                  <span className="text-emerald-400 font-mono font-semibold">
                    ✓ {selectedFile.name} (
                    {(selectedFile.size / 1024).toFixed(0)} KB)
                  </span>
                ) : (
                  <span>
                    Drop your PDF resume here, or{" "}
                    <span className="text-indigo-400 underline">browse</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Standard PDF formats accepted (Max 10MB)
              </p>
            </div>
          </div>
        </div>

        {/* Preferences input */}
        <div>
          <label
            htmlFor="preferences"
            className="block text-sm font-semibold text-slate-200 mb-2"
          >
            Target Preferences (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              id="preferences"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g. 'Looking for remote AI/Python internships or junior backend roles'"
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <div className="absolute right-3.5 top-3.5 text-slate-500">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isLoading ? "Processing..." : "Analyze & Match Jobs"}</span>
        </button>
      </form>
    </section>
  );
};
