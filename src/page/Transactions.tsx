import React from 'react';
import '../styles/Transactions.css';
import { Table, Button } from 'react-bootstrap';

const Transactions: React.FC = () => {
    // Placeholder transaction data
    const transactions = [
        { id: 1, username: 'Alice Johnson', wallet: '0x123...abc', date: '2023-01-15', hash: '0xABC123', amount: 50, type: 'Credit' },
        { id: 2, username: 'Bob Smith', wallet: '0x456...def', date: '2023-02-20', hash: '0xDEF456', amount: 75, type: 'Debit' },
        { id: 3, username: 'Charlie Brown', wallet: '0x789...ghi', date: '2023-03-10', hash: '0xGHI789', amount: 100, type: 'Credit' },
        // Add more transactions as needed
    ];

    return (
        <div className="container mt-4">
            <h1>Transactions</h1>
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
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.username} / {transaction.wallet}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.hash}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>
                                <Button className="view-more-btn" onClick={() => window.open(`https://bscscan.com/tx/${transaction.hash}`, '_blank')}>
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
