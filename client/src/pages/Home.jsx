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

export default function Home() {
    const [newResource, setNewResource] = useState({})
    const [resources, setResources] = useState([])
    const [showBudget, setShowBudget] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const { user } = useContext(UserContext)

    const resourceTypes = ["Physical Resource", "Human Resource"]

    // function for when resource type is changed
    const resourceTypeChange = (e) => {
        setNewResource({...newResource, type: e.target.value})
        setOpenForm(true)
    }

    // functioned called on form submit
    const onSubmit = (e) => {
        e.preventDefault()
        // add object to resources array
        setResources(resources => [...resources, newResource])
        setNewResource({type:newResource.type})
    }

    // send resources to server to calculate quote
    const calculateQuote = () => {
        // then
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
                        {openForm && newResource.type !== undefined ?
                            <ExpandLess onClick={() => setOpenForm(false)}/>
                             : <ExpandMore onClick={() => setOpenForm(true)}/>}
                    </Box>


                    <Collapse in={openForm && newResource.type !== undefined} timeout="auto">
                        <div className="resource-form">
                            {newResource.type === resourceTypes[0] && <PhysicalResource resource={newResource} setResource={setNewResource}/>}
                            {newResource.type === resourceTypes[1] && <HumanResource resource={newResource} setResource={setNewResource}/>}
                        </div>
                        <Button type="submit">Add</Button>
                    </Collapse>
                </ResourceForm>

                {resources.length > 0 && <ResourceTable resources={resources}/>}

                <Button onClick={calculateQuote}>Calculate Quote</Button>
                {(user && user.admin) && <Button onClick={calculateQuoteAdmin}>Calculate Quote Without Fudge Factor</Button>}

                {showBudget && <Quote />}
            </Container>
        </>
    )
}