import React, { useState } from 'react';
import '../styles/ViewUsers.css';
import WalletCard from '../components/WalletCard';
import { WalletProvider } from '../context/WalletContext';

const Wallets: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    return (
        <WalletProvider>
        <div className="container mt-4">
            <h1>Wallets</h1>
            {error && <p className="error-message">{error}</p>}
            <WalletCard />
        </div>
        </WalletProvider>
    );
};

export default Wallets;
