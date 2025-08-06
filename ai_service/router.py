from fastapi import APIRouter
from pydantic import BaseModel
from embedding import get_embedding 
from resume_match_engine import match_resumes
from resume_rewrite_service import rewrite_resume_with_groq

router = APIRouter()

class AnalyzeRequest(BaseModel):
    resume: str
    job_description: str

@router.post("/analyze")
def analyze_resume(req: AnalyzeRequest):
    resume_emb = get_embedding(req.resume)
    jd_emb = get_embedding(req.job_description)

    ## Match the JD and Resume and return final info 
    result = match_resumes(resume_emb, jd_emb, resume_text= req.resume, jd_text= req.job_description) 
    return result 

class RewriteResumeRequest(BaseModel):
    resume_text: str
    jd_text: str
    missing_skills: list[str]

@router.post("/rewrite-resume")
def rewrite_resume_to_jd(req: RewriteResumeRequest):
    return rewrite_resume_with_groq(req.resume_text, req.jd_text, req.missing_skills)