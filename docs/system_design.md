# 🧠 AI-Powered Resume Matcher & Recommendation System – System Design

## ✨ Overview

An intelligent system that helps users:
- Match their resume with a job description (JD)
- Get insights such as matched/missing skills, confidence, role prediction
- Receive job recommendations in real-time
- Download an AI-enhanced updated resume

---

## 🖼️ High-Level Architecture

text
+-------------------+       /upload-resume        +---------------------+
|  React Frontend   | ─────────────────────────▶ | FastAPI Backend     |
|                   |                            | /ai/analyze         |
+-------------------+                            +----------+----------+
                                                             |
                                                             ▼
                                                  +-----------------------+
                                                  | Resume Parsing Engine |
                                                  +----------+------------+
                                                             |
                                                             ▼
                                          +----------------------------------+
                                          | Sentence Embeddings (MiniLM-L6) |
                                          | + Redis Cache                   |
                                          +----------+-----------------------+
                                                     |
                                                     ▼
                                      +------------------------------------------+
                                      | Resume Match Engine (FAISS Semantic L2) |
                                      +----------------+-------------------------+
                                                       |
                                                       ▼
                                ┌────────────────────────────────────────────────────┐
                                │                Match Result JSON                    │
                                │ ─────────────────────────────────────────────────── │
                                │ {                                                  │
                                │   fit_score, jd_confidence,                        │
                                │   matched_skills, missing_skills,                 │
                                │   resume_keywords, job_keywords,                  │
                                │   recommendations, experience_years,              │
                                │   parsed_resume_text, parsed_jd_text              │
                                │ }                                                  │
                                └────────────────────────────────────────────────────┘
                                                       |
                                                       ▼
                                       +-------------------------------+
                                       | resumeController → Frontend  |
                                       +-------------------------------+


## 🔁 Flow Breakdown
1. Resume Upload & Matching Flow
Route: POST /upload-resume

### ✅ Frontend takes:

Resume (PDF/DOCX)

Job Description (JD Text)

### ✅ Backend:

Parses resume text

Embeds JD and Resume text using all-MiniLM-L6-v2

Uses Redis cache to avoid redundant embedding

Passes data to resume_match_engine.py:

Uses FAISS Flat L2 for semantic similarity

Computes:

fit_score

matched_skills, missing_skills

resume_keywords, job_keywords

role_prediction, confidence

experience_years

Final result returned via resumeController


### 📦 Sample Response:
export interface MatchResult {
  jd_confidence: number;
  fit_score: number;
  job_keywords: string[];
  resume_keywords: string[];
  matched_skills: string[];
  missing_skills: string[];
  jd_role_prediction: string;
  recommendations: string[];
  experience_years: number;
  parsed_resume_text: string;
  parsed_jd_text: string;
}


2. Job Recommendation Flow
### Route: POST /job-recommendations

### Input:
  resume_keywords: string[]
  experience_years: number

[ resume_keywords[] ] + [ experience_years ]
         ↓
 ┌─────────────────────────────┐
 │     Job Scraper Service     │  ← Puppeteer or SerpAPI
 └─────────────────────────────┘
         ↓
┌──────────────────────────────┐
│     Match Scoring Engine     │  ← keyword overlap + exp filter
└──────────────────────────────┘
         ↓
┌──────────────────────────────┐
│     Recommendation Engine    │  ← Top 5 scored & aligned jobs
└──────────────────────────────┘
         ↓
        JSON

3. Resume Rewrite Flow
### Route: POST /rewrite-resume

{
  "resume_text": "...",
  "jd_text": "...",
  "missing_fields": [...]
}


### Flow:

Controller: rewriteResumeController

Service: rewrite_resume_engine.py

Uses Groq API + OpenAI GPT

Constructs prompt using:

Resume text

JD text

Missing fields

Generates enhanced resume

Returns: Updated Resume Text (Plaintext/JSON)

### Frontend: triggers download of the rewritten resume automatically.

--

## 💡 AI / NLP Modules

| Module                     | Description                        | Tech Used                   |
| -------------------------- | ---------------------------------- | --------------------------- |
| `embedding.py`             | Generates sentence embeddings      | `all-MiniLM-L6-v2`   |
| `resume_match_engine.py`   | Matches JD and Resume semantically | FAISS Flat L2, text parsing |
| `rewrite_resume_engine.py` | Rewrite resume using context       | OpenAI GPT (via Groq API)   |
| `job_scraper.py`           | Real-time job scraping             | Puppeteer          |


----


## 📊 Frontend (React)
File Upload UI (Resume, JD Text)

Insights UI:

Fit Score Progress Bar

Matched/Missing Skills Badges

Download Updated Resume Button

Recommendations Modal:

Top 5 Real-Time Scraped Jobs

Clean modern UX with Tailwind UI


-----

## 🔐 Tech Stack


| Layer       | Tech                       |
| ----------- | -------------------------- |
| Frontend    | React + Tailwind CSS       |
| Backend     | FastAPI                    |
| NLP         | Sentence Transformers, GPT |
| Semantic DB | FAISS (Flat L2)            |
| Caching     | Redis                      |
| Scraping    | Puppeteer or SerpAPI       |
| Cloud/API   | Groq + OpenAI Chat API     |


## ✅ APIs Summary

| Route                  | Method | Description                            |
| ---------------------- | ------ | -------------------------------------- |
| `/upload-resume`       | POST   | Upload Resume & JD, get match insights |
| `/job-recommendations` | POST   | Get real-time job suggestions          |
| `/rewrite-resume`      | POST   | AI-enhanced resume rewrite             |
| `/health`              | POST   | to check the server health             |



------

## 🧠 Diagram Summary
[React Frontend]
    ↓ Upload Resume & JD
[FastAPI Backend]
    ↓
[Embedding Engine] ────── Redis Cache
    ↓
[Match Engine (FAISS)]
    ↓
[Match Result JSON] ──→ Frontend

[Job Recommendation Flow]
    ↓ resume_keywords + exp
[Job Scraper → Match Score → Top 5]
    ↓
[Recommendation Modal]

[Resume Rewrite Flow]
    ↓ resume_text + jd_text + missing_fields
[Groq GPT Engine]
    ↓
[Updated Resume → Auto Download]
