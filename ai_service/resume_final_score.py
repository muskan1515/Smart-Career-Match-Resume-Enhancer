from sklearn.metrics.pairwise import cosine_similarity
import spacy
import re
nlp = spacy.load("en_core_web_sm")

def match_score(resume_emb, jd_emb):
    return cosine_similarity([resume_emb], [jd_emb])[0][0]

def extract_keywords(text):
    doc = nlp(text)
    keywords = [
        token.text.lower()
        for token in doc
        if token.pos_ in ["NOUN", "PROPN"] and not token.is_stop and token.is_alpha
    ]
    return list(set(keywords))


def extract_experience(text):
    text = text.lower()
    
    # Match patterns like: "3 years", "5+ years", "7-year", "10+ years"
    pattern = r'(\d{1,2})(\+)?[\s\-]?(years?|yrs?)'
    matches = re.findall(pattern, text)
    
    experience_years = []
    for match in matches:
        years = int(match[0])
        experience_years.append(years)
    
    if experience_years:
        return max(experience_years)
    return 0


def get_recommendation(score, missing_skills, matched_skills, jd_role):
    tips = []

    if score < 0.5:
        tips.append("The resume is not aligned well with the job. Consider revising the summary and skills.")
    elif score < 0.7:
        tips.append("You're on the right track. Try refining your projects or experience sections.")

    if missing_skills:
        tips.append(f"Consider adding these skills: {', '.join(missing_skills[:5])}")

    if matched_skills and len(matched_skills) < 3:
        tips.append(f"Add more examples/projects that highlight: {', '.join(matched_skills)}")

    tips.append(f"Make sure your resume aligns with the '{jd_role}' role expectations.")
    return tips
