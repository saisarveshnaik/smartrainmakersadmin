import React, { useState } from 'react';
import '../styles/AddAdmin.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddAdmin: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<string>('success');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Collect the form data
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form); // Collect form data as FormData

        // Extract values from FormData
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirm_password') as string;

        // Check if passwords match
        if (password !== confirmPassword) {
            setAlertMessage('Password and Confirm Password do not match.');
            setAlertType('danger');
            return;
        }

        // Proceed with the API request to add the admin
        try {
            const response = await axios.post('http://localhost/smartrainmakers/pages/add_admin_POST.php', formData);

            // Show success message
            setAlertMessage(response.data.message);
            setAlertType('success');

            // Clear form fields after success
            form.reset();
        } catch (error: any) {
            console.error("Error adding admin:", error);

            // Show error message
            setAlertMessage(error.response?.data?.error || 'Failed to add admin. Please try again.');
            setAlertType('danger');
        }
    };

    const handleClose = () => setShowPopup(false);

    return (
        <div className="container mt-4">
            <h1>Add Admin</h1>

            {/* Display alert messages */}
            {alertMessage && (
                <Alert variant={alertType}>
                    {alertMessage}
                </Alert>
            )}

            <Form className="add-admin-form" onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter username" required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter password" required />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirm_password" placeholder="Confirm password" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="submit-btn">
                    Submit
                </Button>
            </Form>

            {/* Popup for Admin Password Confirmation */}
            <Modal show={showPopup} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Admin Password Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="adminPassword">
                        <Form.Label>Enter Admin Password</Form.Label>
                        <Form.Control type="password" placeholder="Admin password" required />
                    </Form.Group>
                    <Button variant="success" className="confirm-btn mt-3" onClick={handleClose}>
                        Confirm Password
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddAdmin;
