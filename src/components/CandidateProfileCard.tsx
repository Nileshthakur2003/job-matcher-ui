"use client";

import React from "react";
import { UserCheck } from "lucide-react";
import { CandidateProfile } from "@/types";

interface CandidateProfileCardProps {
  profile: CandidateProfile;
}

export const CandidateProfileCard: React.FC<CandidateProfileCardProps> = ({
  profile,
}) => {
  return (
    <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {profile.candidate_name || "Extracted Candidate Profile"}
            </h2>
            <p className="text-xs text-indigo-300">
              Target: {profile.target_roles.join(", ") || "Software Engineer"}
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
          {profile.seniority_level || "Mid"}
        </div>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {profile.candidate_summary}
      </p>

      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Identified Skills:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
