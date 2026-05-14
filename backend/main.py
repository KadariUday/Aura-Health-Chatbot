from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from nlp_engine import nlp_engine
from typing import List, Optional
import sqlite3
import os

app = FastAPI(title="Health Assistant API v2.0", description="Backend for the AI Healthcare Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite Configuration (Hosting Friendly)
DB_PATH = "aura_health.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

class UserBase(BaseModel):
    email: EmailStr
    password: str

class UserCreate(UserBase):
    name: str

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

@app.post("/signup")
async def signup(user: UserCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                       (user.name, user.email, user.password))
        conn.commit()
        return {"message": "User created successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")
    finally:
        conn.close()

@app.post("/login")
async def login(user: UserBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (user.email, user.password))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {"name": row["name"], "email": row["email"]}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

@app.post("/chat")
async def chat(request: ChatRequest):
    response = nlp_engine.get_response(request.message, request.language)
    return response

@app.get("/health")
async def health():
    return {"status": "healthy", "database": "sqlite"}
