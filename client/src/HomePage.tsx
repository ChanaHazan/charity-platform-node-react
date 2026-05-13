import React, { useEffect } from 'react';
import { useCampaignContext } from './CampaignContext';
import { ProgressBar } from './ProgressBar';
import { CountdownTimer } from './CountdownTimer';
import { DonationForm } from './DonationForm';
import './Pages.css';

export const HomePage: React.FC = () => {
  const { stats, loading, error, fetchStats } = useCampaignContext();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <div className="page-container"><div className="loading">Loading campaign data...</div></div>;
  }

  if (error) {
    return <div className="page-container"><div className="error">Error loading campaign: {error.message}</div></div>;
  }

  return (
    <div className="page-container">
      <div className="home-hero">
        <h1>🎗️ Fundraising Campaign</h1>
        <p>Join us in making a difference. Every donation counts!</p>
      </div>

      {stats && (
        <>
          <ProgressBar current={stats.totalRaised} goal={stats.totalGoal} label="Campaign Total" />
          <CountdownTimer endDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()} />

          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.totalDonors}</h3>
              <p>Total Donors</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalGroups}</h3>
              <p>Active Groups</p>
            </div>
            <div className="stat-card">
              <h3>{stats.percentageComplete.toFixed(1)}%</h3>
              <p>Goal Reached</p>
            </div>
          </div>
        </>
      )}

      <DonationForm />
    </div>
  );
};
