import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CampaignProvider } from './CampaignContext';
import { Navigation } from './Navigation';
import { HomePage } from './HomePage';
import { GroupsPage } from './GroupsPage';
import { SolicitorsPage } from './SolicitorsPage';
import { DonorsPage } from './DonorsPage';
import { AboutPage } from './AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <CampaignProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/solicitors" element={<SolicitorsPage />} />
          <Route path="/donors" element={<DonorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CampaignProvider>
    </Router>
  );
}

export default App;
