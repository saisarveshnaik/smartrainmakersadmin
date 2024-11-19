import React, { useEffect, useState } from 'react';
import '../styles/Withdrawals.css';
import { Table, Button } from 'react-bootstrap';

interface Withdrawal {
    id: number;
    username: string;
    wallet: string;
    date: string;
    hash: string;
    amount: number;
    type: string;
}

const Withdrawals: React.FC = () => {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch withdrawal data from the API
        fetch('http://localhost/smartrainmakers/pages/withdrawals_GET.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch withdrawals');
                }
                return response.json();
            })
            .then(data => setWithdrawals(data.withdrawals))
            .catch(err => setError(err.message));
    }, []);

    return (
        <div className="container mt-4">
            <h1>Withdrawals</h1>
            {error && <p className="error">{error}</p>}
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Username Wallet</th>
                        <th>Date</th>
                        <th>Transaction Hash</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawals.map(withdrawal => (
                        <tr key={withdrawal.id}>
                            <td>{withdrawal.username} / {withdrawal.wallet}</td>
                            <td>{withdrawal.date}</td>
                            <td>{withdrawal.hash}</td>
                            <td>{withdrawal.amount}</td>
                            <td>{withdrawal.type}</td>
                            <td>
                                <Button className="view-more-btn" onClick={() => window.open(`https://bscscan.com/tx/${withdrawal.hash}`, '_blank')}>
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

export default Withdrawals;
