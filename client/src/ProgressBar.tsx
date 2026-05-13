import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  goal: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, goal, label = 'Progress' }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const formattedCurrent = current.toLocaleString();
  const formattedGoal = goal.toLocaleString();

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-amount">
          ${formattedCurrent} / ${formattedGoal}
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}>
          <span className="progress-text">{percentage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};
