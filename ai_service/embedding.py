import os
import json
import hashlib
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

# Load environment variables
load_dotenv()

# Determine backend from .env
USE_OPENAI = os.getenv("MODE", "Dev").lower() == "prod"

# Initialize model/API key
if USE_OPENAI:
    import openai
    openai.api_key = os.getenv("OPENAI_API_KEY")
else:
    model = SentenceTransformer('all-MiniLM-L6-v2')

# Load or initialize cache
CACHE_FILE = "embeddings_cache.json"
if os.path.exists(CACHE_FILE):
    with open(CACHE_FILE, "r") as f:
        cache = json.load(f)
else:
    cache = {}

def hash_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()

def get_embedding(text: str):
    key = hash_text(text)

    if key in cache:
        print("✅ Using cached embedding")
        return cache[key]

    print("🔄 Generating new embedding...")

    if USE_OPENAI:
        response = openai.embeddings.create(
            input=text,
            model="text-embedding-ada-002"
        )
        embedding = response["data"][0]["embedding"]
    else:
        embedding = model.encode(text, convert_to_numpy=True).tolist()

    cache[key] = embedding
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f)

    return embedding
