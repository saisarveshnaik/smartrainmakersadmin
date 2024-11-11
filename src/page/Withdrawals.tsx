import React from 'react';
import '../styles/Withdrawals.css';
import { Table, Button } from 'react-bootstrap';

const Withdrawals: React.FC = () => {
    // Placeholder withdrawal data
    const withdrawals = [
        { id: 1, username: 'Alice Johnson', wallet: '0x123...abc', date: '2023-01-15', hash: '0xABC123', amount: 150, type: 'Withdrawal' },
        { id: 2, username: 'Bob Smith', wallet: '0x456...def', date: '2023-02-20', hash: '0xDEF456', amount: 200, type: 'Withdrawal' },
        { id: 3, username: 'Charlie Brown', wallet: '0x789...ghi', date: '2023-03-10', hash: '0xGHI789', amount: 300, type: 'Withdrawal' },
        // Add more withdrawal data as needed
    ];

    return (
        <div className="container mt-4">
            <h1>Withdrawals</h1>
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
