import TimeRest from './TimeRest'
import AmountFromTarget from './AmountFromTarget'
import { Dialog, Button, Box } from '@mui/material'
import { useState } from 'react';
import Form from './Form';

const HomePage = () => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
                <AmountFromTarget />
                <TimeRest />
                <Button onClick={handleClickOpen}
                    variant="contained" color="primary">Click here to Donate </Button>
            </Box>
            <Dialog open={open} onClose={handleClickClose} maxWidth="sm" fullWidth>
                {/* העברת פונקציית הסגירה כ-Prop */}
                <Form onSuccess={handleClickClose} />
            </Dialog>
        </>
    )
}

export default HomePage