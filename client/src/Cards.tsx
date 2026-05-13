import React from 'react';
import type { Group } from './types';
import { ProgressBar } from './ProgressBar';
import './Cards.css';

interface GroupCardProps {
  group: Group;
  onClick?: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  return (
    <div className="card group-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="card-header">
        <h3 className="card-title">{group.name}</h3>
      </div>
      {group.description && <p className="card-description">{group.description}</p>}
      <ProgressBar current={group.raisedAmount} goal={group.targetAmount} label="Group Total" />
      <div className="card-stats">
        <span>{group.solicitors?.length || 0} Solicitors</span>
      </div>
    </div>
  );
};

interface SolicitorCardProps {
  solicitor: any;
  onClick?: () => void;
}

export const SolicitorCard: React.FC<SolicitorCardProps> = ({ solicitor, onClick }) => {
  return (
    <div className="card solicitor-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="card-header">
        <h3 className="card-title">{solicitor.name}</h3>
        {solicitor.email && <p className="card-email">{solicitor.email}</p>}
      </div>
      <ProgressBar current={solicitor.raisedAmount} goal={solicitor.targetAmount} label="Personal Goal" />
      <div className="card-stats">
        <span>{solicitor.donors?.length || 0} Donors</span>
      </div>
    </div>
  );
};

interface DonorCardProps {
  donor: any;
}

export const DonorCard: React.FC<DonorCardProps> = ({ donor }) => {
  const amount = donor.donationAmount || 0;
  return (
    <div className="card donor-card">
      <div className="card-header">
        <h3 className="card-title">{donor.name}</h3>
        {donor.email && <p className="card-email">{donor.email}</p>}
      </div>
      <div className="donor-amount">
        ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      {donor.donationDate && (
        <p className="card-date">{new Date(donor.donationDate).toLocaleDateString()}</p>
      )}
    </div>
  );
};
