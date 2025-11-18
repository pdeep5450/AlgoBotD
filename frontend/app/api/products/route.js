export async function GET(){
  try{
    const res = await fetch(process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/products` : 'http://localhost:8000/products')
    const j = await res.json()
    return new Response(JSON.stringify(j), {status:200})
  }catch(e){
    return new Response(JSON.stringify([]), {status:200})
  }
}
