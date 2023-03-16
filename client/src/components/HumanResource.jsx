import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default function HumanResource({resource, setResource}) {
    const payGrades = [
        {type: "Junior", salary: 20000},
        {type: "Standard", salary: 40000},
        {type: "Senior", salary: 60000}
    ]

    return(
        <>
            {/* <legend>Pay grade:</legend>
            <select
                defaultValue="default"
                required
                onChange={(e) => setResource({...resource, payGrade: e.target.value})}>
                <option value="default" disabled>Select pay grade</option>
                {payGrades.map(payGrade => {
                    return <option value={payGrade.type}>{payGrade.type}</option>
                })}
            </select> */}

            <Box sx={{ minWidth: 120 }}>
                <FormControl>
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

            {/* <label htmlFor="workers">Number of workers:</label>
            <input
                type="number"
                id="workers"
                required
                value={resource.workers || ""}
                onChange={(e) => setResource({...resource, workers: e.target.value})}
            /> */}

            <div>
                <TextField
                    id="no-of-workers"
                    label="Number of workers"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    margin="normal"
                    value={resource.workers || ""}
                    onChange={(e) => setResource({...resource, workers: e.target.value})}
                />
            </div>

            {/* <label htmlFor="time">Time required (hours):</label>
            <input
                type="number"
                id="time"
                required
                value={resource.time || ""}
                onChange={(e) => setResource({...resource, time: e.target.value})}
            /> */}

            <div>
                <TextField
                    id="time"
                    label="Time required (hours)"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    margin="normal"
                    value={resource.time || ""}
                    onChange={(e) => setResource({...resource, time: e.target.value})}
                />
                <span id="hours-span">hours</span>
            </div>
        </>
    )
}