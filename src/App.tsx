import WalletConnector from './components/WalletConnector';

function App() {
  return (
    <div className="min-h-screen px-4">
      {/* Subtle background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gradient mb-6">
            Web3 Wallet
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect your wallet to explore the decentralized web with security and simplicity
          </p>
        </header>
        
        <main>
          <WalletConnector />
        </main>

        <footer className="text-center mt-20 text-slate-500 text-sm">
          <p>Built for the decentralized future • Secure • Transparent • User-Owned</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
