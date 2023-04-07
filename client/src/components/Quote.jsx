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
import axios from 'axios'
import { QuoteContext } from '../context/quotes/QuoteContext'

export default function Quote({total, physicalResources, humanResources, displayAlert}) {
    const { user, dispatch } = useContext(UserContext)
    const [showDialog, setShowDialog] = useState(false)
    const [loginDialog, setLoginDialog] = useState(false)
    const [selectQuote, setSelectQuote] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [quoteName, setQuoteName] = useState('')
    const { quotes, dispatch: quotesDispatch } = useContext(QuoteContext)

    // ***** HANDLE SAVE BUTTON CLICK *****
    const saveQuoteClick = () => {
        // check if user is logged in
        if(user) {setShowDialog(true)}
        else {setLoginDialog(true)}
    }

    // ***** HANDLE LOGIN BUTTON CLICK *****
    const loginSubmit = async() => {
        const credentials = {
            email: email,
            password: password
        }

        // login user
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data})

            setError(false)
            setLoginDialog(false)
            setShowDialog(true)
        } catch (err) {
            console.error(err.response.data)
            setError(true)
        }
    }

    // ***** HANDLE DIALOG SAVE QUOTE CLICK *****
    const saveSubmit = async() => {
        try {
            const newQuote = {
                userId: user._id,
                name: quoteName,
                quote: total,
                physicalResources: physicalResources,
                humanResources: humanResources,
                mainTaskId: selectQuote || ''
            }
            // save quote
            await axios.post(`http://localhost:8000/api/quotes/add/${user._id}`, newQuote)
            quotesDispatch({type:"ADD_QUOTE", payload: newQuote})

            setShowDialog(false)
            displayAlert("Quote Saved")
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <>
            <h3>Estimated budget: £{total || '00.00'}</h3>

            <div className="info">
                Human resources are calculated by considering the number of workers,
                their pay grade, and the total amount of time they are required for. 
                Physical resources are calculated by the cost of the resource and 
                the payments required. The estimated figure is the cost of all 
                resources combined.
            </div>

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
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={error ? "Username or password is incorrect" : ""}
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
                                value={selectQuote || ''}
                                label="Quote"
                                onChange={(e) => setSelectQuote(e.target.value)}
                            >
                                <MenuItem value=''>New</MenuItem>
                                {quotes.length > 0 && quotes.map((quote) => {
                                    if(quote.mainTaskId !== '') return
                                    return <MenuItem key={quote._id}  value={quote._id}>{quote.name}</MenuItem>
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
                        value={quoteName || ''}
                        onChange={(e) => setQuoteName(e.target.value)}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                    <Button onClick={saveSubmit}>Save</Button>
                </DialogActions>
            </Dialog> 
        </>
    )
}