'use client'
import {useState} from 'react'
export default function Backtest(){
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  async function upload(){
    if(!file) return alert('Choose CSV file (columns: timestamp,open,high,low,close,volume)')
    const fd = new FormData()
    fd.append('ohlc', file)
    const res = await fetch('/api/backtest', {method:'POST', body: fd})
    const j = await res.json()
    setResult(j)
  }
  return (<div className="card">
    <h2>Backtest</h2>
    <p>Upload CSV of historical OHLC (timestamp,open,high,low,close,volume)</p>
    <input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} /><br/>
    <button onClick={upload} style={{marginTop:8}}>Run Backtest</button>
    <pre style={{marginTop:12}}>{JSON.stringify(result,null,2)}</pre>
  </div>)
}
