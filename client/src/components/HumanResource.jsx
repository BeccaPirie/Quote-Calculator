import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function HumanResource({resource, setResource}) {
    const [paygrades, setPaygrades] = useState([])

    // fetch paygrades
    useEffect(() => {
        const fetchPaygrades = async() => {
            const res = await axios.get('https://quote-calculator-api.onrender.com/api/paygrades/')
            setPaygrades(res.data)
        }
        fetchPaygrades()
    }, [])

    return(
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl required className="input-container">
                    <InputLabel id="pay-grade-label">Pay grade</InputLabel>
                    <Select
                        labelId="pay-grade-label"
                        id="pay-grade-select"
                        value={resource.paygrade || ''}
                        label="Pay Grade"
                        onChange={(e) => setResource({...resource, paygrade: e.target.value})}
                    >
                        {paygrades.map(paygrade => {
                            return <MenuItem key={paygrade._id} value={paygrade.type}>{paygrade.type}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>

            <div className="input-container">
                <TextField
                    id="no-of-workers"
                    label="Number of workers"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    value={resource.workers || ""}
                    onChange={(e) => setResource({...resource, workers: e.target.value})}
                />
            </div>

            <div className="input-container">
                <TextField
                    id="time"
                    label="Time required"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    InputProps={{
                        endAdornment:<InputAdornment position="end">hours</InputAdornment>
                    }}
                    value={resource.time || ""}
                    onChange={(e) => setResource({...resource, time: e.target.value})}
                />
            </div>
        </>
    )
}