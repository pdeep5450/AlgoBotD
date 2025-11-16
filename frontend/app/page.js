import Link from 'next/link';

export default function Home() {
  return (
    <main style={{padding:24,fontFamily:'Arial, sans-serif',background:'#0f172a',minHeight:'100vh',color:'#e6eef8'}}>
      <div style={{maxWidth:980,margin:'0 auto'}}>
        <h1 style={{fontSize:28}}>AlgoBotD — Demo</h1>
        <p>Starter frontend for your Algo Trading Platform.</p>
        <div style={{marginTop:20,display:'flex',gap:12}}>
          <Link href="/strategy"><a style={{padding:'8px 12px',background:'#2563eb',borderRadius:6}}>Strategy Settings</a></Link>
          <a style={{padding:'8px 12px',background:'#10b981',borderRadius:6}} href="/api/health">Backend Health</a>
        </div>
        <section style={{marginTop:28}}>
          <h2>Delta Instruments (mock)</h2>
          <div id="instruments">Loading...</div>
        </section>
      </div>
      <script dangerouslySetInnerHTML={{__html:`
        fetch('/api/products').then(r=>r.json()).then(list=>{
          const el=document.getElementById('instruments');
          el.innerHTML=list.map(p=>'<div style="padding:8px;background:#001219;margin-bottom:8px;border-radius:6px;">'+
            '<strong>'+p.title+'</strong> - '+p.symbol+' &nbsp; MaxLev: '+p.max_leverage+'x</div>').join('');
        });
      `}} />
    </main>
  );
}
