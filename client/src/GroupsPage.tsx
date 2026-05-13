import React from 'react';
import { useGroups } from './hooks';
import { GroupCard } from './Cards';
import './Pages.css';

export const GroupsPage: React.FC = () => {
  const { groups, loading, error } = useGroups();

  if (loading) {
    return <div className="page-container"><div className="loading">Loading groups...</div></div>;
  }

  if (error) {
    return <div className="page-container"><div className="error">Error: {error.message}</div></div>;
  }

  return (
    <div className="page-container">
      <h1>Campaign Groups</h1>
      <p className="page-subtitle">View all active fundraising groups</p>

      {groups.length === 0 ? (
        <div className="empty-state">
          <p>No groups available yet.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};
