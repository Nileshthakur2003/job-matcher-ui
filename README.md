# AI Job Matcher — Next.js Frontend 🎨

Production-grade **Next.js 14 (App Router)** web application with **TypeScript** and **Tailwind CSS**, designed for zero-config deployment on **Vercel**.

---

## 🏗️ Next.js Traditional Project Architecture

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout, metadata & Plus Jakarta Sans font
│   │   ├── page.tsx            # Main interactive dashboard page
│   │   └── globals.css         # Tailwind CSS directives
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx          # Nav header with live backend status badge
│   │   ├── BackendModal.tsx    # Live backend API URL switcher
│   │   ├── ResumeUploader.tsx  # PDF Drag-and-Drop uploader & preferences input
│   │   ├── CandidateProfileCard.tsx # Extracted candidate summary & skills pills
│   │   ├── JobCard.tsx         # Ranked job cards with match %, skills & explanations
│   │   └── LoadingState.tsx    # Animated spinner & cold-start notice
│   │
│   ├── lib/                    # API client layer
│   │   └── api.ts              # Fetch client with health check & multipart upload
│   │
│   └── types/                  # TypeScript interface contracts
│       └── index.ts            # Pydantic-compatible TypeScript types
│
├── public/                     # Static assets
│   └── icon.svg
│
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript path alias configuration (@/*)
├── package.json                # Dependencies & scripts
├── .env.example                # Sample environment variables
├── .gitignore                  # Standard Next.js ignore rules
└── README.md                   # Documentation
```

---

## 🌐 Deploy to Vercel ($0 / Free Tier)

Vercel natively supports Next.js with **zero manual configuration**:

1. Push this `frontend` directory to a GitHub repository named `ai-job-matcher-frontend`:
   ```bash
   git add .
   git commit -m "Revise frontend to traditional Next.js structure"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) $\to$ **Add New...** $\to$ **Project**.
3. Import `ai-job-matcher-frontend`.
4. Vercel automatically detects Next.js, configures the build command (`next build`), and deploys!
5. Open your live URL (e.g. `https://ai-job-matcher-frontend.vercel.app`):
   - Click the **API: Auto** badge in the header.
   - Enter your live Render backend URL: `https://ai-job-matcher-backend.onrender.com`.
   - Your frontend will immediately connect to your FastAPI pgvector backend!

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
