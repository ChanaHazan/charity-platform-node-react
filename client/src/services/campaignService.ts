import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const campaignService = {
    fetchCampaignStats: async () => {
        const response = await axios.get(`${API_BASE_URL}/donations/stats`)
        return response.data
    },
}

export const createCampaign = async (campaignData: any) => {
  const response = await axios.post(`${API_BASE_URL}/campaigns`, campaignData)
  return response.data
}
