Backend:
- FastAPI app (main.py)
- Strategy module in backend/strategies/strategy.py (mock)
- To run locally:
    pip install -r requirements.txt
    uvicorn main:app --reload
- Replace strategy.run_once with real data fetching + indicator calculations.
