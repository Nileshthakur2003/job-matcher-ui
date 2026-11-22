"use client";

import React from "react";
import { Cpu } from "lucide-react";

export const LoadingState: React.FC = () => {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="inline-block relative w-16 h-16">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white">
        Running Hybrid RAG Matching...
      </h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
        Extracting resume structure via LLM, calculating pgvector cosine distance,
        querying full-text GIN index, and reranking matches.
      </p>
      <div className="text-xs text-amber-300/80 bg-amber-950/30 border border-amber-500/20 rounded-lg p-2.5 max-w-sm mx-auto">
        ⏳ Note: If using Render Free Tier, the instance may take ~30s on cold
        start if dormant.
      </div>
    </div>
  );
};
