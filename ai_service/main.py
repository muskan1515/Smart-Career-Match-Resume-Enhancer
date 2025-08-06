from fastapi import FastAPI
from router import router

app =  FastAPI()
app.include_router(router)

@app.get("/")
def root():
    print("AI Service is running")
