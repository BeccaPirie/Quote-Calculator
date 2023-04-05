import { TextField, InputLabel, InputAdornment, Alert } from '@mui/material'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Button } from '../components/styles/button.styled'
import { AdminStyled } from '../components/styles/admin.styled'
import { AlertStyled } from '../components/styles/alert.styled'

export default function Admin() {
    const [junior, setJunior] = useState({type: "Junior", salary: "10000"})
    const [standard, setStandard] = useState({type: "Standard", salary: "20000"})
    const [senior, setSenior] = useState({type: "Senior", salary: "40000"})
    const [alert, setAlert] = useState(false)

    const updatePaygrades = () => {
        displayAlert()
    }

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
                        Paygrades updated
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
            
            <div className="btn-div">
                <Button type="submit" onClick={updatePaygrades}>Update</Button>
            </div>
            </AdminStyled>
        </>
    )
}