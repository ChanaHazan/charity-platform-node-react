import React, { useState } from 'react';
import { solicitorService } from './services';
import { useSolicitors } from './hooks';
import { SolicitorCard } from './Cards';
import { AddSolicitorForm } from './Forms';
import './Pages.css';

export const SolicitorsPage: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { solicitors, loading, error } = useSolicitors(selectedGroupId);
  const [allSolicitors, setAllSolicitors] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  React.useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await solicitorService.fetchSolicitors();
        setAllSolicitors(data);
      } catch (err) {
        console.error('Error fetching solicitors:', err);
      }
    };
    fetchAll();
  }, []);

  const displaySolicitors = selectedGroupId ? solicitors : allSolicitors;
  const isLoading = selectedGroupId ? loading : false;

  return (
    <div className="page-container">
      <h1>Fundraising Solicitors</h1>
      <p className="page-subtitle">Meet our dedicated fundraisers</p>

      <div className="page-controls">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="action-btn"
        >
          {showAddForm ? 'Cancel' : '+ Add New Solicitor'}
        </button>
      </div>

      {showAddForm && (
        <AddSolicitorForm
          groupId={selectedGroupId || 'general'}
          onSuccess={() => {
            setShowAddForm(false);
            window.location.reload();
          }}
        />
      )}

      {isLoading ? (
        <div className="loading">Loading solicitors...</div>
      ) : error ? (
        <div className="error">Error: {error.message}</div>
      ) : displaySolicitors.length === 0 ? (
        <div className="empty-state">
          <p>No solicitors available.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {displaySolicitors.map((solicitor) => (
            <SolicitorCard key={solicitor.id} solicitor={solicitor} />
          ))}
        </div>
      )}
    </div>
  );
};
