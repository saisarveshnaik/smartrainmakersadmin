// Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FaChartLine, FaCogs, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SidebarProps {
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {
  const [themeOpen, setThemeOpen] = useState(true);
  const [componentsOpen, setComponentsOpen] = useState(true);

  const toggleSection = (section: string) => {
    if (section === 'theme') {
      setThemeOpen(!themeOpen);
    } else if (section === 'components') {
      setComponentsOpen(!componentsOpen);
    }
  };

  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="sidebar d-flex flex-column p-3">
      {/* Placeholder Logo */}
      <div className="sidebar-logo">
        <img
          src="https://i.ibb.co/xhZrdLJ/logoo.png"
          alt="Logo"
          className="logo-img"
        />
      </div>

      <ul className="list-unstyled">
        <Link to="/">
          <li className="sidebar-item mb-3">
            <FaChartLine className="sidebar-icon" /> Dashboard
          </li>
        </Link>
      </ul>

      {/* Theme Section with Collapsible */}
      <h6 onClick={() => toggleSection('theme')} className="sidebar-toggle">
        USERS {themeOpen ? <FaChevronUp /> : <FaChevronDown />}
      </h6>
      {themeOpen && (
        <ul className="list-unstyled">
          <Link to="/view-users">
            <li className="sidebar-item mb-3">
              <FaChartLine className="sidebar-icon" /> View Users
            </li>
          </Link>
          <Link to="/manage-users">
            <li className="sidebar-item mb-3">
              <FaCogs className="sidebar-icon" /> Manage Users
            </li>
          </Link>
          <Link to="/transactions">
            <li className="sidebar-item mb-3">
              <FaCogs className="sidebar-icon" /> Transactions
            </li>
          </Link>
          <Link to="/withdrawals">
            <li className="sidebar-item mb-3">
              <FaCogs className="sidebar-icon" /> Withdrawals
            </li>
          </Link>
        </ul>
      )}

      {/* Components Section with Collapsible */}
      <h6 onClick={() => toggleSection('components')} className="sidebar-toggle">
        MANAGE PLATFORM {componentsOpen ? <FaChevronUp /> : <FaChevronDown />}
      </h6>
      {componentsOpen && (
        <ul className="list-unstyled">
          <Link to="/add-admin">
            <li className="sidebar-item mb-3">
              <FaChartLine className="sidebar-icon" /> Add Admin
            </li>
          </Link>
          <Link to="/add-users">
            <li className="sidebar-item mb-3">
              <FaCogs className="sidebar-icon" /> Add Users
            </li>
          </Link>
          <Link to="/view-teams">
            <li className="sidebar-item mb-3">
              <FaCogs className="sidebar-icon" /> View Teams
            </li>
          </Link>
          <Link to="/view-admin-balance">
            <li className="sidebar-item mb-3">
              <FaCogs className="sidebar-icon" /> View Admin Balance
            </li>
          </Link>
          <li className="sidebar-item mb-3">
            <FaCogs className="sidebar-icon" /> Settings
          </li>
          <Link to="/help-and-support">
            <li className="sidebar-item mb-3">
              <FaCogs className="sidebar-icon" /> Help & Support
            </li>
          </Link>
          <li className="sidebar-item mb-3" onClick={onLogoutClick}>
            <FaCogs className="sidebar-icon" /> Logout
          </li>
        </ul>
      )}

      <div className="sidebarfooter">
        <h6 className="smart">SmartRainmakers Inc.</h6>
      </div>
    </div>
  );
};

export default Sidebar;
