import { useWallet } from '../hooks/useWallet';

const WalletConnector = () => {
  const { account, balance, chainId, isConnecting, error, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId: number | null) => {
    if (!chainId) return 'Unknown';
    
    const networks: { [key: number]: string } = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Mumbai Testnet'
    };
    
    return networks[chainId] || `Network ${chainId}`;
  };

  if (account) {
    return (
      <div className="card max-w-md mx-auto neon-glow-blue">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gradient-dark">Wallet Connected</h2>
          <div className="flex items-center gap-3">
            <div className="status-indicator"></div>
            <span className="text-sm font-semibold text-green-600">Connected</span>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="info-item">
            <label className="text-sm text-slate-500 mb-3 block font-medium">Wallet Address</label>
            <div className="flex items-center justify-between">
              <code className="text-base font-mono bg-white border border-slate-200 px-4 py-3 rounded-xl text-slate-800 font-semibold">
                {formatAddress(account)}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(account)}
                className="bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm"
                title="Copy address"
              >
                <span className="text-lg">📋</span>
              </button>
            </div>
          </div>
          
          <div className="info-item">
            <label className="text-sm text-slate-500 mb-3 block font-medium">Balance</label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-lg text-white">Ξ</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient">
                  {parseFloat(balance).toFixed(4)}
                </span>
                <span className="text-lg font-semibold text-slate-700 ml-2">ETH</span>
              </div>
            </div>
          </div>
          
          <div className="info-item">
            <label className="text-sm text-slate-500 mb-3 block font-medium">Network</label>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-lg font-semibold text-slate-800">{getNetworkName(chainId)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={disconnectWallet}
          className="btn-secondary w-full mt-8 py-4 text-lg font-semibold"
        >
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto text-center floating" style={{ marginTop: '2rem' }}>
      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl neon-glow-purple">
        <span className="text-4xl text-white">🔗</span>
      </div>
      
      <h1 className="text-4xl font-bold text-gradient mb-4">
        Connect Wallet
      </h1>
      
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Secure your digital assets with our seamless Web3 connection
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-8 font-medium">
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="btn-primary w-full py-5 text-lg font-semibold mb-8"
      >
        {isConnecting ? (
          <span className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Connecting to Wallet...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            <span className="text-xl">🦊</span>
            Connect Wallet
          </span>
        )}
      </button>

      <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-5">
        <p className="text-sm text-slate-500 font-medium">
          🔒 Secure • ⚡ Fast • 🌐 Multi-Chain
        </p>
      </div>
    </div>
  );
};

export default WalletConnector;
