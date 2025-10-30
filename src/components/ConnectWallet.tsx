import { useWallet } from '../contexts/WalletContext';

export const ConnectWallet = () => {
  const { address, isConnected, isConnecting, error, connect, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="relative group">
        <button
          onClick={disconnect}
          className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card text-white font-medium hover:bg-dark-elevated transition-all duration-200"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="font-mono text-sm">{formatAddress(address)}</span>
        </button>
        <div className="absolute right-0 mt-2 w-64 glass-card rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-4 text-sm">
            <p className="text-text-muted mb-2 text-xs">CONNECTED</p>
            <p className="font-mono text-xs text-white break-all bg-dark-bg p-3 rounded-lg">{address}</p>
            <button
              onClick={disconnect}
              className="mt-3 w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={connect}
        disabled={isConnecting}
        className="px-6 py-2.5 rounded-lg glass-card bg-accent-purple/80 backdrop-blur-md text-white font-semibold hover:bg-accent-purple/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-accent-purple/30"
      >
        {isConnecting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Connecting...
          </span>
        ) : (
          'Connect Wallet'
        )}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-400 max-w-xs text-right">{error}</p>
      )}
    </div>
  );
};
