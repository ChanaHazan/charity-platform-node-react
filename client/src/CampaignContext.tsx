import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CampaignStats, Donation } from './types';
import { campaignService } from './services';

interface CampaignContextType {
  stats: CampaignStats | null;
  loading: boolean;
  error: Error | null;
  fetchStats: () => Promise<void>;
  makeDonation: (donation: Omit<Donation, 'id' | 'timestamp'>) => Promise<Donation | null>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await campaignService.fetchCampaignStats();
      setStats(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch campaign stats');
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const makeDonation = useCallback(async (donation: Omit<Donation, 'id' | 'timestamp'>) => {
    try {
      const result = await campaignService.donate(donation);
      // Refresh stats after donation
      await fetchStats();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to process donation');
      setError(error);
      return null;
    }
  }, [fetchStats]);

  return (
    <CampaignContext.Provider value={{ stats, loading, error, fetchStats, makeDonation }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaignContext must be used within a CampaignProvider');
  }
  return context;
};
