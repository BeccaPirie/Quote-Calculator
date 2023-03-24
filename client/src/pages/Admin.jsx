import { TextField, Button } from '@mui/material'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const placeholderData = [
    {type: "Junior", salary: "10000"},
    {type: "Standard", salary: "20000"},
    {type: "Senior", salary: "40000"}
]

export default function Admin() {
    const [junior, setJunior] = useState({type: "Junior", salary: "10000"})
    const [standard, setStandard] = useState({type: "Standard", salary: "20000"})
    const [senior, setSenior] = useState({type: "Senior", salary: "40000"})

    const updatePaygrades = () => {

    }

    return (
        <>
            <Navbar />
            <div>Admin only page</div>
                <TextField 
                    label= {junior.type}
                    value={junior.salary || ''}
                    onChange={(e) => setJunior({...junior, salary: e.target.value})}/>
            
                <TextField 
                    label= {standard.type}
                    value={standard.salary || ''}
                    onChange={(e) => setStandard({...standard, salary: e.target.value})}/>

                <TextField 
                    label= {senior.type}
                    value={senior.salary || ''}
                    onChange={(e) => setSenior({...senior, salary: e.target.value})}/>
            
            <Button onClick={updatePaygrades}>Update</Button>
        </>
    )
}