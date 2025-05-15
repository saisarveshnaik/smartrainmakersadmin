import React, { useEffect, useState } from 'react';
import '../styles/ManageUsers.css';
import { Table, Button, Alert } from 'react-bootstrap';
import { ManageUserProvider, useManageUsers } from '../context/ManageUserContext'; // Import the UserContext
import { useDebounce } from 'use-debounce'; // Import useDebounce
import { FaFileExport } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const ManageUsers: React.FC = () => {
    const navigate = useNavigate();

    const userContext = useManageUsers(); // Ensure correct usage
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'danger' | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState<keyof typeof userContext.users[0]>('created_at'); // Default sorting by date
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(searchTerm, 300);
    const ExportIcon = FaFileExport as React.ElementType;

    useEffect(() => {
        userContext.fetchUsers();
    }, []); // Empty dependency array ensures it runs only once

    const handleViewTeam = (userId: string) => {
        console.log("View team for user:", userId);
        navigate(`/view-team/${userId}`); // Navigate to the team page with userId
    };

    const handleExport = () => {
        // Logic to export user data as CSV
    };

    const sortedUsers = [...(userContext.users || [])].sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (sortColumn === 'created_at') {
            return sortOrder === 'asc' ? new Date(valA as string).getTime() - new Date(valB as string).getTime() : new Date(valB as string).getTime() - new Date(valA as string).getTime();
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
            return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        user.user_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const handleSort = (column: keyof typeof userContext.users[0]) => {
        setSortOrder(prev => (sortColumn === column ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'));
        setSortColumn(column);
    };

    return (
        <div className="container mt-4">
            <h1>Manage Users</h1>

            {alertMessage && (
                <Alert variant={alertType} onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleExport} className="button-export">
                    <ExportIcon /> Export CSV
                </Button>
            </div>

            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('user_name')}>Name {sortColumn === 'user_name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => handleSort('email')}>Email {sortColumn === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Email Verified</th>
                        <th onClick={() => handleSort('payout_wallet')}>Payout Wallet {sortColumn === 'payout_wallet' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => handleSort('premium_level')}>Premium Level {sortColumn === 'premium_level' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => handleSort('rainmaker_level')}>Rainmaker Level {sortColumn === 'rainmaker_level' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Total Withdrawn</th>
                        <th onClick={() => handleSort('created_at')}>Date Joined {sortColumn === 'created_at' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.user_name}</td>
                                <td>{user.email}</td>
                                <td>{user.email_verified ? "Yes" : "No"}</td>
                                <td>{user.payout_wallet.toFixed(2)}</td>
                                <td>{user.premium_level ?? 0}</td>
                                <td>{user.rainmaker_level ?? 0}</td>
                                <td>{user.payout_wallet.toFixed(2)}</td>
                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                <td>
                                    <Button className="view-more-btn" onClick={() => handleViewTeam(user._id)}>View Team</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9}>No users found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="pagination-controls">
                <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span> Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)} </span>
                <input 
                    type="number" 
                    value={currentPage} 
                    onChange={(e) => {
                        let page = Number(e.target.value);
                        if (page > 0 && page <= Math.ceil(filteredUsers.length / itemsPerPage)) {
                            setCurrentPage(page);
                        }
                    }} 
                    min="1" 
                    max={Math.ceil(filteredUsers.length / itemsPerPage)} 
                    style={{ width: "80px", textAlign: "center", margin: "0 10px" }} 
                />
                <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage)))} disabled={currentPage >= Math.ceil(filteredUsers.length / itemsPerPage)}>
                    Next
                </Button>
            </div>
        </div>
    );
};

const ManageUsersPage: React.FC = () => {
    return (
        <ManageUserProvider>
            <ManageUsers />
        </ManageUserProvider>
    );
};

export default ManageUsersPage;
