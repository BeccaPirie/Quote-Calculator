import { TextField, InputLabel, InputAdornment, Alert } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import { Button } from '../components/styles/button.styled'
import { AdminStyled } from '../components/styles/admin.styled'
import { AlertStyled } from '../components/styles/alert.styled'
import axios from 'axios'
import { UserContext } from '../context/user/UserContext'

export default function Admin() {
    const [junior, setJunior] = useState({})
    const [standard, setStandard] = useState({})
    const [senior, setSenior] = useState({})
    const [alert, setAlert] = useState(false)
    const { user } = useContext(UserContext)

    // *** FETCH PAYGRADES ***
    useEffect(() => {
        const fetchPaygrades = async() => {
            try {
                const res = await axios.get('http://localhost:8000/api/paygrades/')
                setJunior(res.data.find(data => data.type === "Junior"))
                setStandard(res.data.find(data => data.type === "Standard"))
                setSenior(res.data.find(data => data.type === "Senior"))
            } catch (err) {
                console.error(err.response.data)
            }
        }
        fetchPaygrades()
    }, [])

    // *** UPDATE PAYGRADE ***
    const updatePaygrades = async(paygrade) => {
        try {
            await axios.put(`http://localhost:8000/api/paygrades/update/${user._id}`, paygrade)
            displayAlert()
        } catch (err) {
            console.error(err.response.data)
        }
    }

    // *** DISPLAY ALERT ON SUCCESSFUL UPDATE ***
    const displayAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    return (
        <>
            {alert && 
                <AlertStyled>
                    <Alert severity="success" onClose={() => {setAlert(false)}}>
                        Paygrade updated
                    </Alert>
                </AlertStyled>}

            <Navbar />            
            
            <AdminStyled>
                <InputLabel htmlFor="junior">
                    Junior
                </InputLabel>
                <TextField
                    id="junior"
                    value={junior.salary || ''}
                    onChange={(e) => setJunior({...junior, salary: e.target.value})}
                    InputProps={{
                        startAdornment:<InputAdornment position="start">£</InputAdornment>
                    }}/>
                <Button type="submit" onClick={() => updatePaygrades(junior)}>Update</Button>
            
                <InputLabel htmlFor="standard">
                    Standard
                </InputLabel>
                <TextField
                    id="standard"
                    value={standard.salary || ''}
                    onChange={(e) => setStandard({...standard, salary: e.target.value})}
                    InputProps={{
                        startAdornment:<InputAdornment position="start">£</InputAdornment>
                    }}/>
                <Button type="submit" onClick={() => updatePaygrades(standard)}>Update</Button>

                <InputLabel htmlFor="senior">
                    Senior
                </InputLabel>
                <TextField
                    id="senior"
                    value={senior.salary || ''}
                    onChange={(e) => setSenior({...senior, salary: e.target.value})}
                    InputProps={{
                        startAdornment:<InputAdornment position="start">£</InputAdornment>
                    }}/>
                <Button type="submit" onClick={() => updatePaygrades(junior)}>Update</Button>
            </AdminStyled>
        </>
    )
}