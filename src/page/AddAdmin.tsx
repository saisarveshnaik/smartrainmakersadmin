import React, { useState } from 'react';
import '../styles/AddAdmin.css';
import { Modal, Button, Form } from 'react-bootstrap';

const AddAdmin: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleClose = () => setShowPopup(false);

    return (
        <div className="container mt-4">
            <h1>Add Admin</h1>
            <Form className="add-admin-form" onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" required />
                </Form.Group>
                
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" required />
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
