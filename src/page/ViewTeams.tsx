import React, { useState } from 'react';
import { Tab, Nav, Table, Container } from 'react-bootstrap';
import '../styles/ViewTeams.css';

const ViewTeams: React.FC = () => {
    const [key, setKey] = useState('premium'); // State to manage active tab

    // Placeholder data for Premium Zone
    const premiumZoneData = [
        { username: 'Alice', wallet: '0x123...', joiningDate: '2023-01-01', level: 'Gold' },
        { username: 'Bob', wallet: '0x456...', joiningDate: '2023-02-15', level: 'Platinum' },
        { username: 'Charlie', wallet: '0x789...', joiningDate: '2023-03-10', level: 'Silver' },
    ];

    // Placeholder data for Rainmaker Zone
    const rainmakerZoneData = [
        { username: 'David', wallet: '0xabc...', joiningDate: '2023-04-05', level: 'Diamond' },
        { username: 'Eve', wallet: '0xdef...', joiningDate: '2023-05-20', level: 'Gold' },
        { username: 'Frank', wallet: '0xghi...', joiningDate: '2023-06-25', level: 'Bronze' },
    ];

    return (
        <Container className="mt-4">
            <h1 className='mb-5'>View Teams</h1>
            <Tab.Container id="view-teams-tabs" activeKey={key} onSelect={(k) => setKey(k as string)}>
                <Nav variant="tabs" className="mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="premium">Premium Zone</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="rainmaker">Rainmaker Zone</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    {/* Premium Zone Table */}
                    <Tab.Pane eventKey="premium">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Wallet Address</th>
                                    <th>Joining Date</th>
                                    <th>Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {premiumZoneData.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.wallet}</td>
                                        <td>{user.joiningDate}</td>
                                        <td>{user.level}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab.Pane>
                    {/* Rainmaker Zone Table */}
                    <Tab.Pane eventKey="rainmaker">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Wallet Address</th>
                                    <th>Joining Date</th>
                                    <th>Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rainmakerZoneData.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.wallet}</td>
                                        <td>{user.joiningDate}</td>
                                        <td>{user.level}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default ViewTeams;
