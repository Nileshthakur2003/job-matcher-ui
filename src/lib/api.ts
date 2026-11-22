import { HealthResponse, MatchResponse } from "@/types";

const STORAGE_KEY = "AI_JOB_MATCHER_API_URL";

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim()) {
      return stored.trim().replace(/\/+$/, "");
    }
  }
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return "";
}

export function setApiBaseUrl(url: string): void {
  if (typeof window !== "undefined") {
    if (!url || !url.trim()) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, url.trim().replace(/\/+$/, ""));
    }
  }
}

export async function checkBackendHealth(): Promise<HealthResponse> {
  const base = getApiBaseUrl();
  const url = `${base}/api/health`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    clearTimeout(timeoutId);
    throw new Error(err.message || "Failed to reach backend");
  }
}

export async function submitResumeMatch(
  file: File,
  preferences?: string
): Promise<MatchResponse> {
  const base = getApiBaseUrl();
  const url = `${base}/api/match`;

  const formData = new FormData();
  formData.append("resume", file);
  if (preferences && preferences.trim()) {
    formData.append("preferences", preferences.trim());
  }

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let detail = "Error processing resume match.";
    try {
      const err = await res.json();
      detail = err.detail || detail;
    } catch {}
    throw new Error(detail);
  }

  return await res.json();
}
