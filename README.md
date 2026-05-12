# Aura Health Assistant 🩺

Aura Health Assistant is a full-stack AI-powered healthcare chatbot application built using a modern tech stack. It leverages Natural Language Processing (NLP) to understand user queries, perform Entity Recognition (extracting symptoms and body parts), classify intents, and provide contextual, empathetic responses.

⚠️ **Disclaimer:** This project is designed for educational purposes only. It is an AI and not a substitute for professional medical advice, diagnosis, or treatment.

---

## 🚀 Features

- **Conversational Chat Interface:** A clean, modern UI designed with React and Tailwind CSS.
- **NLP Intent Classification:** Uses a Hugging Face Zero-Shot Classification model to route user queries (e.g., symptom checking, appointment booking, general medical info).
- **Entity Recognition (NER):** Utilizes `spaCy` to extract clinical entities like symptoms and affected body parts directly from user input.
- **REST API Backend:** Built on FastAPI for highly performant and concurrent routing.
- **Hardware Optimized:** The backend NLP pipeline is intentionally designed using lightweight models that can effortlessly run on local consumer GPUs (such as an RTX 4050).

---

## 🛠️ Tech Stack

**Frontend**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React

**Backend**
- **Framework:** FastAPI (Python)
- **NLP / ML:** spaCy (`en_core_web_sm`), Hugging Face Transformers (`distilbart-mnli-12-3`), PyTorch
- **Server:** Uvicorn

---

## 📂 Project Structure

```text
Health Chatbot Using Natural Language Processing/
│
├── backend/                   # Python FastAPI Backend
│   ├── main.py                # FastAPI endpoints & server config
│   ├── nlp_engine.py          # core AI logic (spaCy + Transformers)
│   └── requirements.txt       # Python dependencies
│
├── frontend/                  # React Vite Frontend
│   ├── src/                   
│   │   ├── components/
│   │   │   └── ChatWindow.jsx # Main chat UI component
│   │   ├── App.jsx            # React root container
│   │   └── index.css          # Tailwind & custom CSS
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json           # Node dependencies
│
├── run_all.ps1                # Script to quickstart servers
└── README.md                  # Project documentation
```

---

## ⚙️ How to Run Locally

You can run both the frontend and backend using the provided `run_all.ps1` script, or you can manually launch them using the commands below.

### 1. Start the Backend Server
Navigate to the `backend` folder, set up your Python environment, and start the FastAPI server:

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1  # On Windows

# Install dependencies
pip install -r requirements.txt

# Download the spaCy language model
python -m spacy download en_core_web_sm

# Run the backend server
uvicorn main:app --reload
```
The backend will run at `http://127.0.0.1:8000`. You can test the endpoints at `http://127.0.0.1:8000/docs`.

### 2. Start the Frontend Client
Open a new terminal window, navigate to the `frontend` folder, and launch the Vite development server:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```
The React frontend will typically run at `http://localhost:5173`. Open this URL in your browser to interact with Aura!

---

## 🤖 How the NLP Layer Works
1. **Tokenization & Normalization:** `spaCy` handles text chunking and cleaning.
2. **Entity Extraction:** Named Entity Recognition (NER) picks up on specific health keywords from the user.
3. **Intent Detection:** A `distilbart` model scores the sentence against predefined clinical intents (Symptom Check, Appointment, etc.).
4. **Contextual Response:** Based on the highest confidence score, a contextual string is returned featuring a hardcoded medical safety disclaimer.
