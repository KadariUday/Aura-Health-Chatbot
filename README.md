# Aura Health Assistant 🩺

Aura Health Assistant is a full-stack AI-powered healthcare chatbot application. It leverages a custom NLP engine to analyze symptoms, detect emergencies, and provide medical guidance. Now integrated with **MySQL** for secure user management.

⚠️ **Disclaimer:** This project is designed for educational purposes only. It is an AI and not a substitute for professional medical advice, diagnosis, or treatment.

---

## 🚀 Features

- **Conversational Chat Interface:** A clean, modern UI designed with React and Tailwind CSS.
- **Custom NLP Engine:** Fast symptom matching and emergency detection using a dataset of diseases and treatments.
- **MySQL User Management:** Store user profiles (username, email, passwords) in a local MySQL database.
- **Emergency Detection:** Real-time analysis of life-threatening keywords to provide immediate emergency instructions.
- **Multilingual Support:** Supports multiple Indian languages via translation integration.

---

## 🛠️ Tech Stack

**Frontend**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React

**Backend**
- **Framework:** FastAPI (Python)
- **Database:** MySQL
- **Data Processing:** Pandas
- **Translation:** Deep Translator
- **Server:** Uvicorn

---

## 📂 Project Structure

```text
Aura Health Chatbot/
│
├── backend/                   # Python FastAPI Backend
│   ├── main.py                # FastAPI endpoints & MySQL config
│   ├── nlp_engine.py          # Core AI logic & symptom analysis
│   ├── disease_dataset.csv    # Disease & treatment data
│   └── requirements.txt       # Python dependencies
│
├── frontend/                  # React Vite Frontend
│   ├── src/                   
│   │   ├── App.jsx            # Main application & auth logic
│   │   └── index.css          # Styling
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json           # Node dependencies
│
├── run_all.ps1                # Script to quickstart servers
└── README.md                  # Project documentation
```

---

## ⚙️ How to Run Locally

### Prerequisites
- Python 3.8+
- Node.js & npm
- **MySQL Server** (Ensure it's running on localhost)

### 1. Automatic Setup
Run the PowerShell script from the project root:
```powershell
.\run_all.ps1
```

### 2. Manual Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Manual Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 Database Configuration
The backend connects to MySQL on `localhost` with user `root` and no password by default. To change this, edit the `DB_CONFIG` dictionary in `backend/main.py`.

The system automatically creates the database `aura_health_db` and the `users` table on startup.
