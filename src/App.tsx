// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import InfoCard from './components/InfoCard';
import TrafficChart from './components/TrafficChart';
import Table from './components/Table';
import FooterStats from './components/FooterStats';
import ViewUsers from './page/ViewUsers';
import ManageUsers from './page/ManageUsers';
import Transactions from './page/Transactions';
import Withdrawals from './page/Withdrawals';
import AddAdmin from './page/AddAdmin';
import AddUsers from './page/AddUsers';
import ViewTeams from './page/ViewTeams';
import ViewAdminBalance from './page/ViewAdminBalance';
import HelpSupport from './page/HelpSupport';
import LoginPage from './page/LoginPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Check authentication status
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear authentication token
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <Router>
      <div className="app-container d-flex">
        {!isAuthenticated ? (
          // Render LoginPage if not authenticated
          <LoginPage setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <>
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar-hidden'}`}>
              <Sidebar handleLogout={handleLogout} /> {/* Pass handleLogout as prop */}
            </div>

            {/* Main content area */}
            <div className={`main-content d-flex flex-column ${isSidebarOpen ? 'content-with-sidebar' : 'content-full'}`}>
              {/* Navbar */}
              <Navbar toggleSidebar={toggleSidebar} />

              {/* Content */}
              <div className="content-area flex-grow-1">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <div className="info-cards">
                          <InfoCard />
                        </div>
                        <div className="container mt-4 mb-5 maincontainer">
                          <TrafficChart />
                          <FooterStats />
                          <Table />
                        </div>
                      </>
                    }
                  />
                  <Route path="/view-users" element={<ViewUsers />} />
                  <Route path="/manage-users" element={<ManageUsers />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/withdrawals" element={<Withdrawals />} />
                  <Route path="/add-admin" element={<AddAdmin />} />
                  <Route path="/add-users" element={<AddUsers />} />
                  <Route path="/view-teams" element={<ViewTeams />} />
                  <Route path="/view-admin-balance" element={<ViewAdminBalance />} />
                  <Route path="/help-and-support" element={<HelpSupport />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App