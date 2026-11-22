import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI Job Matcher | Production RAG Engine",
  description:
    "Semantic resume job matching engine powered by PostgreSQL pgvector, OpenAI Structured Outputs, and Cross-Encoder Reranking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-slate-900 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {/* Background decorative glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        {children}

        <footer className="border-t border-slate-800 mt-20 py-8 text-center text-xs text-slate-500">
          <p>
            AI Job Matcher • Next.js App Router on Vercel + FastAPI Docker on Render + Supabase pgvector
          </p>
        </footer>
      </body>
    </html>
  );
}
