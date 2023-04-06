import { ResourceForm } from "../components/styles/resourceForm.styled"
import { useState } from "react"
import Navbar from "../components/Navbar"
import PhysicalResource from "../components/PhysicalResource"
import HumanResource from "../components/HumanResource"
import ResourceTable from "../components/ResourceTable"
import { Button } from "../components/styles/button.styled"
import { Container } from "../components/styles/container.styled"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { UserContext } from '../context/user/UserContext';
import Quote from "../components/Quote"
import Collapse from "@mui/material/Collapse"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Alert, ButtonGroup } from "@mui/material"
import { AlertStyled } from "../components/styles/alert.styled"
import axios from 'axios'

export default function Home() {
    const [newResource, setNewResource] = useState({})
    const [resources, setResources] = useState([])
    const [showBudget, setShowBudget] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [alert, setAlert] = useState(false)
    const [btnText, setBtnText] = useState('Add')
    const { user } = useContext(UserContext)
    const [quoteTotal, setQuoteTotal] = useState(0)

    const resourceTypes = ["Physical Resource", "Human Resource"]

    // timeout function for displaying alert
    const displayAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    // function for when resource type is changed
    const resourceTypeChange = (e) => {
        if(btnText === 'Save') {
            setBtnText('Add')
        }
        setNewResource({...newResource, type: e.target.value})
        setOpenForm(true)
    }

    // function called on form submit
    const onSubmit = (e) => {
        e.preventDefault()
        if(btnText === 'Add') {
            // add object to resources array
            setResources(resources => [...resources, newResource])   
        }
        else if(btnText === 'Save') {
            // find the resource in resources and update
            setBtnText('Add')
        }
        setNewResource({type:newResource.type}) 
    }

    // send resources to server to calculate quote
    const calculateQuote = () => {
        if(resources.length === 0) {
            displayAlert()
            return
        }

        try {
            const res = axios.post('http://localhost:8000/api/quotes/calc-quote')
            setQuoteTotal(res.data)
        } catch (err) {
            console.error(err.response.data)
        }

        setNewResource({})
        setOpenForm(false)
        setShowBudget(true)
    }

    // send resources to server to calculate quote without fudge factor
    const calculateQuoteAdmin = () => {
        setOpenForm(false)
        setShowBudget(true)
    }

    return(
        <>
            {/* at least one human resource */}
            {alert &&
                <AlertStyled>
                    <Alert severity="info" onClose={() => {setAlert(false)}}>
                        Please add at least one resource to calculate quote
                    </Alert>
                </AlertStyled>}

            <Navbar />
                <Container>
                <h3>Fill in the form below to add a resource to your quote</h3>

                <ResourceForm onSubmit={(e) => onSubmit(e)}>
                    <Box className="resource-type">
                        <FormControl>
                            <InputLabel id="resource-type-label">Resource Type</InputLabel>
                            <Select
                                labelId="resource-type-label"
                                id="resource-type-select"
                                value={newResource.type || ''}
                                label="Resource Type"
                                onChange={(e) => resourceTypeChange(e)}
                            >
                                {resourceTypes.map((type, i) => {
                                    return <MenuItem key={i} value={type}>{type}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {newResource.type && 
                        <>
                            {openForm ?
                            <ExpandLess className="expand" onClick={() => setOpenForm(false)}/>
                             : <ExpandMore className="expand" onClick={() => setOpenForm(true)}/>}
                        </>}
                    </Box>

                    <Collapse in={openForm && newResource.type !== undefined} timeout="auto">
                        <div className="resource-form">
                            {newResource.type === resourceTypes[0] && <PhysicalResource resource={newResource} setResource={setNewResource}/>}
                            {newResource.type === resourceTypes[1] && <HumanResource resource={newResource} setResource={setNewResource}/>}
                        </div>
                        <Button type="submit">{btnText === 'Add' ? 'Add' : 'Save'}</Button>
                    </Collapse>
                </ResourceForm>

                {resources.length > 0 && <ResourceTable resources={resources} setNewResource={setNewResource} setBtnText={setBtnText}/>}

                <ButtonGroup className="btn-container" variant="contained">
                    <Button onClick={calculateQuote}>Calculate Quote</Button>
                    {(user && user.admin) && 
                    <Button className="admin" onClick={calculateQuoteAdmin}>Calculate Quote Without Fudge Factor</Button>
                    }
                </ButtonGroup>

                {showBudget && <Quote total={quoteTotal} resources={resources}/>}
            </Container>
        </>
    )
}