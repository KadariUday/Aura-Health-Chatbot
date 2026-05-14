from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from nlp_engine import nlp_engine
from typing import List, Optional
import sqlite3
import os
from passlib.context import CryptContext

# Password Hashing Setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

app = FastAPI(title="Health Assistant API v2.0", description="Backend for the AI Healthcare Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Aura Health API is running", "version": "2.0"}

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

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    language: str = "en"

@app.post("/api/signup")
async def signup(user: UserCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    hashed_password = get_password_hash(user.password)
    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                       (user.username, user.email, hashed_password))
        conn.commit()
        return {
            "message": "User created successfully",
            "user": {"username": user.username, "email": user.email}
        }
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")
    finally:
        conn.close()

@app.post("/api/login")
async def login(user: UserBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    row = cursor.fetchone()
    conn.close()
    
    if row and verify_password(user.password, row["password"]):
        return {
            "message": "Login successful",
            "user": {"username": row["name"], "email": row["email"]}
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

@app.post("/api/chat")
async def chat(request: ChatRequest):
    response = nlp_engine.get_response(request.message, request.language)
    return response

@app.get("/api/health")
async def health():
    return {"status": "healthy", "database": "sqlite"}
