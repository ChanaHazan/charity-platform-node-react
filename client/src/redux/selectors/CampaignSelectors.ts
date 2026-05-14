import { type RootState } from '../store'
export const selectCampaignStats = (state: RootState) => state.campaign.stats
export const selectCampaignLoading = (state: RootState) => state.campaign.loading
export const selectTotalRaised = (state: RootState) => state.campaign.stats?.totalRaised
export const selectGoal = (state: RootState) => state.campaign.stats?.goal