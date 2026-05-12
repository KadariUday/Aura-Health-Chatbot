# Install Backend dependencies
Write-Host "Setting up Backend..."
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m spacy download en_core_web_sm
Start-Process "uvicorn" -ArgumentList "main:app", "--reload"
cd ..

# Install Frontend dependencies and start
Write-Host "Setting up Frontend..."
cd frontend
npm install
npm install tailwindcss postcss autoprefixer axios lucide-react
npm run dev
