export async function POST(request){
  const body = await request.json().catch(()=>({}))
  try{
    const res = await fetch(process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/start` : 'http://localhost:8000/start', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)})
    const j = await res.json(); return new Response(JSON.stringify(j), {status:200})
  }catch(e){ return new Response(JSON.stringify({error:String(e)}), {status:500}) }
}
