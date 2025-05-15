// Navbar.tsx
import React from 'react';
import '../styles/Navbar.css';

// Define icons as React.ElementType

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button onClick={toggleSidebar} className="btn btn-outline-light me-3">
        ☰ {/* Collapse button */}
      </button>
      <span className="navbar-brand">Dashboard</span>

      {/* Right-aligned Links */}
      {/* <div className="ml-auto d-flex align-items-center ms-auto">
        <a href="#" className="navbar-link mx-2">
          User
        </a>
        <a href="#" className="navbar-link mx-2">
          Settings
        </a> */}

        {/* Icons Section */}
        {/* <BellIcon className="nav-icon mx-2" />
        <EnvelopeIcon className="nav-icon mx-2" /> */}

        {/* UserCircle with dropdown */}
        {/* <div className="nav-item dropdown">
          <UserCircleIcon
            className="nav-icon user-circle mx-2"
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }}
          />
          {dropdownOpen && (
            <ul className="dropdown-menu dropdown-menu-end show">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
