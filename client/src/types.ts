// Types - Data models
export interface Donor {
  name: string;
  email: string;
  phone?: string;
  donationAmount: number;
  donationDate: string;
  solicitorId: string;
}

export interface Fundraiser {
  name: string;
  groupId: string;
  target: number;
  donors: Donor[];
}

export interface Group {
  name: string;
  target: number;
  fundraisers: Fundraiser[];
}

export interface Donation {
  fundraiserId: string;
  donorName: string;
  messege?: string;
  amount: number;
}

export interface CampaignStats {
  totalRaised: number;
  totalGoal: number;
  percentageComplete: number;
  timeLeft: string;
  totalDonors: number;
  totalGroups: number;
}
