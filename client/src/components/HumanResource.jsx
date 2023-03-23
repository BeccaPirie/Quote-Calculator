import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'

const payGrades = [
        {type: "Junior", salary: 20000},
        {type: "Standard", salary: 40000},
        {type: "Senior", salary: 60000}
    ]

export default function HumanResource({resource, setResource}) {
    return(
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl required>
                    <InputLabel id="pay-grade-label">Pay grade</InputLabel>
                    <Select
                        labelId="pay-grade-label"
                        id="pay-grade-select"
                        value={resource.payGrade || ''}
                        label="Pay Grade"
                        margin="normal"
                        onChange={(e) => setResource({...resource, payGrade: e.target.value})}
                    >
                        {payGrades.map(payGrade => {
                            return <MenuItem value={payGrade.type}>{payGrade.type}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>

            <div>
                <TextField
                    id="no-of-workers"
                    label="Number of workers"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    margin="normal"
                    required
                    value={resource.workers || ""}
                    onChange={(e) => setResource({...resource, workers: e.target.value})}
                />
            </div>

            <div>
                <TextField
                    id="time"
                    label="Time required"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    margin="normal"
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