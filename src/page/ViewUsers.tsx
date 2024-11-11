import React, { useState } from 'react';
import '../styles/ViewUsers.css';
import { Table, Button, Modal } from 'react-bootstrap';

const ViewUsers: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const users = [
        { id: 1, name: 'Alice Johnson', wallet: '0x123...abc', dateJoined: '2023-01-15', referer: 'john_doe', team: 'Team A' },
        { id: 2, name: 'Bob Smith', wallet: '0x456...def', dateJoined: '2023-02-20', referer: 'jane_smith', team: 'Team B' },
        { id: 3, name: 'Charlie Brown', wallet: '0x789...ghi', dateJoined: '2023-03-10', referer: 'alex_jones', team: 'Team C' },
    ];

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container mt-4">
            <h1>View Users</h1>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Name/Wallet</th>
                        <th>Date Joined</th>
                        <th>Referer Username</th>
                        <th>Team</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name} / {user.wallet}</td>
                            <td>{user.dateJoined}</td>
                            <td>{user.referer}</td>
                            <td>{user.team}</td>
                            <td>
                                <Button className="view-more-btn" onClick={handleShowModal}>View More</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for User Details */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="user-info">
                        <div className="user-info-row">
                            <span className="label">Email ID:</span>
                            <span className="value">example@example.com</span>
                        </div>
                        <div className="user-info-row">
                            <span className="label">Email Verified:</span>
                            <span className="value">Yes</span>
                        </div>
                        <div className="user-info-row">
                            <span className="label">Payout Wallet:</span>
                            <span className="value">0x123...abc</span>
                        </div>
                        <div className="user-info-row">
                            <span className="label">Premium Level:</span>
                            <span className="value">Gold</span>
                        </div>
                        <div className="user-info-row">
                            <span className="label">Rainmaker Level:</span>
                            <span className="value">Level 3</span>
                        </div>
                        <div className="user-info-row">
                            <span className="label">Total Earned:</span>
                            <span className="value">$5000</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewUsers;
