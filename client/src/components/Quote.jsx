import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user/UserContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useParams } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { QuoteContext } from '../context/quotes/QuoteContext'

export default function Quote({total, resources, displayAlert}) {
    const { user, dispatch } = useContext(UserContext)
    const [showDialog, setShowDialog] = useState(false)
    const [loginDialog, setLoginDialog] = useState(false)
    const [selectQuote, setSelectQuote] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [quoteName, setQuoteName] = useState('')
    const { quotes, dispatch: quotesDispatch } = useContext(QuoteContext)
    const quoteId = useParams().id
    const [mainQuotes, setMainQuotes] = useState([])

    // *** FETCH QUOTE IF ID PARAM ***
    useEffect(() => {
        const fetchQuote = async() => {
            if(quoteId) {
                const res = await axios.get(`http://localhost:8000/api/quotes/quote/${user._id}/${quoteId}`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                setQuoteName(res.data.name)
                setSelectQuote(res.data.mainTaskId)
            }
        }
        fetchQuote()
    }, [user._id, quoteId])

    useEffect(() => {
        const fetchMainQuotes = async() => {
            if(quotes.length > 0) {
                const filter = quotes.filter(q => q.mainTaskId === '')
                setMainQuotes(filter)
            }
        }
        fetchMainQuotes()
    }, user._id)

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
                physicalResources: resources.filter(resource => resource.type === 'Physical Resource'),
                humanResources: resources.filter(resource => resource.type === 'Human Resource'),
                mainTaskId: selectQuote || ''
            }
            // save updated quote
            if(quoteId) {
                await axios.put(`http://localhost:8000/api/quotes/update/${user._id}/${quoteId}`, newQuote, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                quotesDispatch({type:"UPDATE_QUOTE", payload: newQuote})
            }
            // or add as new if not editing an existing quote
            else {
                console.log("adding new quote")
                await axios.post(`http://localhost:8000/api/quotes/add/${user._id}`, newQuote, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                quotesDispatch({type:"ADD_QUOTE", payload: newQuote})
            }

            setShowDialog(false)
            displayAlert("Quote Saved")
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <>
            <h3>Estimated budget: £{total || '00.00'}</h3>
            <h3>Including subtasks:</h3>
            <h3><i>include table of subtasks and quote</i></h3>
            <h3><i>£17000.00</i></h3>

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
                                {mainQuotes.length > 0 && mainQuotes.map((quote) => {
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