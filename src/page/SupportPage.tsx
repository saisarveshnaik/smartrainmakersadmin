import React, { useEffect, useState } from 'react';
import '../styles/SupportPage.css';
import axios from 'axios';
import { ENDPOINTS } from '../endpoints';

interface Ticket {
  _id: string;
  subject: string;
  description: string;
  status?: string;
  createdAt?: string;
  closedAt?: string | null;
  userDetails: {
    email: string;
    user_name: string;
  };
}

const SupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(ENDPOINTS.FETCH_ALL_TICKETS);
        setTickets(response.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Handle status change
  const handleStatusChange = async (id: string) => {
    try {
      await axios.put(ENDPOINTS.UPDATE_TICKET, { ticketId: id, status: 'Closed' });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? { ...ticket, status: 'Closed' } : ticket
        )
      );
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const toggleDescription = (id: string) => {
    setExpandedTicket(expandedTicket === id ? null : id);
  };

  const copyEmailToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  const indexOfLastTicket = currentPage * rowsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - rowsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className="support-page">
      <h1>Support Tickets</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Closed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket) => (
            <React.Fragment key={ticket._id}>
              <tr>
                <td>{ticket._id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.userDetails.user_name}</td>
                <td onClick={() => copyEmailToClipboard(ticket.userDetails.email)} style={{ cursor: 'pointer' }}>
                  {ticket.userDetails.email}
                </td>
                <td>{ticket.status || 'N/A'}</td>
                <td>{new Date(ticket.createdAt || '').toLocaleString()}</td>
                <td>{ticket.closedAt ? new Date(ticket.closedAt).toLocaleString() : <button className="btn btn-warning btn-sm pending-btn">Pending</button> }</td>
                <td>
                  {ticket.status?.toLowerCase() === 'open' ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleStatusChange(ticket._id)}
                    >
                      Close
                    </button>
                  ) : null}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => toggleDescription(ticket._id)}
                  >
                    {expandedTicket === ticket._id ? 'Hide' : 'Show'} Message
                  </button>
                </td>
              </tr>
              {expandedTicket === ticket._id && (
                <tr>
                  <td colSpan={6}>{ticket.description}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <label>
          Rows per page:
          <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastTicket >= tickets.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SupportPage;
