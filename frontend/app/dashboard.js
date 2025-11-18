'use client'
import {useEffect,useState} from 'react'
export default function Dashboard(){
  const [products,setProducts]=useState([])
  useEffect(()=>{fetch('/api/products').then(r=>r.json()).then(setProducts).catch(()=>setProducts([]))},[])
  return (<div>
    <div className="card"><h2>Dashboard</h2><p>Available products:</p><pre>{JSON.stringify(products,null,2)}</pre></div>
  </div>)
}
