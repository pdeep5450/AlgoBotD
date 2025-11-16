from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strategies.strategy import Strategy
app = FastAPI(title="AlgoBotD Backend")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/products")
def products():
    return [
        { "symbol":"BTCUSDT-PERP", "contract_size":0.001, "tick_size":0.5, "max_leverage":20, "title":"BTC/USDT" },
        { "symbol":"ETHUSDT-PERP", "contract_size":0.01, "tick_size":0.01, "max_leverage":10, "title":"ETH/USDT" }
    ]

@app.post("/run_strategy/{symbol}")
def run_strategy(symbol: str):
    strat = Strategy()
    res = strat.run_once(symbol)
    return {"result": res}
