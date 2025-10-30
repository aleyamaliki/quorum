export interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string | null;
  chainId: number | null;
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  error: string | null;
}
