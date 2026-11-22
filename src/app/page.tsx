"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { BackendModal } from "@/components/BackendModal";
import { ResumeUploader } from "@/components/ResumeUploader";
import { LoadingState } from "@/components/LoadingState";
import { CandidateProfileCard } from "@/components/CandidateProfileCard";
import { JobCard } from "@/components/JobCard";
import { checkBackendHealth, getApiBaseUrl, submitResumeMatch } from "@/lib/api";
import { HealthResponse, MatchResponse } from "@/types";

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isHealthChecking, setIsHealthChecking] = useState(true);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [apiLabel, setApiLabel] = useState("API: Auto");

  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState<MatchResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const refreshHealth = async () => {
    setIsHealthChecking(true);
    try {
      const data = await checkBackendHealth();
      setHealth(data);
    } catch {
      setHealth(null);
    } finally {
      setIsHealthChecking(false);
      updateLabel();
    }
  };

  const updateLabel = () => {
    const base = getApiBaseUrl();
    if (base) {
      try {
        const parsed = new URL(base);
        setApiLabel(`API: ${parsed.hostname}`);
      } catch {
        setApiLabel("API: Custom");
      }
    } else {
      setApiLabel("API: Same-Origin");
    }
  };

  useEffect(() => {
    refreshHealth();
  }, []);

  const handleResumeSubmit = async (file: File, preferences: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setMatchData(null);

    try {
      const result = await submitResumeMatch(file, preferences);
      setMatchData(result);
    } catch (err: any) {
      setErrorMsg(
        err.message ||
          "Failed to match resume. If using Render free tier, the backend might be waking up."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        health={health}
        isHealthChecking={isHealthChecking}
        onOpenConfig={() => setIsConfigOpen(true)}
        apiLabel={apiLabel}
      />

      <BackendModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSave={refreshHealth}
      />

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Find Jobs That Match Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Exact Engineering Profile
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Upload your PDF resume. Our pipeline extracts your skills with
            structured LLM parsing, searches via pgvector & BM25 hybrid fusion,
            and reranks matches with cross-encoders.
          </p>
        </div>

        {/* Upload Form */}
        <ResumeUploader onSubmit={handleResumeSubmit} isLoading={isLoading} />

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-8 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs underline text-rose-300 ml-4 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && <LoadingState />}

        {/* Results Section */}
        {matchData && (
          <section className="space-y-8 animate-in fade-in duration-300">
            {/* Extracted Profile */}
            <CandidateProfileCard profile={matchData.candidate} />

            {/* Ranked Job Matches */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Top Recommended Matches</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {matchData.matches.length} jobs
                  </span>
                </h2>
                <span className="text-xs text-slate-400">
                  Ranked by Cross-Encoder
                </span>
              </div>

              <div className="space-y-4">
                {matchData.matches.map((match, idx) => (
                  <JobCard key={match.job.id || idx} result={match} index={idx} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
