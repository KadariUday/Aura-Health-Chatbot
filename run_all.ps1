# Install Backend dependencies
Write-Host "Setting up Backend..."
cd backend
if (!(Test-Path venv)) {
    python -m venv venv
}
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\Activate.ps1; uvicorn main:app --reload"
cd ..

# Install Frontend dependencies and start
Write-Host "Setting up Frontend..."
cd frontend
npm install
npm run dev
