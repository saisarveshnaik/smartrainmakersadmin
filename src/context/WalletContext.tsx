import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../endpoints";

// Define types for wallet data
interface WalletData {
  depositBalance: number;
  withdrawalBalance: number;
  reservesWallet: number;
  expectedPayoutWallet: number;
}

// Context type
interface WalletContextType {
  wallets: WalletData | null;
  loading: boolean;
  error: string | null;
}

// Create Context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider Component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch API Data
    const fetchData = async () => {
      try {
        const response = await axios.post(ENDPOINTS.WALLET);
        console.log("Wallet data:", response.data);

        // Ensure correct extraction of data
        if (response.data && response.data.wallets) {
          setWallets({
            depositBalance: response.data.wallets.depositBalance || 0,
            withdrawalBalance: response.data.wallets.withdrawalBalance || 0,
            reservesWallet: response.data.wallets.reservesWallet || 0,
            expectedPayoutWallet: response.data.wallets.expectedPayoutWallet || 0,
          });
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setError("Failed to fetch wallet data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <WalletContext.Provider value={{ wallets, loading, error }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};