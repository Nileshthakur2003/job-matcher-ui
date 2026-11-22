"use client";

import React from "react";
import { Sparkles, Server } from "lucide-react";
import { HealthResponse } from "@/types";

interface HeaderProps {
  health: HealthResponse | null;
  isHealthChecking: boolean;
  onOpenConfig: () => void;
  apiLabel: string;
}

export const Header: React.FC<HeaderProps> = ({
  health,
  isHealthChecking,
  onOpenConfig,
  apiLabel,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              AI Job Matcher
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Next.js & pgvector
            </span>
          </div>
        </div>

        {/* Backend Controls & Health */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenConfig}
            title="Configure Backend API URL"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
          >
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span>{apiLabel}</span>
          </button>

          <div
            className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition ${
              isHealthChecking
                ? "bg-slate-800 border-slate-700 text-slate-400"
                : health?.status === "healthy"
                ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
                : "bg-rose-950/60 border-rose-500/30 text-rose-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isHealthChecking
                  ? "bg-amber-400 animate-pulse"
                  : health?.status === "healthy"
                  ? "bg-emerald-400"
                  : "bg-rose-400"
              }`}
            />
            <span>
              {isHealthChecking
                ? "Checking DB..."
                : health?.status === "healthy"
                ? `pgvector connected (${health.total_indexed_jobs || 0} jobs)`
                : "Backend Offline / Sleeping"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
