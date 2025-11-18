import pandas as pd
import numpy as np

def calculate_signals(df, bb_length=20, bb_mult=2.0, squeeze_factor=1.0, rsi_length=14, trail_percent=0.02):

    # ---- INDICATORS ----

    # SMA (Basis)
    df["basis"] = df["close"].rolling(bb_length).mean()

    # Standard Deviation
    df["dev"] = df["close"].rolling(bb_length).std() * bb_mult

    # Upper & Lower BBands
    df["upper"] = df["basis"] + df["dev"]
    df["lower"] = df["basis"] - df["dev"]

    # RSI
    delta = df["close"].diff()
    gain = delta.where(delta > 0, 0).rolling(rsi_length).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(rsi_length).mean()
    rs = gain / loss
    df["rsi"] = 100 - (100 / (1 + rs))

    # Avg Band Width
    df["band_width"] = df["upper"] - df["lower"]
    df["avg_band_width"] = df["band_width"].rolling(bb_length).mean()

    # Squeeze
    df["squeeze"] = df["band_width"] < (df["avg_band_width"] * squeeze_factor)

    # ---- SIGNALS ----
    df["long_signal"] = (df["squeeze"]) & (df["close"] > df["upper"]) & (df["rsi"] > 50)
    df["short_signal"] = (df["squeeze"]) & (df["close"] < df["lower"]) & (df["rsi"] < 50)

    # ---- TRAILING STOP (Only Condition output, real trading will apply it live) ----
    df["trail_price_long"] = df["close"] * (1 - trail_percent)
    df["trail_price_short"] = df["close"] * (1 + trail_percent)

    return df
