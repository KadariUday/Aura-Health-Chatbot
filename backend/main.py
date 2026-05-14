from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from nlp_engine import nlp_engine
from typing import List, Optional
import mysql.connector
from mysql.connector import Error

app = FastAPI(title="Health Assistant API v2.0", description="Backend for the AI Healthcare Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os
from dotenv import load_dotenv

load_dotenv()

# MySQL Connection Configuration
# Uses environment variables for hosting readiness, falling back to local defaults
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "Uday@2006"), 
    "database": os.getenv("DB_NAME", "aura_health_db")
}

def get_db_connection():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def init_db():
    try:
        # Connect without database first to create it
        conn = mysql.connector.connect(
            host=DB_CONFIG["host"],
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"]
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_CONFIG['database']}")
        conn.database = DB_CONFIG['database']
        
        # Create users table with plain text password storage as requested
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("MySQL Database initialized successfully.")
    except Error as e:
        print(f"Database initialization error: {e}")

# Initialize DB on startup
@app.on_event("startup")
def startup_event():
    init_db()

# Models
class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

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
    return {"status": "Backend API v2.0 Running", "database": "MySQL Connected"}

@app.post("/api/signup")
def signup(user: UserSignup):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        # Check if user exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Insert user (Plain text password as requested)
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (user.username, user.email, user.password)
        )
        conn.commit()
        return {"message": "User registered successfully", "user": {"username": user.username, "email": user.email}}
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@app.post("/api/login")
def login(user: UserLogin):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor(dictionary=True)
        # Verify user (Plain text comparison as requested)
        cursor.execute("SELECT username, email, password FROM users WHERE email = %s", (user.email,))
        db_user = cursor.fetchone()
        
        if db_user and db_user['password'] == user.password:
            return {"message": "Login successful", "user": {"username": db_user['username'], "email": db_user['email']}}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    result = nlp_engine.process_query(request.message, request.session_id, request.language)
    return ChatResponse(**result)
