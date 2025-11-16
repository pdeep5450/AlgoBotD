import random
class Strategy:
    def __init__(self, settings=None):
        self.settings = settings or {
            "bb_length":20,
            "bb_mult":2.0,
            "squeeze_factor":1.0,
            "rsi_length":14,
            "trail_percent":0.02
        }

    def run_once(self, symbol):
        price = 10000 + random.random()*1000
        return {"symbol":symbol, "signal":"long" if random.random()>0.5 else "short", "price":round(price,2)}
