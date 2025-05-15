import React, { useState } from 'react';
import '../styles/Table.css';
import { FaUserCircle, FaCalendarAlt, FaMoneyBillWave, FaFileAlt, FaSearch, FaFileExport, FaSort } from 'react-icons/fa';
import { useDashboard } from '../context/DashboardContext';
import { CSVLink } from 'react-csv'; // Import for CSV export
import { useDebounce } from 'use-debounce'; // Import for debouncing search input

// Define TypeScript interface for transactions
interface Transaction {
  user: string;
  amount: number;
  date: string;
  description: string;
}

const Table: React.FC = () => {
  const { data, loading } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
  const [sortColumn, setSortColumn] = useState<keyof Transaction>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce search input
  const [pageLoading, setPageLoading] = useState(false);

  // Icons
  const FileIcon = FaFileAlt as React.ElementType;
  const CalendarIcon = FaCalendarAlt as React.ElementType;
  const MoneyBillWave = FaMoneyBillWave as React.ElementType;
  const UserIcon = FaUserCircle as React.ElementType;
  const ExportIcon = FaFileExport as React.ElementType;
  const SearchIcon = FaSearch as React.ElementType;
  const SortIcon = FaSort as React.ElementType;

  if (loading) {
    return (
      <div className="table-container loading-state">
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
        <p style={{ textAlign: 'center', color: '#fff' }}>Fetching transactions...</p>
      </div>
    );
  }
  if (!data || !data.transactions) return <p>No transactions available.</p>;

  // Calculate total pages
  const totalPages = Math.ceil(data.transactions.length / itemsPerPage);

  // Filter transactions based on search input
  const filteredTransactions = data?.transactions?.filter((transaction: Transaction) => {
    if (!transaction.user || !transaction.description) return false;

    const searchText = debouncedSearchTerm.trim().toLowerCase();
    return transaction.user.toLowerCase().includes(searchText) || transaction.description.toLowerCase().includes(searchText);
  }) || [];

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const aValue = new Date(a.date).getTime();
    const bValue = new Date(b.date).getTime();
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = sortedTransactions.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setPageLoading(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setPageLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="table-container table-responsive">
      <div className="search-export-container">
        {/* Styled Search Box */}
        <div className="search-box">
          <SearchIcon className="icon" />
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search transactions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Styled Export Button */}
        <CSVLink data={filteredTransactions} filename="transactions.csv" className="export-button">
          <ExportIcon />
          Export CSV
        </CSVLink>
      </div>
      {loading || pageLoading ? (
        <div className="table-container loading-state">
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
          <p style={{ textAlign: 'center', color: '#fff' }}>Fetching transactions...</p>
        </div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="sticky-header">
            <tr>
              <th onClick={() => { setSortColumn('user'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}><UserIcon className="icon" /> User <SortIcon /></th>
              <th onClick={() => { setSortColumn('amount'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}><MoneyBillWave className="icon" /> Amount <SortIcon /></th>
              <th onClick={() => { setSortColumn('date'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}><CalendarIcon className="icon" /> Date <SortIcon /></th>
              <th className="text-left" onClick={() => { setSortColumn('description'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}><FileIcon className='icons'/> Description <SortIcon /></th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction: Transaction, index: number) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'} style={{ cursor: 'pointer' }}>
                <td title={transaction.user}>{transaction.user}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="text-left" title={transaction.description}>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button 
          onClick={() => handlePageChange(1)} 
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          First
        </button>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          Next
        </button>
        <button 
          onClick={() => handlePageChange(totalPages)} 
          disabled={currentPage === totalPages}
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Table;
