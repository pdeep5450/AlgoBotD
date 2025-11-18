# AlgoBotD - Enhanced ZIP (Full working demo)

This package contains:
- frontend/ (Next.js app router) — Strategy UI, Settings, Backtest upload, localStorage save
- backend/ (FastAPI) — run_strategy, backtest (CSV), start/stop placeholders, Delta API template
- backend/strategies/strategy.py — converted BBands + RSI Squeeze strategy with backtest support

## Important notes on Delta Exchange (live trading)
- Live trading requires Delta Exchange API keys. Add `DELTA_API_KEY` and `DELTA_API_SECRET` to backend environment.
- The `delta_template.py` contains placeholder code for order placement. You must review Delta's official API docs and implement authentication (HMAC, etc.) before using with real funds.

## Run locally

### Backend
```
cd backend
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```
cd frontend
npm install
# Optional: set BACKEND_URL env var to point to deployed backend (e.g. export BACKEND_URL="https://your-backend.onrender.com")
npm run dev
```

## Backtest
- Use the Backtest page to upload a CSV with columns: timestamp,open,high,low,close,volume
- The backend will parse the CSV and return strategy signals.

## Deployment
- Frontend: Vercel is recommended (root: frontend)
- Backend: Render or Railway (root: backend). Ensure environment variables contain DELTA API keys if you enable live trading.

