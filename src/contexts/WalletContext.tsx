import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { WalletContextType, WalletState } from '../types/wallet';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: null,
    chainId: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate MetaMask or wallet connection
  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if window.ethereum exists (MetaMask or other wallet)
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const ethereum = (window as any).ethereum;

        // Request account access
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await ethereum.request({ method: 'eth_chainId' });

        if (accounts.length > 0) {
          const address = accounts[0];

          // Get balance
          const balanceHex = await ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest'],
          });
          const balanceInWei = parseInt(balanceHex, 16);
          const balanceInEth = (balanceInWei / 1e18).toFixed(4);

          setWalletState({
            address,
            isConnected: true,
            balance: balanceInEth,
            chainId: parseInt(chainId, 16),
          });

          // Store connection state
          localStorage.setItem('walletConnected', 'true');
        }
      } else {
        // For demo purposes, simulate a wallet connection
        const demoAddress = '0x' + Array.from({ length: 40 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join('');

        setWalletState({
          address: demoAddress,
          isConnected: true,
          balance: '1.2345',
          chainId: 1,
        });

        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('demoWalletAddress', demoAddress);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      balance: null,
      chainId: null,
    });
    setError(null);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('demoWalletAddress');
  }, []);

  // Auto-connect on mount if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected === 'true') {
      connect();
    }
  }, [connect]);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          connect();
        }
      };

      const handleChainChanged = () => {
        connect();
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [connect, disconnect]);

  const value: WalletContextType = {
    ...walletState,
    connect,
    disconnect,
    isConnecting,
    error,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
