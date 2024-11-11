import React, { useEffect, useState } from 'react';
import '../styles/ManageUsers.css';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

interface User {
    id: number;
    user_name: string;
    email: string;
    email_verified: boolean;
    payout_wallet: string;
    premium_level: string;
    rainmaker_level: string;
    total_withdrawn: number;
    created_at: string;
}

interface UserDetails {
    user_name: string;
    password: string;
    payout_wallet: string;
}

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);  // State for alert message
    const [alertType, setAlertType] = useState<'success' | 'danger' | undefined>(undefined); // Updated state type

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost/smartrainmakers/pages/manage_users_GET.php');
            setUsers(response.data.users || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleShowModal = async (userId: number) => {
        setSelectedUserId(userId);
        try {
            const response = await axios.get(`http://localhost/smartrainmakers/pages/manage_users_popup_GET.php?user_id=${userId}`);
            setUserDetails(response.data.user_details || null);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setUserDetails(null);
    };

    const handleSaveChanges = async () => {
        if (selectedUserId && userDetails) {
            const { password, payout_wallet } = userDetails;

            // Prepare form-data
            const formData = new FormData();
            formData.append('user_id', selectedUserId.toString());
            formData.append('password', password);
            formData.append('payout_wallet', payout_wallet);

            try {
                const response = await axios.post('http://localhost/smartrainmakers/pages/manage_users_popup_POST.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                // Show success message
                setAlertMessage('User details updated successfully.');
                setAlertType('success');

                setShowModal(false);
                fetchUsers(); // Re-fetch users after updating
            } catch (error) {
                console.error("Error updating user details:", error);

                // Show error message
                setAlertMessage('Failed to update user details. Please try again.');
                setAlertType('danger');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>Manage Users</h1>

            {/* Displaying the alert message if it exists */}
            {alertMessage && (
                <Alert variant={alertType} onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Email Verified</th>
                        <th>Payout Wallet</th>
                        <th>Premium Level</th>
                        <th>Rainmaker Level</th>
                        <th>Total Withdrawn</th>
                        <th>Date Joined</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.user_name}</td>
                            <td>{user.email}</td>
                            <td>{user.email_verified ? "Yes" : "No"}</td>
                            <td>{user.payout_wallet}</td>
                            <td>{user.premium_level}</td>
                            <td>{user.rainmaker_level}</td>
                            <td>{user.total_withdrawn}</td>
                            <td>{user.created_at}</td>
                            <td>
                                <Button className="view-more-btn" onClick={() => handleShowModal(user.id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userDetails && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    defaultValue={userDetails.user_name}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={userDetails.password}
                                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formWallet">
                                <Form.Label>User Wallet</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter wallet address"
                                    value={userDetails.payout_wallet}
                                    onChange={(e) => setUserDetails({ ...userDetails, payout_wallet: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageUsers;
