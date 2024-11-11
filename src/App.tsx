// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import InfoCard from './components/InfoCard';
import TrafficChart from './components/TrafficChart';
import Table from './components/Table';
import FooterStats from './components/FooterStats';
import ViewUsers from './page/ViewUsers'; // Import the View Users page component
import ManageUsers from './page/ManageUsers'; // Import the Manage Users page component
import Transactions from './page/Transactions'; // Import the Transactions page component
import Withdrawals from './page/Withdrawals'; // Import the Withdrawals page component
import AddAdmin from './page/AddAdmin'; // Import the Add Admin page component
import AddUsers from './page/AddUsers'; // Import the Add Users page component
import ViewTeams from './page/ViewTeams'; // Import the View Teams page component
import ViewAdminBalance from './page/ViewAdminBalance'; // Import the View Admin Balance page component
import HelpSupport from './page/HelpSupport'; // Import the View Help And Support page component

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <div className="app-container d-flex">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar-hidden'}`}>
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className={`main-content d-flex flex-column ${isSidebarOpen ? 'content-with-sidebar' : 'content-full'}`}>
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />
          
          {/* Content */}
          <div className="content-area flex-grow-1">
            <Routes>
              {/* Default route with main components */}
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
              
              {/* Route for the View Users page */}
              <Route path="/view-users" element={<ViewUsers />} />

              {/* Route for the Manage Users page */}
              <Route path="/manage-users" element={<ManageUsers />} />

              {/* Route for the Transactions page */}
              <Route path="/transactions" element={<Transactions />} />

              {/* Route for the Withdrawals page */}
              <Route path="/withdrawals" element={<Withdrawals />} />

              {/* Route for the Add Admin page */}
              <Route path="/add-admin" element={<AddAdmin />} />

              {/* Route for the Add Users page */}
              <Route path="/add-users" element={<AddUsers />} />

              {/* Route for the View Teams page */}
              <Route path="/view-teams" element={<ViewTeams />} />

              {/* Route for the View Admin Balance page */}
              <Route path="/view-admin-balance" element={<ViewAdminBalance />} />

              {/* Route for the Help And Support page */}
              <Route path="/help-and-support" element={<HelpSupport />} />




            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
