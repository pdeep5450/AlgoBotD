export default function handler(req,res){
  const products = [
    { symbol: "BTCUSDT-PERP", contract_size: 0.001, tick_size: 0.5, max_leverage: 20, title: "BTC/USDT" },
    { symbol: "ETHUSDT-PERP", contract_size: 0.01, tick_size: 0.01, max_leverage: 10, title: "ETH/USDT" },
    { symbol: "SOLUSDT-PERP", contract_size: 1, tick_size: 0.0001, max_leverage: 5, title: "SOL/USDT" }
  ];
  res.status(200).json(products);
}
