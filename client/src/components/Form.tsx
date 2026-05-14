import { useForm } from 'react-hook-form'
import { TextField, Button, DialogActions, Stack, DialogTitle, DialogContent, Select, MenuItem, Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

type FormDonate = {
    donorName: string,
    email: string,
    amount: number,
    creditCard: string,
    expDate: string,
    cvv: string,
    description: string,
    fundraiserId: string
}
type Fundraiser = {
    _id: string
    name: string
}
interface FormProps {
    onSuccess: () => void;
}
const Form = ({ onSuccess }: FormProps) => {
    const [fundraisers, setFundraisers] = useState<Fundraiser[]>([])
    const { register, handleSubmit, formState: { errors } } = useForm<FormDonate>()
    const [message, setMessage] = useState<{ text: string, severity: 'success' | 'error' } | null>(null);
   
    const onSubmit = async (data: FormDonate) => {
        console.log(data)
        try{
            await axios.post('http://localhost:3000/donations', {
                amount: data.amount,
                donorName: data.donorName,
                fundraiserId: data.fundraiserId,
                description: data.description
            })
            
        setMessage({ text: "תרומתך נוספה למערכת, תודה!", severity: 'success' });


            setTimeout(() => {
                onSuccess(); 
            }, 2000);

        } catch (error) {
            console.error('Error submitting donation:', error);
            setMessage({ text: "אירעה שגיאה בביצוע התרומה, נסו שוב.", severity: 'error' });
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/fundraisers');
                setFundraisers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <>
    
                <DialogTitle>
                    Donate
                </DialogTitle>

                <Snackbar 
                open={!!message} 
                autoHideDuration={4000} 
                onClose={() => setMessage(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {message ? (
                    <Alert severity={message.severity} variant="filled" sx={{ width: '100%' }}>
                        {message.text}
                    </Alert>
                ) : undefined}
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Donate</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>

                        <TextField label='Donor Name' {...register('donorName', { required: true })} />
                        {errors.donorName && <span>Donor Name is required</span>}
                        <TextField type="email" label='Email' {...register('email', { required: true })} />
                        {errors.email && <span>Email is required</span>}
                        <TextField type="number" label='Amount' {...register('amount', { required: true, min: 1 })} />
                        {errors.amount && <span>Amount is required and must be greater than 0</span>}
                        <TextField label='Credit Card' {...register('creditCard', { required: true, minLength: 16, maxLength: 16 })} />
                        {errors.creditCard && <span>Credit Card is required and must be 16 digits</span>}
                        <TextField placeholder="MM/YY" label='Exp Date' {...register('expDate', { required: true })} />
                        {errors.expDate && <span>Expiration Date is required</span>}
                        <TextField label='CVV' {...register('cvv', { required: true, minLength: 3, maxLength: 4 })} />
                        {errors.cvv && <span>CVV is required and must be 3 or 4 digits</span>}
                        <TextField multiline rows={4} label='Description' {...register('description')} />
                        <Select
                            defaultValue=""
                            {...register('fundraiserId', { required: true })}
                        >

                            <MenuItem value="">
                                Select Fundraiser
                            </MenuItem>

                            {Array.isArray(fundraisers) && fundraisers.map((fundraiser) => (
                                <MenuItem key={fundraiser._id} value={fundraiser._id}>
                                    {fundraiser.name}
                                </MenuItem>
                            ))}

                        </Select>
                        {errors.fundraiserId && <span>Fundraiser selection is required</span>}
                    </Stack>
                </DialogContent>
       
                <DialogActions>
                    <Button type="submit" variant="contained">
                        Donate
                    </Button>
                </DialogActions>
            </form>


        </>
    )
}

export default Form