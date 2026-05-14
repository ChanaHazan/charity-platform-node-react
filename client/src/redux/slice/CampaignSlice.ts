import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { campaignService } from '../../services/campaignService'

interface CampaignStats {
    totalRaised: number,
    goal: number
}
interface CampaignState {
    stats: CampaignStats | null,
    loading: boolean,
    error: string | null
}
const initialState: CampaignState = {
    stats: null,
    loading: false,
    error: null
}
export const fetchCampaignStats = createAsyncThunk(
    'campaign/fetchStats',
    async () => {
        const data = await campaignService.fetchCampaignStats()
        return data

    }
)
const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCampaignStats.pending, (state) => {
            state.loading = true
            // state.error = null
        })
      
        .addCase(fetchCampaignStats.fulfilled, (state, action:  PayloadAction<CampaignStats> ) => {
            state.loading = false
            state.stats = action.payload
            state.error = null
        })
        .addCase(fetchCampaignStats.rejected, (state) => {
            state.loading = false
            state.error = 'Failed to fetch campaign stats'
        })   
    }
})

export default campaignSlice.reducer

