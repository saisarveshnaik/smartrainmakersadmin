import React, { useState, useEffect } from 'react';
import '../styles/Transactions.css';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    trx_hash: string;
    type: string;
    description: string;
    created_at: string;
    user_name?: string;
}

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch transactions from the API
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost/smartrainmakers/pages/transactions_GET.php');
                setTransactions(response.data.transactions);
            } catch (err) {
                setError('Failed to load transactions.');
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Transactions</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Wallet</th>
                        <th>Date</th>
                        <th>Transaction Hash</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.user_name || 'N/A'}</td>
                            <td>{transaction.user_id}</td>
                            <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                            <td>{transaction.trx_hash}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>
                                <Button 
                                    className="view-more-btn" 
                                    onClick={() => window.open(`https://bscscan.com/tx/${transaction.trx_hash}`, '_blank')}
                                >
                                    View On BSC Scan
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Transactions;
