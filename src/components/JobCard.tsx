"use client";

import React from "react";
import { Activity, ExternalLink, Lightbulb } from "lucide-react";
import { JobMatchResult } from "@/types";

interface JobCardProps {
  result: JobMatchResult;
  index: number;
}

export const JobCard: React.FC<JobCardProps> = ({ result, index }) => {
  const { job, match_score, matched_skills, missing_skills, explanation, rrf_score } = result;
  const scorePercent = Math.round(match_score);

  return (
    <div className="bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition rounded-xl p-5 shadow-lg backdrop-blur-sm space-y-3.5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">
              #{index + 1}
            </span>
            <h3 className="font-bold text-base text-white hover:text-indigo-300 transition">
              {job.title}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
            <span className="font-semibold text-slate-300">{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
            {job.is_remote && (
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                Remote
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/40 capitalize">
              {job.role_type}
            </span>
          </div>
        </div>

        {/* Score Badge */}
        <div className="shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>{scorePercent}% Match</span>
          </div>
        </div>
      </div>

      {/* Explanation Callout */}
      {explanation && (
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-3 text-xs text-indigo-200 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-indigo-100">Why you match: </strong>
            {explanation}
          </div>
        </div>
      )}

      {/* Skill Overlaps */}
      <div className="pt-1">
        <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
          SKILL OVERLAP:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {matched_skills.map((skill, idx) => (
            <span
              key={`match-${idx}`}
              className="px-2 py-0.5 rounded text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium"
            >
              ✓ {skill}
            </span>
          ))}
          {missing_skills.map((skill, idx) => (
            <span
              key={`missing-${idx}`}
              className="px-2 py-0.5 rounded text-xs bg-slate-700/50 text-slate-400 border border-slate-600/30"
            >
              + {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-700/50">
        <span className="text-xs text-slate-500">
          RRF Score: {rrf_score ? rrf_score.toFixed(4) : "N/A"}
        </span>
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
        >
          <span>Apply Now</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
