import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../styles/HelpSupport.css';

interface SupportRequest {
    id: number;
    user_name: string;
    direct_team: string;
    message: string;
}

const HelpSupport: React.FC = () => {
    const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSupportRequests = async () => {
            try {
                const response = await axios.get('http://localhost/smartrainmakers/pages/helpsupport_GET.php');
                if (response.data.status === 'success') {
                    setSupportRequests(response.data.data);
                } else {
                    setError('Error fetching support requests. Please try again later.');
                }
            } catch (err) {
                setError('Error fetching support requests. Please try again later.');
                console.error('Error fetching support requests:', err);
            }
        };

        fetchSupportRequests();
    }, []);

    const handleViewMessage = (message: string) => {
        setCurrentMessage(message);
        setShowMessage(true);
    };

    const handleClose = () => setShowMessage(false);

    return (
        <div className="container mt-4">
            <h1>Help and Support</h1>
            {error && <p className="text-danger">{error}</p>}
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
                            <td>{request.user_name}</td>
                            <td>{request.direct_team}</td>
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
