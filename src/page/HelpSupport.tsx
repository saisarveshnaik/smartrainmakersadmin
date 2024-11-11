import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import '../styles/HelpSupport.css';

const HelpSupport: React.FC = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');

    const handleViewMessage = (message: string) => {
        setCurrentMessage(message);
        setShowMessage(true);
    };

    const handleClose = () => setShowMessage(false);

    // Placeholder user data
    const supportRequests = [
        { id: 1, username: 'Alice', team: 'Team A', message: 'Issue with login' },
        { id: 2, username: 'Bob', team: 'Team B', message: 'Unable to withdraw funds' },
        { id: 3, username: 'Charlie', team: 'Team C', message: 'Account locked' },
        // Add more as needed
    ];

    return (
        <div className="container mt-4">
            <h1>Help and Support</h1>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Username</th>
                        <th>Direct Team</th>
                        <th>View Message</th>
                    </tr>
                </thead>
                <tbody>
                    {supportRequests.map((request, index) => (
                        <tr key={request.id}>
                            <td>{index + 1}</td>
                            <td>{request.username}</td>
                            <td>{request.team}</td>
                            <td>
                                <Button
                                    variant="info"
                                    onClick={() => handleViewMessage(request.message)}
                                    className="view-more-btn"
                                >
                                    View Message
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Popup for Viewing Message */}
            <Modal show={showMessage} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        value={currentMessage}
                        readOnly
                        rows={5}
                        className="message-textarea"
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HelpSupport;
