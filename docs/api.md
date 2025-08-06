# 📘 API Documentation – Resume Matcher Backend

## 🌐 Base URL
http://localhost:5000/api


---

## ✅ Health Check – `/health`

**Method:** `GET`  
**Endpoint:** `/api/health`  
**Description:** Checks if the backend server is up and running.

### 🔸 Request

http
GET /api/health

### 🔸 Response

{
  "status": "ok",
  "uptime": "752.8788478"
  "timestamp": "2025-08-06T19:51:00Z"
}

----

📤 Upload Resume – /upload-resume
Method: POST
Endpoint: /api/upload-resume
Description: Uploads a resume file and returns the extracted text content.

### 🔸 Request

Headers:
Content-Type: multipart/form-data

Form Data:
1) resume ---> file
2) job_description ---> normal text

### 🔸 Sample Request

POST /api/upload-resume

### 🔸 Sample Response

{
    "success": true,
    "message": "...",
    "data":{
        {
        "jd_confidence": 0.92,
        "fit_score": 78.5,
        "job_keywords": [
            "React",
            "Node.js",
            "REST API",
            "MongoDB",
            "TypeScript"
        ],
        "resume_keywords": [
            "React",
            "JavaScript",
            "Node.js",
            "MongoDB"
        ],
        "matched_skills": [
            "React",
            "Node.js",
            "MongoDB"
        ],
        "missing_skills": [
            "REST API",
            "TypeScript"
        ],
        "jd_role_prediction": "Full Stack Developer",
        "recommendations": [
            "Consider adding experience with REST API design and integration.",
            "Mention any work involving TypeScript to improve alignment.",
            "Highlight full-stack projects to match JD expectations more closely."
        ],
        "experience_years": 2,
        "parsed_resume_text": "Frontend developer with 2 years of experience using React and Node.js...",
        "parsed_jd_text": "We are hiring a full stack developer skilled in React, Node.js, REST APIs, MongoDB, and TypeScript..."
        }

    }
}

----

Job Recommendations – /job-recommendations
Method: POST
Endpoint: /api/job-recommendations
Description: Returns a list of job recommendations based on user query and experience level.

### 🔸 Request Body

{
  "resume_keywords": ["github", "...."],
  "experience_years": 5
}

### 🔸 Response

{  
  "success": true,
  "message": "...",
  "data": [
    {
      "title": "Frontend Developer",
      "company": "TechCorp",
      "description": "Role description...",
      "link": "https://www.linkedin.com/jobs/view/123",
      "match_score": 45.67,
      "matched_keywords": ["github", "ec2"],
      "missing_keywords": ["lambda"]
    }
  ]
}

----

✍️ Rewrite Resume – /rewrite-resume
Method: POST
Endpoint: /api/rewrite-resume
Description: Rewrites a resume to better align with a job description and missing skill fields using LLM (Groq API).

### 🔸 Sample Request

{
  "resume_text": "Frontend developer with 2 years of experience in React...",
  "jd_text": "We are hiring a full stack developer with experience in Next.js, SSR, TailwindCSS...",
  "missing_fields": ["Next.js", "SSR", "TailwindCSS"]
}

### 🔸 Sample Response

{
  "success": true,
  "message": "...",
  "data":{
    "rewritten_resume_txt": "Frontend developer with 2 years of experience in React and TailwindCSS. Recently worked on SSR with Next.js to improve performance..."
  }
}

------