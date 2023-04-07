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
    // all resources to display in table
    const [resources, setResources] = useState([])
    // human resources
    const [humanResources, setHumanResources] = useState([])
    // physical resources
    const [physicalResources, setPhyscialResources] = useState([])
    const [showBudget, setShowBudget] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    // alert state
    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [btnText, setBtnText] = useState('Add')
    const [quoteTotal, setQuoteTotal] = useState(0)
    const { user } = useContext(UserContext)
    const resourceTypes = ["Physical Resource", "Human Resource"]

    // timeout function for displaying alert
    const displayAlert = (alertText) => {
        setAlertText(alertText)
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
            // TODO form validation
            if(newResource.type === resourceTypes[0]) {
                setPhyscialResources(resources => [...resources, newResource])
            }
            if(newResource.type === resourceTypes[1]) {
                if (newResource.workers < 1) {
                    displayAlert('Please add at least one worker')
                    return
                }
                setHumanResources(resources => [...resources, newResource])
            }
            
            // add object to resources array to display in table
            setResources(resources => [...resources, newResource])
        }
        // TODO
        else if(btnText === 'Save') {
            // find the resource in resources and update
            setBtnText('Add')
        }
        setNewResource({type:newResource.type}) 
    }

    // send resources to server to calculate quote
    const calculateQuote = async(ff) => {
        if(resources.length === 0) {
            displayAlert('Please add at least one resource to calculate a quote')
            return
        }

        if(humanResources.length === 0) {
            displayAlert('Please add at least one human resource to calculate a quote')
            return
        }

        const resourcesObj = {
            humanResources: humanResources,
            physicalResources: physicalResources,
            fudgeFactor: ff
        }

        try {
            const res = await axios.post(`http://localhost:8000/api/quotes/calc-quote`, resourcesObj)
            setQuoteTotal(res.data)
        } catch (err) {
            console.error(err.response.data)
        }

        setNewResource({})
        setOpenForm(false)
        setShowBudget(true)
    }

    return(
        <>
            {alert &&
                <AlertStyled>
                    <Alert severity="info" onClose={() => {setAlert(false)}}>
                        {alertText}
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
                    <Button onClick={() => calculateQuote(true)}>Calculate Quote</Button>
                    {(user && user.isAdmin) && 
                    <Button className="admin" onClick={() => calculateQuote(false)}>Calculate Quote Without Fudge Factor</Button>
                    }
                </ButtonGroup>

                {showBudget &&
                <Quote
                    total={quoteTotal}
                    physicalResources={physicalResources}
                    humanResources={humanResources}
                    displayAlert={displayAlert}
                />}
            </Container>
        </>
    )
}