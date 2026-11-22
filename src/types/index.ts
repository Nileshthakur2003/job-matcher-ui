export interface JobResponse {
  id: string;
  title: string;
  company: string;
  location: string;
  is_remote: boolean;
  role_type: string;
  skills: string[];
  description: string;
  apply_url: string;
  created_at: string;
}

export interface CandidateProfile {
  candidate_name?: string | null;
  target_roles: string[];
  skills: string[];
  preferred_locations: string[];
  is_remote_only: boolean;
  seniority_level: string;
  candidate_summary: string;
}

export interface JobMatchResult {
  job: JobResponse;
  match_score: number;
  dense_rank?: number | null;
  sparse_rank?: number | null;
  rrf_score?: number | null;
  matched_skills: string[];
  missing_skills: string[];
  explanation?: string | null;
}

export interface MatchResponse {
  candidate: CandidateProfile;
  total_found: number;
  matches: JobMatchResult[];
}

export interface HealthResponse {
  status: "healthy" | "warning" | "error";
  database: string;
  pgvector?: string;
  total_indexed_jobs?: number;
}
