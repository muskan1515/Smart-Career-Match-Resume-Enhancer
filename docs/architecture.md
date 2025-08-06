# 🧠 Smart Career Match & Resume Enhancer - System Architecture

## 🔍 Project Overview
This AI-powered platform helps users upload their resume and a job description (JD), and returns:
- Matched insights: missing skills, strong points
- Resume enhancement suggestions
- Job role recommendations via LinkedIn scraping
- Resume vs JD similarity score
- Smart UI showing skill gaps and match %

---

## 📦 Tech Stack

```
| Layer         | Tech Stack                      |
|---------------|----------------------------------|
| Frontend      | Next.js (TypeScript), TailwindCSS |
| Backend API   | Node.js + Express.js (REST APIs) |
| AI Microservice | Python (FastAPI) + FAISS + OpenAI API |
| Database      | MongoDB Atlas (Free Tier)        |
| Caching/Queue | Redis (Upstash Free Tier)        |
| Hosting       | Vercel (Frontend), EC2 (Backend), Render/HF Spaces (AI) |
| File Storage  | Cloudinary / AWS S3 (Resume Uploads) |
| Auth (optional) | Clerk.dev or Auth0 (Free Tier) |
```

---

## 🧭 High-Level Architecture Diagram

```
┌──────────────┐        ┌──────────────────────┐        ┌───────────────────────────┐
│  Next.js UI  │ <────> │  Node.js (Express)   │ <────> │  AI Microservice (Python) │
│ (Vercel)     │        │  (EC2/Render/Fly.io) │        │  OpenAI + FAISS + VectorDB│
└────┬─────────┘        └────────┬─────────────┘        └────────┬──────────────────┘
     │                           │                                 │
     │                           │                                 ↓
     │                           │                        ┌────────────────┐
     │                           └──────────────────────> │  MongoDB Atlas │
     │                                                    └────────────────┘
     ↓
[Resume Upload + JD Input]
```

---

## 🧠 Key Features & Flow

1. **User uploads Resume + Job Description via UI**

### ✅ Backend Flow Enhancements
1. 🔄 **Accepted Resume + JD via API**
   - Form: `multipart/form-data`
   - Endpoint parses files and sends content to AI service

2. 🧠 **AI Microservice Core Enhancements**
   - **Resume & JD Parsing:** done using `pdfplumber` / `PyMuPDF`
   - **Embeddings:** `OpenAI text-embedding-ada-002`
   - **Similarity Matching:**
     - Used `FAISS IndexFlatL2` for fast semantic matching
     - Calculated **Cosine Similarity** score using `sklearn.metrics.pairwise.cosine_similarity`
   - **Keyword & Skill Extraction:**
     - NLP with `spaCy` (`en_core_web_sm`)
     - Extracted `NOUN`, `PROPN` keywords from both resume and JD
     - Skills matched against `skills.txt` (all skills included)
   - **Role Classification (Zero-shot):**
     - Used `transformers.pipeline("zero-shot-classification")`
     - Model: `facebook/bart-large-mnli`
     - Predicted role (e.g., "Data Scientist") with confidence score
   - **Recommendations:**
     - Based on similarity score, matched skills, missing skills, and intent
     - Generated human-friendly suggestions using `get_recommendation()`

3. 📦 **Output Structure Returned**
   ```json
   {
     "fit_score": 87.23,
     "jd_role_prediction": "Backend Developer",
     "jd_confidence": 0.92,
     "matched_skills": ["node.js", "docker", "mongodb"],
     "missing_skills": ["kubernetes", "aws"],
     "resume_keywords": ["node.js", "api", "mongo", "express"],
     "job_keywords": ["aws", "kubernetes", "node.js", "api"],
     "recommendations": [
       "You're on the right track. Try refining your projects or experience sections.",
       "Consider adding these skills: kubernetes, aws",
       "Add more examples/projects that highlight: node.js, docker, mongodb",
       "Make sure your resume aligns with the 'Backend Developer' role expectations."
     ]
   }

---

## 🧪 AI/ML Layer

### 🧠 AI/ML Layer Enhancements

```
| Task                         | Tech Used                                                                 |
|------------------------------|---------------------------------------------------------------------------|
| Resume & JD Parsing          | `pdfplumber`, `PyMuPDF`, `spaCy`                                         |
| Embedding Generation         | `OpenAI Embeddings (text-embedding-ada-002)`                             |
| Vector Indexing              | `FAISS` (`IndexFlatL2`)                                                  |
| Similarity Calculation       | `cosine_similarity` (`scikit-learn`)                                     |
| Role Classification          | `transformers.pipeline` – `facebook/bart-large-mnli` (Zero-Shot)         |
| Keyword Extraction           | `spaCy` noun/proper noun filtering                                       |
| Skill Matching               | Custom matcher using curated `skills.txt` with spaCy                     |
| Fit Score Calculation        | Custom cosine + FAISS match score (`match_score`)                        |
| Recommendations              | Custom rules based on score + missing/matched skills                     |
| LinkedIn Role Suggestions    | `Puppeteer` / `SerpAPI` (scraping & job fetching, later phase) 
```

---

## 📂 Folder Structure

```
/frontend → Next.js App (Vercel)
/backend → Node.js Express App (EC2)
/ai_service → Python FastAPI AI engine (FAISS, OpenAI)
/docs → architecture.md, api.md, README.md, system_design.drawio
```


---
