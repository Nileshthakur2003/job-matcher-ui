"use client";

import React, { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";
import { getApiBaseUrl, setApiBaseUrl } from "@/lib/api";

interface BackendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const BackendModal: React.FC<BackendModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      setUrl(getApiBaseUrl());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiBaseUrl(url);
    onSave();
    onClose();
  };

  const handleReset = () => {
    setApiBaseUrl("");
    setUrl("");
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-400" />
            <span>Configure Backend URL</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          When deploying this Next.js frontend on Vercel and your backend on
          Render or Hugging Face, enter your live backend URL below:
        </p>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Backend Origin URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ai-job-matcher-backend.onrender.com"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <span className="text-[11px] text-slate-500 block mt-1.5">
            Leave empty to use same-origin relative path (<code>/api</code>).
          </span>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
          >
            Reset (Default)
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition"
          >
            Save & Re-test
          </button>
        </div>
      </div>
    </div>
  );
};
