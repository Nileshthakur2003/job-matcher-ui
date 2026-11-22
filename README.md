# AI Job Matcher — Frontend UI 🎨

Sleek, responsive web application for **AI Job Matcher**, built for instant zero-config deployment on **Vercel**.

---

## ✨ Features

- **Drag-and-Drop PDF Uploader:** Upload resume PDFs with instant validation.
- **Natural Language Preferences:** Filter by remote roles, internships, or specific technologies.
- **Dynamic Backend Switcher:** Point this frontend to any backend URL (e.g., Render, Hugging Face, or localhost) with automatic `localStorage` persistence.
- **Candidate Profile Visualizer:** Displays extracted target roles, seniority level, summary, and detected skills.
- **Ranked Job Cards:** Displays match percentage, matched vs missing skills, and a personalized 1-sentence fit explanation for the top jobs.

---

## 🌐 Deploy to Vercel ($0 / Free Tier)

1. Create a new GitHub repository named `ai-job-matcher-frontend` and push the contents of this folder.
2. In [vercel.com](https://vercel.com), click **Add New...** $\to$ **Project**.
3. Import your `ai-job-matcher-frontend` repository.
4. Keep the default settings and click **Deploy**.
5. Once deployed:
   - Open your live Vercel URL (e.g., `https://ai-job-matcher.vercel.app`).
   - Click the **API: Auto** badge in the header.
   - Enter your live Render backend URL: `https://your-service.onrender.com`.
   - The status badge will turn green: `pgvector connected`!

---

## 💻 Local Preview

You can preview locally using any static HTTP server or Python:

```bash
# Using Python
python -m http.server 3000

# Or using npx
npx serve .
```

Open [http://localhost:3000](http://localhost:3000).
