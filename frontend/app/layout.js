export const metadata = { title: 'AlgoBotD', description: 'AlgoBotD Enhanced' }
import './globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div>
              <h1 style={{margin:0}}>AlgoBotD</h1>
              <div style={{fontSize:12,color:'#666'}}>BBands + RSI Squeeze (Demo)</div>
            </div>
            <nav>
              <a href="/">Home</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/strategy">Strategy</a>
              <a href="/backtest">Backtest</a>
              <a href="/settings">Settings</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer style={{padding:12, textAlign:'center', color:'#777'}}>© AlgoBotD</footer>
        </div>
      </body>
    </html>
  )
}
