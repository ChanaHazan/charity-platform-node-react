import apiClient from './api';
import type { Group, Fundraiser, Donor, Donation, CampaignStats } from './types';

// Group Services
export const groupService = {
  fetchGroups: async (): Promise<Group[]> => {
    const response = await apiClient.get('/groups');
    return response.data;
  },
  
  getGroupById: async (id: string): Promise<Group> => {
    const response = await apiClient.get(`/groups/${id}`);
    return response.data;
  },
};

// Solicitor Services
export const solicitorService = {
  fetchSolicitors: async (): Promise<Solicitor[]> => {
    const response = await apiClient.get('/solicitors');
    return response.data;
  },
  
  getSolicitorsByGroupId: async (groupId: string): Promise<Solicitor[]> => {
    const response = await apiClient.get(`/groups/${groupId}/solicitors`);
    return response.data;
  },
  
  addSolicitor: async (solicitor: Omit<Solicitor, 'id'>): Promise<Solicitor> => {
    const response = await apiClient.post('/solicitors', solicitor);
    return response.data;
  },
};

// Donor Services
export const donorService = {
  fetchDonors: async (): Promise<Donor[]> => {
    const response = await apiClient.get('/donors');
    return response.data;
  },
  
  getDonorsBySolicitorId: async (solicitorId: string): Promise<Donor[]> => {
    const response = await apiClient.get(`/solicitors/${solicitorId}/donors`);
    return response.data;
  },
};

// Campaign Services
export const campaignService = {
  fetchCampaignStats: async (): Promise<CampaignStats> => {
    const response = await apiClient.get('/campaign/stats');
    return response.data;
  },
  
  donate: async (donation: Omit<Donation, 'id' | 'timestamp'>): Promise<Donation> => {
    const response = await apiClient.post('/donations', donation);
    return response.data;
  },
};
