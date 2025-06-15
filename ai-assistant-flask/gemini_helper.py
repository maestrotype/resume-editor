import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "models/gemini-1.5-pro"

# def improve_text(text):
#     model = genai.GenerativeModel(MODEL_NAME)
#     response = model.generate_content(f"Improve grammar, clarity, and professionalism of this resume section:\n\n{text}")
#     return response.text.strip()

def generate_summary(skills, title, position):
    joined_skills = ", ".join(skills)
    prompt = (
        f"Generate a professional resume summary for a {position} titled '{title}' with the following skills: {joined_skills}. "
        f"Keep it concise, formal, and focused on technical achievements."
    )

    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(prompt)
    return response.text.strip()


