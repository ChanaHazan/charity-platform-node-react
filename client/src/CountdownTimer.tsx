import React from 'react';
import { useCountdown } from './hooks';
import './CountdownTimer.css';

interface CountdownTimerProps {
  endDate: string;
  title?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, title = 'Time Left' }) => {
  const timeLeft = useCountdown(endDate);

  return (
    <div className="countdown-container">
      <h3 className="countdown-title">{title}</h3>
      <div className="countdown-display">
        <span className="countdown-text">{timeLeft}</span>
      </div>
    </div>
  );
};
