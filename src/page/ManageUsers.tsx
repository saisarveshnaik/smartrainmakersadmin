import React, { useState } from 'react';
import '../styles/ManageUsers.css';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ManageUsers: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const users = [
        { id: 1, name: 'Alice Johnson', wallet: '0x123...abc', dateJoined: '2023-01-15', referer: 'john_doe', team: 'Team A' },
        { id: 2, name: 'Bob Smith', wallet: '0x456...def', dateJoined: '2023-02-20', referer: 'jane_smith', team: 'Team B' },
        { id: 3, name: 'Charlie Brown', wallet: '0x789...ghi', dateJoined: '2023-03-10', referer: 'alex_jones', team: 'Team C' },
    ];

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container mt-4 ">
            <h1>Manage Users</h1>
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
                                <Button className="view-more-btn" onClick={handleShowModal}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Editing User Details */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFunds">
                            <Form.Label>Funds</Form.Label>
                            <Form.Control type="number" placeholder="Enter funds" />                             
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formWallet">
                            <Form.Label>User Wallet</Form.Label>
                            <Form.Control type="text" placeholder="Enter wallet address" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageUsers;
