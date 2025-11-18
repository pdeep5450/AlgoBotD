from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from strategy import calculate_signals

app = FastAPI()

class OHLCRequest(BaseModel):
    open: list
    high: list
    low: list
    close: list

@app.post("/signal")
def get_signal(data: OHLCRequest):

    df = pd.DataFrame({
        "open": data.open,
        "high": data.high,
        "low": data.low,
        "close": data.close
    })

    df = calculate_signals(df)

    if df["long_signal"].iloc[-1]:
        return {"signal": "LONG"}

    if df["short_signal"].iloc[-1]:
        return {"signal": "SHORT"}

    return {"signal": "NO_TRADE"}
