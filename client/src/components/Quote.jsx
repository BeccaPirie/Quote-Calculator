import ResourceTable from "./ResourceTable";
// import { Button } from "../components/styles/button.styled";
import { useContext, useState } from 'react';
import { UserContext } from '../context/user/UserContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Quote() {
    const { user } = useContext(UserContext)
    const [showDialog, setShowDialog] = useState(false)
    const [loginDialog, setLoginDialog] = useState(false)
    const [selectQuote, setSelectQuote] = useState('New')


    const placeholderQuotes = ["Quote One", "Quote Two", "Quote Three"]

    // ***** HANDLE SAVE BUTTON CLICK *****
    const saveQuoteClick = () => {
        // check if user is logged in
        if(user) {
            saveQuote()
            
        }
        else {
            setLoginDialog(true)
        }
    }

    // ***** HANDLE LOGIN BUTTON CLICK *****
    const loginSubmit = () => {
        // login user
        // then ...
        saveQuote()
    }

    // ***** SAVE QUOTE FUNCTIONALITY *****
    const saveQuote = () => {
        // save quote
        // navigate to profile
        setLoginDialog(false)
        setShowDialog(true)
    }

    return(
        <>
            {/* <ResourceTable /> */}
            <h3>Estimated budget: £17,000</h3>
            <Button onClick={saveQuoteClick}>Save Quote</Button>

            <Dialog open={loginDialog} onClose={() => setLoginDialog(false)}>              
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please login to save this quote
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <DialogContentText>
                        Don't have an account? <Link to='/register'>Sign up</Link>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLoginDialog(false)}>Cancel</Button>
                    <Button onClick={loginSubmit}>Login</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>              
                <DialogTitle>Save</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pick a quote to save as subtask, 
                        or select new quote
                    </DialogContentText>

                    <FormControl>
                            <InputLabel id="quote-label">Quote</InputLabel>
                            <Select
                                labelId="quote-label"
                                id="quote-select"
                                value={selectQuote || 'New'}
                                label="Quote"
                                onChange={(e) => setSelectQuote(e.target.value)}
                            >
                                <MenuItem value="New">New</MenuItem>
                                {placeholderQuotes.map((quote, i) => {
                                    return <MenuItem key={i}  value={quote}>{quote}</MenuItem>
                                })}
                            </Select>
                        </FormControl>


                    <DialogContentText>
                        Please enter a name for this quote
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Quote Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                    <Button onClick={loginSubmit}>Save</Button>
                </DialogActions>
            </Dialog> 
        </>
    )
}