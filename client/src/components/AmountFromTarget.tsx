import { useSelector } from 'react-redux'
import { selectTotalRaised , selectCampaignLoading ,selectGoal} from '../redux/selectors/CampaignSelectors'
import { Typography } from '@mui/material'
const AmountFromTarget = () => {
    const totalRaised = useSelector(selectTotalRaised)
    const isLoading = useSelector(selectCampaignLoading)
    const goal = useSelector(selectGoal)
    if (isLoading) {
        return <div>Loading...</div>
    }
  return (
    <>
    <Typography variant="h5" component="div">
        Total Raised: ${totalRaised} from {goal}
        
    </Typography>
    </>
  )
}

export default AmountFromTarget