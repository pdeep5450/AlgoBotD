import pandas as pd
import numpy as np
from typing import Dict, Any

class BBandsRSIStrategy:
    def __init__(self, bb_length=20, bb_mult=2.0, squeeze_factor=1.0, rsi_length=14, trail_percent=0.02):
        self.bb_length = bb_length
        self.bb_mult = bb_mult
        self.squeeze_factor = squeeze_factor
        self.rsi_length = rsi_length
        self.trail_percent = trail_percent

    def sma(self, series, length):
        return series.rolling(length).mean()

    def rsi(self, series, length):
        delta = series.diff()
        up = delta.clip(lower=0)
        down = -delta.clip(upper=0)
        ma_up = up.rolling(length).mean()
        ma_down = down.rolling(length).mean().replace(0, np.nan)
        rs = ma_up / ma_down
        rsi = 100 - (100 / (1 + rs))
        return rsi.fillna(50)

    def generate_signals(self, df: pd.DataFrame):
        df = df.copy()
        df['close'] = df['close'].astype(float)
        df['basis'] = df['close'].rolling(self.bb_length).mean()
        df['dev'] = self.bb_mult * df['close'].rolling(self.bb_length).std()
        df['upper'] = df['basis'] + df['dev']
        df['lower'] = df['basis'] - df['dev']
        df['rsi'] = self.rsi(df['close'], self.rsi_length)
        df['band_width'] = df['upper'] - df['lower']
        df['avg_band_width'] = df['band_width'].rolling(self.bb_length).mean()
        df['squeeze'] = df['band_width'] < (df['avg_band_width'] * self.squeeze_factor)
        df['long_signal'] = (df['squeeze']) & (df['close'] > df['upper']) & (df['rsi'] > 50)
        df['short_signal'] = (df['squeeze']) & (df['close'] < df['lower']) & (df['rsi'] < 50)

        position = None
        entry_price = None
        trailing_stop = None
        signals = []

        for i in range(len(df)):
            close = df['close'].iloc[i]
            if df['long_signal'].iloc[i] and position is None:
                position = 'LONG'
                entry_price = close
                trailing_stop = close * (1 - self.trail_percent)
                signals.append({'index':i,'action':'enter_long','price':float(close)})
            elif df['short_signal'].iloc[i] and position is None:
                position = 'SHORT'
                entry_price = close
                trailing_stop = close * (1 + self.trail_percent)
                signals.append({'index':i,'action':'enter_short','price':float(close)})
            else:
                if position == 'LONG':
                    new_stop = close * (1 - self.trail_percent)
                    trailing_stop = max(trailing_stop, new_stop)
                    if close <= trailing_stop:
                        signals.append({'index':i,'action':'exit_long','price':float(close)})
                        position = None
                elif position == 'SHORT':
                    new_stop = close * (1 + self.trail_percent)
                    trailing_stop = min(trailing_stop, new_stop)
                    if close >= trailing_stop:
                        signals.append({'index':i,'action':'exit_short','price':float(close)})
                        position = None
        return signals

class Strategy:
    def run_once(self, symbol: str, params: Dict[str, Any]):
        # For demo: returns sample signal using BBandsRSIStrategy on synthetic data or lookback
        import random
        length = params.get('lookback', 200)
        base = params.get('base_price', 10000.0)
        import pandas as pd
        prices = [base + random.random()*200 - 100 for _ in range(length)]
        df = pd.DataFrame({'close':prices})
        strat = BBandsRSIStrategy(bb_length=params.get('bb_length',20), bb_mult=params.get('bb_mult',2.0),
                                  squeeze_factor=params.get('squeeze_factor',1.0), rsi_length=params.get('rsi_length',14),
                                  trail_percent=params.get('trail_percent',0.02))
        signals = strat.generate_signals(df)
        return {'symbol': symbol, 'signals': signals, 'params': params}

    def backtest_dataframe(self, df: pd.DataFrame):
        # Expect df to have 'close' column
        strat = BBandsRSIStrategy()
        signals = strat.generate_signals(df)
        return signals
