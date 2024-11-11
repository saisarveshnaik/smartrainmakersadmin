import React from 'react';
import '../styles/AddUsers.css';
import { Button, Form } from 'react-bootstrap';

const AddUsers: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can add functionality for submitting the form if needed
    };

    return (
        <div className="container mt-4">
            <h1>Add Users</h1>
            <Form className="add-user-form" onSubmit={handleSubmit}>
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
        </div>
    );
};

export default AddUsers;
