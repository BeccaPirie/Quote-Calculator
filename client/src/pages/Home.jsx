import { ResourceForm } from "../components/styles/resourceForm.styled"
import { useState } from "react"
import Navbar from "../components/Navbar"
import PhysicalResource from "../components/PhysicalResource"
import HumanResource from "../components/HumanResource"
import ResourceTable from "../components/ResourceTable"
import { Link } from "react-router-dom"
import { Button } from "../components/styles/button.styled"
import { Container } from "../components/styles/container.styled"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { UserContext } from '../context/user/UserContext';

export default function Home() {
    const [newResource, setNewResource] = useState({})
    const [resources, setResources] = useState([])
    const { user } = useContext(UserContext)
    console.log(user)

    const resourceTypes = ["Physical Resource", "Human Resource"]

    // functioned called on form submit
    const onSubmit = (e) => {
        e.preventDefault()
        // add object to resources array
        setResources(resources => [...resources, newResource])
        setNewResource({type:newResource.type})
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
                                margin="normal"
                                onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                            >
                                {resourceTypes.map(type => {
                                    return <MenuItem value={type}>{type}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>

                    <div className="resource-form">
                        {newResource.type === resourceTypes[0] && <PhysicalResource resource={newResource} setResource={setNewResource}/>}
                        {newResource.type === resourceTypes[1] && <HumanResource resource={newResource} setResource={setNewResource}/>}
                    </div>

                    {newResource.type !== "" && 
                    <>
                        {/* <Button>Add to subtask</Button> */}
                        <Button type="submit">Add</Button>
                    </>
                        }  
                </ResourceForm>

                {resources.length > 0 && <ResourceTable resources={resources}/>}

                <Link to="/quote">
                    <Button>Calculate Quote</Button>
                </Link>
            </Container>
        </>
    )
}