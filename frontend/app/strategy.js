'use client'
import {useState, useEffect} from 'react'
export default function Strategy(){
  const defaultSettings = { coin:'BTCUSDT-PERP', leverage:1, lotSize:1, bbLength:20, bbMult:2.0, squeezeFactor:1.0, rsiLength:14, trailPercent:2.0 }
  const [settings, setSettings] = useState(defaultSettings)
  const [status, setStatus] = useState('stopped')
  const [result, setResult] = useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem('algo_settings')
    if(saved) setSettings(JSON.parse(saved))
  },[])

  useEffect(()=>{ localStorage.setItem('algo_settings', JSON.stringify(settings)) },[settings])

  function update(k,v){ setSettings(s=>({...s,[k]:v})) }

  async function runOnce(){
    setStatus('running')
    setResult('Running...')
    const payload = {...settings, trail_percent: settings.trailPercent/100}
    try{
      const res = await fetch(`/api/run_strategy/${encodeURIComponent(settings.coin)}`, {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload)})
      const j = await res.json()
      setResult(j)
    }catch(e){ setResult({error:String(e)}) }
    setStatus('stopped')
  }

  async function start(){
    setStatus('starting')
    const payload = {...settings, trail_percent: settings.trailPercent/100}
    try{
      const res = await fetch('/api/start', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload)})
      const j = await res.json()
      setResult(j); setStatus('running')
    }catch(e){ setResult({error:String(e)}); setStatus('stopped') }
  }

  async function stop(){
    setStatus('stopping')
    try{ const res = await fetch('/api/stop',{method:'POST'}); const j=await res.json(); setResult(j); setStatus('stopped') }catch(e){ setResult({error:String(e)}); setStatus('stopped') }
  }

  return (<div>
    <div className="card">
      <h2>Strategy Settings</h2>
      <div className="grid">
        <div>
          <label>Coin</label><br/>
          <select value={settings.coin} onChange={e=>update('coin', e.target.value)}>
            <option>BTCUSDT-PERP</option>
            <option>ETHUSDT-PERP</option>
            <option>SOLUSDT-PERP</option>
          </select>
          <div style={{marginTop:8}}>
            <label>Leverage</label><br/>
            <button onClick={()=>update('leverage', Math.max(1, settings.leverage-1))}>-</button>
            <span style={{margin:'0 8px'}}>{settings.leverage}x</span>
            <button onClick={()=>update('leverage', Math.min(125, settings.leverage+1))}>+</button>
          </div>
          <div style={{marginTop:8}}>
            <label>Lot Size</label><br/>
            <input type="number" value={settings.lotSize} onChange={e=>update('lotSize', Number(e.target.value))} />
            <div style={{fontSize:12,color:'#666'}}>Adjust per Delta Exchange lot rules</div>
          </div>
        </div>
        <div>
          <label>BB Length</label><br/>
          <input type="number" value={settings.bbLength} onChange={e=>update('bbLength', Number(e.target.value))} /><br/>
          <label>BB Mult</label><br/>
          <input type="number" step="0.1" value={settings.bbMult} onChange={e=>update('bbMult', Number(e.target.value))} /><br/>
          <label>Squeeze Factor</label><br/>
          <input type="number" step="0.1" value={settings.squeezeFactor} onChange={e=>update('squeezeFactor', Number(e.target.value))} /><br/>
          <label>RSI Length</label><br/>
          <input type="number" value={settings.rsiLength} onChange={e=>update('rsiLength', Number(e.target.value))} /><br/>
          <label>Trailing Stop %</label><br/>
          <input type="number" step="0.1" value={settings.trailPercent} onChange={e=>update('trailPercent', Number(e.target.value))} />
        </div>
      </div>

      <div style={{marginTop:12}}>
        <button onClick={runOnce}>Run Once</button>
        <button onClick={start} style={{marginLeft:8}}>Start Strategy</button>
        <button onClick={stop} style={{marginLeft:8}}>Stop Strategy</button>
        <button onClick={()=>{navigator.clipboard.writeText(JSON.stringify(settings))}} style={{marginLeft:8}}>Copy Settings</button>
      </div>

      <div style={{marginTop:12}}>
        <h3>Status: {status}</h3>
        <pre>{JSON.stringify(result,null,2)}</pre>
      </div>
    </div>
  </div>)
}
