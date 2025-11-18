export async function POST(request){
  const form = await request.formData()
  const file = form.get('ohlc')
  if(!file) return new Response(JSON.stringify({error:'no file'}), {status:400})
  const text = await file.text()
  try{
    const res = await fetch(process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/backtest` : 'http://localhost:8000/backtest', {method:'POST', body: text})
    const j = await res.json()
    return new Response(JSON.stringify(j), {status:200})
  }catch(e){
    return new Response(JSON.stringify({error:String(e)}), {status:500})
  }
}
