import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "models/gemini-1.5-pro"

def improve_text(text):
    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(f"Improve grammar, clarity, and professionalism of this resume section:\n\n{text}")
    return response.text.strip()

def generate_summary(skills, years, focus):
    joined_skills = ", ".join(skills)
    prompt = (
        f"Generate a professional resume summary for a developer with {years} years of experience "
        f"in {joined_skills}, focused on {focus}. Keep it concise and formal."
    )
    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(prompt)
    return response.text.strip()

