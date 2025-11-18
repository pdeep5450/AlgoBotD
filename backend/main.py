from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from strategies.strategy import Strategy
import pandas as pd
import io
import os

app = FastAPI(title='AlgoBotD Backend')
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])

@app.get('/health')
def health():
    return {'ok': True}

@app.get('/products')
def products():
    return [
        {'symbol':'BTCUSDT-PERP','title':'BTC/USDT'},
        {'symbol':'ETHUSDT-PERP','title':'ETH/USDT'},
    ]

@app.post('/run_strategy/{symbol}')
async def run_strategy(symbol: str, request: Request):
    data = await request.json()
    strat = Strategy()
    res = strat.run_once(symbol, data)
    return res

@app.post('/backtest')
async def backtest(file_data: str = None):
    # Accept CSV text body (from frontend API proxy)
    try:
        df = pd.read_csv(io.StringIO(file_data))
    except Exception as e:
        return {'error': f'failed to parse csv: {e}'}
    strat = Strategy()
    # expect columns: close (or use close)
    if 'close' not in df.columns:
        return {'error':'CSV must include close column'}
    signals = strat.backtest_dataframe(df)
    return {'signals': signals}

# Template endpoints for starting/stopping live trading (placeholders)
@app.post('/start')
def start_live(request: Request):
    # Implement live order placement logic here using Delta Exchange APIs and stored API keys
    return {'status':'started'}

@app.post('/stop')
def stop_live():
    return {'status':'stopped'}
