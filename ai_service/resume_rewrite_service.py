import os
from textwrap import wrap
from dotenv import load_dotenv
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from openai import OpenAI
from datetime import datetime

# Load .env
load_dotenv()

# Groq/OpenAI-compatible client
client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)


def text_to_formatted_pdf(text: str, pdf_path: str):
    """
    Convert AI-written text to a structured resume-looking PDF.
    """
    c = canvas.Canvas(pdf_path, pagesize=A4)
    width, height = A4
    x_margin, y_margin = 40, 40
    y = height - y_margin
    line_height = 14

    for paragraph in text.split("\n"):
        paragraph = paragraph.strip()
        if not paragraph:
            y -= line_height  # Extra space between sections
            continue
        lines = wrap(paragraph, width=95)
        for line in lines:
            if y <= y_margin:
                c.showPage()
                y = height - y_margin
            c.drawString(x_margin, y, line)
            y -= line_height

    c.save()


def rewrite_resume_with_groq(resume_text: str, jd_text: str, missing_skills: str) -> str:
    """
    Rewrite resume using Groq + LLaMA3, format it like a proper resume, and upload to Cloudinary.
    """
    prompt = f"""
    You are an expert resume assistant AI.

    Rewrite the following resume to be tailored for the provided job description and include the missing skills in a natural way.

    Keep the formatting like a professional resume with sections like:
    - Name and Contact
    - Summary
    - Skills
    - Experience
    - Education
    - Projects (optional)
    Use bullet points wherever helpful and ensure it's ATS-friendly.

    ### Job Description:
    {jd_text}

    ### Missing Skills to Incorporate:
    {missing_skills}

    ### Original Resume:
    {resume_text}

    ### Rewritten Resume (Formatted):
    """

    completion = client.chat.completions.create(
        model="llama3-8b-8192",  # or "mixtral-8x7b-32768"
        messages=[
            {"role": "system", "content": "You are a professional resume rewriting assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=2048
    )

    rewritten_resume = completion.choices[0].message.content.strip()

    return {'resume_text': rewritten_resume}
