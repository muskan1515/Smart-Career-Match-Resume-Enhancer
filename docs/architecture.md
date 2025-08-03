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

---

## 🧭 High-Level Architecture Diagram

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


---

## 🧠 Key Features & Flow

1. **User uploads Resume + Job Description via UI**
2. Node.js backend:
   - Parses resume (PDF → JSON)
   - Sends JD + Resume to AI microservice
3. AI microservice:
   - Converts JD + Resume to embeddings
   - Compares vectors → similarity + skill gaps
   - Uses FAISS for fast matching
4. Backend:
   - Saves results in MongoDB
   - Fetches LinkedIn roles via scraping (Puppeteer or SerpAPI)
5. Frontend:
   - Displays matched skills, missing ones, suggestions
   - Job suggestions
   - Option to download improved resume or skill report

---

## 🧪 AI/ML Layer

| Task                         | Tech Used                     |
|------------------------------|-------------------------------|
| Resume & JD Parsing          | `pdfplumber`, `PyMuPDF`       |
| Embedding Generation         | `OpenAI Embeddings (text-embedding-ada-002)` |
| Vector Matching              | `FAISS`                       |
| Recommendations              | `Scikit-learn` + keyword rank |
| LinkedIn Role Suggestions    | Puppeteer / SerpAPI           |

---

## ☁️ Friendly Services

| Component         | Free Tier Option           |
|-------------------|----------------------------|
| MongoDB           | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| Redis             | [Upstash Redis](https://upstash.com/) |
| Resume Upload     | [Cloudinary](https://cloudinary.com/) or [S3 Free Tier](https://aws.amazon.com/s3/) |
| AI API            | [OpenAI (Free Credit)](https://platform.openai.com/account/usage) |
| Frontend Hosting  | [Vercel (Free)](https://vercel.com) |
| Backend Hosting   | [EC2 t2.micro (Free for 12 months)](https://aws.amazon.com/ec2/) |
| AI Service Host   | [Hugging Face Spaces (Free)](https://huggingface.co/spaces) / [Render](https://render.com/) |

---

## 📂 Folder Structure

/frontend → Next.js App (Vercel)
/backend → Node.js Express App (EC2)
/ai_service → Python FastAPI AI engine (FAISS, OpenAI)
/docs → architecture.md, api.md, README.md, system_design.drawio



---

## 🚀 Roadmap & Steps to Complete This Project

### 🔹 Phase 1: Design & Setup
- [ ] Draft `architecture.md`, `README.md`
- [ ] Set up GitHub repo with folders: `/frontend`, `/backend`, `/ai_service`, `/docs`
- [ ] Create mock UI on Next.js with Resume + JD upload

### 🔹 Phase 2: Backend & AI Service
- [ ] Build Express.js REST API: `/upload-resume`, `/analyze`, `/recommend-roles`
- [ ] Setup MongoDB Atlas DB
- [ ] Create FastAPI service:
  - Embed text via OpenAI
  - Use FAISS for similarity
  - Return skill gaps + score

### 🔹 Phase 3: Integrate Frontend
- [ ] Connect frontend to backend using Axios
- [ ] Display skill match score, missing skills, suggestions
- [ ] Add LinkedIn job fetching via API/scraping

### 🔹 Phase 4: Polish & Deploy
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to EC2 (Ubuntu + Nginx + PM2)
- [ ] Deploy AI microservice to Render/HF Spaces
- [ ] Use Upstash Redis if caching needed

### 🔹 Phase 5: Documentation & Showcase
- [ ] Write `api.md` for all backend endpoints
- [ ] Add `system_design.md` with diagrams (draw.io or Excalidraw)
- [ ] Record short demo video
- [ ] Publish on LinkedIn + Resume

---

## 🧾 Future Enhancements

- [ ] Add login using Clerk/Auth0
- [ ] Skill-based resume auto-generator
- [ ] Dashboard with analytics (how many JDs matched, trends, etc.)
- [ ] GPT-4 generated bullet points / resume rewrites

---

## 📘 Learnings Showcase (To Add in README)

- Semantic Search with OpenAI + FAISS
- Resume Parsing with PDF to JSON
- Node.js scalable API architecture
- AI + Full-stack integration
- MongoDB + Redis as scalable data layer
- Cloud deployment: Vercel + EC2

---

## 📎 License & Credits
- OpenAI Embeddings API
- FAISS (Facebook AI Similarity Search)
- MongoDB Atlas
- Redis Upstash
