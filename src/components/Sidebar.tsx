// Sidebar.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FaCogs, FaUsersCog } from 'react-icons/fa';
import { MdOutlineDashboard } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";

const DashboardIcon = MdOutlineDashboard as React.ElementType;
const WalletIcon = LiaWalletSolid as React.ElementType;

interface SidebarProps {
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {

  // Icons
const CogsIcon = FaCogs as React.ElementType;
const UsersCogIcon = FaUsersCog as React.ElementType;


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
            <DashboardIcon className="sidebar-icon" /> Dashboard
          </li>
        </Link>
        <Link to="/wallet">
          <li className="sidebar-item mb-3">
            <WalletIcon className="sidebar-icon" /> Wallets
          </li>
        </Link>
        <Link to="/support">
          <li className="sidebar-item mb-3">
            <CogsIcon className="sidebar-icon" /> Support
          </li>
        </Link>
          <Link to="/manage-users">
            <li className="sidebar-item mb-3">
              <UsersCogIcon className="sidebar-icon" /> Manage Users
            </li>
          </Link>
      </ul>

      <li className="sidebar-item mb-3" onClick={onLogoutClick}>
            <CogsIcon className="sidebar-icon" /> Logout
          </li>
      {/* Theme Section with Collapsible */}
      {/* <h6 onClick={() => toggleSection('theme')} className="sidebar-toggle">
        USERS {themeOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </h6>
      {themeOpen && (
        <ul className="list-unstyled">
          <Link to="/view-users">
            <li className="sidebar-item mb-3">
              <UsersIcon className="sidebar-icon" /> View Users
            </li>
          </Link>
          <Link to="/manage-users">
            <li className="sidebar-item mb-3">
              <UsersCogIcon className="sidebar-icon" /> Manage Users
            </li>
          </Link>
          <Link to="/transactions">
            <li className="sidebar-item mb-3">
              <TransactionIcon className="sidebar-icon" /> Transactions
            </li>
          </Link>
          <Link to="/withdrawals">
            <li className="sidebar-item mb-3">
              <WithdrawIcon className="sidebar-icon" /> Withdrawals
            </li>
          </Link>
        </ul>
      )} */}

      {/* Components Section with Collapsible */}
      {/* <h6 onClick={() => toggleSection('components')} className="sidebar-toggle">
        MANAGE PLATFORM {componentsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </h6>
      {componentsOpen && (
        <ul className="list-unstyled">
          <Link to="/add-admin">
            <li className="sidebar-item mb-3">
              <ChartIcon className="sidebar-icon" /> Add Admin
            </li>
          </Link>
          <Link to="/add-users">
            <li className="sidebar-item mb-3">
              <CogsIcon className="sidebar-icon" /> Add Users
            </li>
          </Link>
          <Link to="/view-teams">
            <li className="sidebar-item mb-3">
              <CogsIcon className="sidebar-icon" /> View Teams
            </li>
          </Link>
          <Link to="/view-admin-balance">
            <li className="sidebar-item mb-3">
              <CogsIcon className="sidebar-icon" /> View Admin Balance
            </li>
          </Link>
          <li className="sidebar-item mb-3">
            <CogsIcon className="sidebar-icon" /> Settings
          </li>
          <Link to="/help-and-support">
            <li className="sidebar-item mb-3">
              <CogsIcon className="sidebar-icon" /> Help & Support
            </li>
          </Link>
        </ul>
      )} */}

      <div className="sidebarfooter">
        <h6 className="smart">SmartRainmakers Inc.</h6>
      </div>
    </div>
  );
};

export default Sidebar;
