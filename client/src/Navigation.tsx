import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export const Navigation: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎗️ Fundraising Campaign
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/groups" className="nav-link">
              Groups
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/solicitors" className="nav-link">
              Solicitors
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/donors" className="nav-link">
              Donors
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
