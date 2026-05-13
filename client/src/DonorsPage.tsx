import React, { useEffect, useState } from 'react';
import { donorService } from './services';
import { DonorCard } from './Cards';
import './Pages.css';

export const DonorsPage: React.FC = () => {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await donorService.fetchDonors();
        setDonors(data);
        const total = data.reduce((sum, donor) => sum + (donor.donationAmount || 0), 0);
        setTotalDonations(total);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch donors'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="page-container"><div className="loading">Loading donors...</div></div>;
  }

  if (error) {
    return <div className="page-container"><div className="error">Error: {error.message}</div></div>;
  }

  return (
    <div className="page-container">
      <h1>Our Donors</h1>
      <p className="page-subtitle">Generous supporters of our cause</p>

      <div className="total-donations">
        <h3>Total Raised: ${totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        <p>{donors.length} Generous Donors</p>
      </div>

      {donors.length === 0 ? (
        <div className="empty-state">
          <p>No donors yet. Be the first to contribute!</p>
        </div>
      ) : (
        <div className="cards-grid">
          {donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      )}
    </div>
  );
};
