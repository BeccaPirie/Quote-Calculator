import { ResourceForm } from "../components/styles/resourceForm.styled"
import { useState, useContext, useEffect } from "react"
import Navbar from "../components/Navbar"
import PhysicalResource from "../components/PhysicalResource"
import HumanResource from "../components/HumanResource"
import ResourceTable from "../components/ResourceTable"
import { ButtonStyled } from "../components/styles/button.styled"
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
    const [quoteTotal, setQuoteTotal] = useState(0)
    const { user } = useContext(UserContext)
    const { quotes } = useContext(QuoteContext) || []
    const resourceTypes = ["Physical Resource", "Human Resource"]
    const quoteId = useParams().id

    // *** FETCH QUOTE IF ID PARAM ***
    useEffect(() => {
        const fetchQuote = async() => {
            if(quoteId) {
                const res = await axios.get(`http://localhost:8000/api/quotes/quote/${user._id}/${quoteId}`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                setResources(res.data.humanResources.concat(res.data.physicalResources))
            }
        }
        fetchQuote()
    }, [user, quoteId, quotes])

    // *** TIMEOUT FUNCTION FOR DISPLAYING ALERT ***
    const displayAlert = (alertText) => {
        setAlertText(alertText)
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    // *** CHANGE RESOURCE TYPE SELECTED ***
    const resourceTypeChange = (e) => {
        setNewResource({...newResource, type: e.target.value})
        setOpenForm(true)
    }

    // *** RESOURCE FORM SUBMIT ***
    const onSubmit = (e) => {
        e.preventDefault()
        // TODO form validation
        if(newResource.type === resourceTypes[1]) {
            if (newResource.workers < 1) {
                displayAlert('Please add at least one worker')
                return
            }
        }
        // add object to resources array to display in table
        setResources(resources => [...resources, newResource])
        setNewResource({type:newResource.type}) 
    }

    // *** CALCULATE QUOTE ***
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

    // *** REMOVE ALL RESOURCES FROM RESOURCE TABLE
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
                        <div className={newResource.type === resourceTypes[0] ? "resource-form pr-form" : "resource-form"}>
                            {newResource.type === resourceTypes[0] && <PhysicalResource resource={newResource} setResource={setNewResource}/>}
                            {newResource.type === resourceTypes[1] && <HumanResource resource={newResource} setResource={setNewResource}/>}
                        </div>
                        <ButtonStyled type="submit">Add</ButtonStyled>
                    </Collapse>
                </ResourceForm>

                {resources.length > 0 && <ResourceTable resources={resources} setResources={setResources}/>}

                <ButtonGroup className="btn-container" variant="contained">
                    <ButtonStyled onClick={() => calculateQuote(true)}>Calculate Quote</ButtonStyled>
                    {(user && user.isAdmin) && 
                    <ButtonStyled className="admin" onClick={() => calculateQuote(false)}>Calculate Quote Without Fudge Factor</ButtonStyled>
                    }
                </ButtonGroup>

                <ButtonStyled onClick={() =>clearQuote()}>Clear All</ButtonStyled>

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