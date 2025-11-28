import { useWallet } from '../hooks/useWallet';

// Custom SVG Icons
const WalletIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 01-2-2 2 2 0 012-2h14v4"/>
    <path d="M3 5v14a2 2 0 002 2h16v-5"/>
    <path d="M18 12a2 2 0 00-2 2 2 2 0 002 2h4v-4z"/>
  </svg>
);

const ConnectedIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <path d="M22 4L12 14.01l-3-3"/>
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const EthIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1v22M12 1L5 7l7 6-7 6 7 6"/>
    <path d="M19 7l-7 6 7 6"/>
  </svg>
);

const DisconnectIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <path d="M16 17l5-5-5-5"/>
    <path d="M21 12H9"/>
  </svg>
);

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
      <div className="card-cyber max-w-md mx-auto cyber-glow">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="icon-wrapper-secondary">
              <ConnectedIcon />
            </div>
            <h2 className="text-2xl font-bold text-gradient-cyber">WALLET CONNECTED</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="status-indicator-cyber"></div>
            <span className="text-sm font-semibold text-green-400">ONLINE</span>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="info-item-cyber">
            <label className="text-sm text-slate-300 mb-3 block font-medium tracking-wide">WALLET ADDRESS</label>
            <div className="flex items-center justify-between">
              <code className="text-base font-mono bg-black bg-opacity-30 border border-slate-600 px-4 py-3 rounded-xl text-slate-200 font-semibold tracking-wider">
                {formatAddress(account)}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(account)}
                className="glass-card p-3 rounded-xl hover:bg-slate-700 transition-all duration-200 border border-slate-600"
                title="Copy address"
              >
                <CopyIcon />
              </button>
            </div>
          </div>
          
          <div className="info-item-cyber">
            <label className="text-sm text-slate-300 mb-3 block font-medium tracking-wide">BALANCE</label>
            <div className="flex items-center gap-4">
              <div className="icon-wrapper">
                <EthIcon />
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient-cyber">
                  {parseFloat(balance).toFixed(4)}
                </span>
                <span className="text-lg font-semibold text-slate-300 ml-2">ETH</span>
              </div>
            </div>
          </div>
          
          <div className="info-item-cyber">
            <label className="text-sm text-slate-300 mb-3 block font-medium tracking-wide">NETWORK</label>
            <div className="flex items-center gap-4">
              <div className="icon-wrapper-secondary">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-lg font-semibold text-slate-200">{getNetworkName(chainId)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={disconnectWallet}
          className="btn-cyber-secondary w-full mt-8 py-4 text-lg font-semibold flex items-center justify-center gap-3"
        >
          <DisconnectIcon />
          DISCONNECT WALLET
        </button>
      </div>
    );
  }

  return (
    <div className="card-cyber max-w-md mx-auto text-center cyber-glow" style={{ marginTop: '2rem' }}>
      <div className="icon-wrapper mx-auto mb-8 w-24 h-24 rounded-2xl cyber-glow-purple">
        <WalletIcon />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gradient-cyber mb-4 tracking-tight">
        CONNECT WALLET
      </h1>
      
      <p className="text-lg text-slate-300 mb-10 leading-relaxed font-light tracking-wide">
        Secure your digital identity in the decentralized web
      </p>

      {error && (
        <div className="glass-card border border-red-400 text-red-300 px-5 py-4 rounded-2xl mb-8 font-medium tracking-wide">
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="btn-cyber w-full py-5 text-lg font-semibold mb-8 tracking-wider"
      >
        {isConnecting ? (
          <span className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            CONNECTING...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            INITIATE CONNECTION
          </span>
        )}
      </button>

      <div className="glass-card border border-slate-600 rounded-2xl p-5">
        <p className="text-sm text-slate-400 font-medium tracking-wider">
           ENCRYPTED •  INSTANT •  MULTICHAIN
        </p>
      </div>
    </div>
  );
};

export default WalletConnector;
