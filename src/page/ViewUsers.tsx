import React, { useState, useEffect } from 'react';
import '../styles/ViewUsers.css';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';

interface User {
    id: number;
    user_name: string;
    email: string;
    created_at: string;
}

const ViewUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost/smartrainmakers/pages/view_users_GET.php');
                setUsers(response.data.users);
            } catch (error) {
                setError('Failed to fetch users');
            }
        };
        fetchUsers();
    }, []);

    const handleShowModal = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container mt-4">
            <h1>View Users</h1>
            {error && <p className="error-message">{error}</p>}
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Name/Email</th>
                        <th>Date Joined</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.user_name} / {user.email}</td>
                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                            <td>
                                <Button className="view-more-btn" onClick={() => handleShowModal(user)}>View More</Button>
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
                    {selectedUser && (
                        <div className="user-info">
                            <div className="user-info-row">
                                <span className="label">Email ID:</span>
                                <span className="value">{selectedUser.email}</span>
                            </div>
                            <div className="user-info-row">
                                <span className="label">Date Joined:</span>
                                <span className="value">{new Date(selectedUser.created_at).toLocaleDateString()}</span>
                            </div>
                            {/* Additional placeholders for details; these could be extended with more specific data if available */}
                            <div className="user-info-row">
                                <span className="label">Payout Wallet:</span>
                                <span className="value">[Data Placeholder]</span>
                            </div>
                            <div className="user-info-row">
                                <span className="label">Premium Level:</span>
                                <span className="value">[Data Placeholder]</span>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewUsers;
