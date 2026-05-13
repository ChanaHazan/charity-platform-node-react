import { useState, useEffect } from 'react';
import type { Group, Fundraiser, Donor, CampaignStats } from './types';
import { groupService, solicitorService, donorService, campaignService } from './services';

// Hook for fetching all groups
export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await groupService.fetchGroups();
        setGroups(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch groups'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { groups, loading, error };
};

// Hook for fetching solicitors by group
export const useSolicitors = (groupId: string | null) => {
  const [solicitors, setSolicitors] = useState<Solicitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!groupId) {
      setSolicitors([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await solicitorService.getSolicitorsByGroupId(groupId);
        setSolicitors(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch solicitors'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  return { solicitors, loading, error };
};

// Hook for fetching donors by solicitor
export const useDonors = (solicitorId: string | null) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!solicitorId) {
      setDonors([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await donorService.getDonorsBySolicitorId(solicitorId);
        setDonors(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch donors'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [solicitorId]);

  return { donors, loading, error };
};

// Hook for campaign statistics
export const useCampaignStats = () => {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await campaignService.fetchCampaignStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch campaign stats'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, loading, error };
};

// Hook for countdown timer
export const useCountdown = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('Campaign Ended');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return timeLeft;
};
