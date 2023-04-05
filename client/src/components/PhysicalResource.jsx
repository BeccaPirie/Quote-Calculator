import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function PhysicalResource({resource, setResource}) {

    return(
        <>
            <div className="input-container">
                <TextField
                    id="pr_name"
                    label="Resource"
                    required
                    value={resource.name || ""}
                    onChange={(e) => setResource({...resource, name: e.target.value})}
                />
            </div>

            <FormControl required className="input-container">
                <FormLabel id="radio-group">Type of Cost</FormLabel>
                <RadioGroup
                    aria-labelledby="radio-group"
                    name="type-of-cost"
                    value={resource.costType || ''}
                    onChange={(e) => setResource({...resource, costType: e.target.value})}
                >
                    <FormControlLabel value="One-off Payment" control={<Radio />} label="One-off Payment" />
                    <FormControlLabel value="Weekly Payments" control={<Radio />} label="Weekly Payments" />
                    <FormControlLabel value="Monthly Payments" control={<Radio />} label="Monthly Payments" />
                </RadioGroup>
            </FormControl>

            <div className="input-container">
                <TextField
                    id="cost"
                    label="Cost"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    InputProps={{
                        startAdornment:<InputAdornment position="start">£</InputAdornment>
                    }}
                    value={resource.cost || ""}
                    onChange={(e) => setResource({...resource, cost: e.target.value})}
                />
            </div>
        </>
    )
}