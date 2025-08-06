import faiss
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import spacy
from transformers import pipeline
from resume_final_score import match_score, extract_keywords, get_recommendation, extract_experience


# Load models once
nlp = spacy.load("en_core_web_sm")
zero_shot = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

CANDIDATE_LABELS = ["Data Scientist", "Machine Learning Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer"]

# Load master skill list
with open("skills.txt", "r") as file:
    SKILL_LIST = [line.strip().lower() for line in file if line.strip()]

def extract_skills(text):
    doc = nlp(text)
    words = [
        token.text.lower()
        for token in doc
        if token.pos_ in ["NOUN", "PROPN"] and not token.is_stop and token.is_alpha
    ]
    matched_skills = list(set(word for word in words if word in SKILL_LIST))
    return matched_skills


def classify_jd_intent(jd_text):
    result = zero_shot(jd_text, CANDIDATE_LABELS)
    return result['labels'][0], result['scores'][0]


def match_resumes(resume_emb, jd_emb, resume_text, jd_text):
    # Semantic similarity with FAISS
    index = faiss.IndexFlatL2(len(resume_emb))
    index.add(np.array([jd_emb]).astype('float32'))
    _, I = index.search(np.array([resume_emb]).astype('float32'), k=1)

    # Cosine similarity
    sim_score = cosine_similarity(
        np.array([resume_emb]),
        np.array([jd_emb])
    )[0][0]

    sim_score = match_score(resume_emb, jd_emb)

    resume_keywords = extract_keywords(resume_text)
    jd_keywords = extract_keywords(jd_text)

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    common_skills = list(set(resume_skills) & set(jd_skills))
    missing_skills = list(set(jd_skills) - set(resume_skills))

    jd_role, confidence = classify_jd_intent(jd_text)

    experience_years = extract_experience(resume_text)

    recommendations = get_recommendation(sim_score, missing_skills, common_skills, jd_role)

    return {
        "fit_score": round(sim_score * 100, 2),
        "jd_role_prediction": jd_role,
        "jd_confidence": round(confidence, 2),
        "matched_skills": common_skills,
        "missing_skills": missing_skills,
        "resume_keywords": resume_keywords,
        "job_keywords": jd_keywords,
        "recommendations": recommendations,
        "experience_years": experience_years,
        "parsed_resume_text": resume_text,
        "parsed_jd_text": jd_text
    }
    