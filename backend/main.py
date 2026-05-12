from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nlp_engine import nlp_engine
from typing import List, Optional

app = FastAPI(title="Health Assistant API v2.0", description="Backend for the AI Healthcare Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default_session"
    language: str = "en"

class ChatResponse(BaseModel):
    intent: str
    entities: list
    reply: str
    is_emergency: bool
    xai_explanation: Optional[str] = None
    medicines: Optional[List[str]] = None
    doctors: Optional[List[str]] = None

@app.get("/")
def read_root():
    return {"status": "Backend API v2.0 Running"}

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    result = nlp_engine.process_query(request.message, request.session_id, request.language)
    return ChatResponse(**result)
