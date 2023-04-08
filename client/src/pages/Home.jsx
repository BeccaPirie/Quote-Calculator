import { ResourceForm } from "../components/styles/resourceForm.styled"
import { useState, useContext, useEffect } from "react"
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
import { UserContext } from '../context/user/UserContext';
import { QuoteContext } from '../context/quotes/QuoteContext';
import Quote from "../components/Quote"
import Collapse from "@mui/material/Collapse"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Alert, ButtonGroup } from "@mui/material"
import { AlertStyled } from "../components/styles/alert.styled"
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Home() {
    const [newResource, setNewResource] = useState({})
    const [resources, setResources] = useState([])
    const [showBudget, setShowBudget] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [btnText, setBtnText] = useState('Add')
    const [quoteTotal, setQuoteTotal] = useState(0)
    const { user } = useContext(UserContext)
    const { quotes } = useContext(QuoteContext) || []
    const resourceTypes = ["Physical Resource", "Human Resource"]
    const quoteId = useParams().id

    useEffect(() => {
        const fetchQuote = async() => {
            if(quoteId) {
                const res = await axios.get(`http://localhost:8000/api/quotes/quote/${user._id}/${quoteId}`)
                setResources(res.data.humanResources.concat(res.data.physicalResources))
            }
        }
        fetchQuote()
    }, [user._id, quoteId, quotes])

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
        console.log(newResource)
        if(btnText === 'Add') {
            // TODO form validation

            if(newResource.type === resourceTypes[1]) {
                if (newResource.workers < 1) {
                    displayAlert('Please add at least one worker')
                    return
                }
            }
            
            // add object to resources array to display in table
            setResources(resources => [...resources, newResource])
        }
        // TODO
        else if(btnText === 'Save') {
            // find the resource in resources and update
            // ahhhhhh
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

        if(resources.filter(resource => resource.type === resourceTypes[1]).length === 0) {
            displayAlert('Please add at least one human resource to calculate a quote')
            return
        }

        const resourcesObj = {
            resources: resources,
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

    // function to clear quote when clear button clicked
    const clearQuote = () => {
        setNewResource({})
        setResources([])
        setShowBudget(false)
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

                {resources.length > 0 && <ResourceTable resources={resources} setResources={setResources} setNewResource={setNewResource} setBtnText={setBtnText}/>}

                <ButtonGroup className="btn-container" variant="contained">
                    <Button onClick={() => calculateQuote(true)}>Calculate Quote</Button>
                    {(user && user.isAdmin) && 
                    <Button className="admin" onClick={() => calculateQuote(false)}>Calculate Quote Without Fudge Factor</Button>
                    }
                </ButtonGroup>

                <Button onClick={() =>clearQuote()}>Clear All</Button>

                {showBudget &&
                <Quote
                    total={quoteTotal}
                    resources={resources}
                    displayAlert={displayAlert}
                />}
            </Container>
        </>
    )
}