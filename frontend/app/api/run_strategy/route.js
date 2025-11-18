export async function POST(request){
  const parts = request.url.split('/')
  const symbol = decodeURIComponent(parts[parts.length-1]||'BTCUSDT-PERP')
  const body = await request.json().catch(()=>({}))
  try{
    const res = await fetch(process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/run_strategy/${symbol}` : `http://localhost:8000/run_strategy/${symbol}`, {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)})
    const j = await res.json()
    return new Response(JSON.stringify(j), {status:200})
  }catch(e){
    return new Response(JSON.stringify({error:String(e)}), {status:500})
  }
}
