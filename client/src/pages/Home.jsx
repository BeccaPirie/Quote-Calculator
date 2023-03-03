import { ResourceForm } from "../components/styles/resourceForm.styled"
import { useState } from "react"
import Navbar from "../components/Navbar"
import PhysicalResource from "../components/PhysicalResource"
import HumanResource from "../components/HumanResource"
import ResourceTable from "../components/ResourceTable"
import { Link } from "react-router-dom"
import { Button } from "../components/styles/button.styled"
import { Container } from "../components/styles/container.styled"

export default function Home() {
    const [newResource, setNewResource] = useState({})
    const [resources, setResources] = useState([])

    const resourceTypes = ["Physical Resource", "Human Resource"]

    // functioned called on form submit
    const onSubmit = (e) => {
        e.preventDefault()
        
        // add object to resources array
        setResources(resources => [...resources, newResource])
    }

    return(
        <>
            <Navbar />
                <Container>
                <h3>Fill in the form below to add a resource to your quote</h3>

                <ResourceForm onSubmit={(e) => onSubmit(e)}>
                    <div className="resource-type">
                        <legend>Type of Resource:</legend>
                        <select
                            defaultValue="default"
                            onChange={(e) => setNewResource({...newResource, type:e.target.value})}>
                            <option value="default" disabled>Select Resource Type</option>
                            {resourceTypes.map(resourceType => {
                                return <option value={resourceType}>{resourceType}</option>
                            })}
                        </select>
                    </div>

                    <div className="resource-form">
                        {newResource.type === resourceTypes[0] && <PhysicalResource resource={newResource} setResource={setNewResource}/>}
                        {newResource.type === resourceTypes[1] && <HumanResource resource={newResource} setResource={setNewResource}/>}
                    </div>

                    {newResource.type !== "" && 
                        <Button type="submit">Add</Button>}  
                </ResourceForm>

                {resources.length > 0 && <ResourceTable resources={resources}/>}

                <Link to="/quote">
                    <Button>Calculate Quote</Button>
                </Link>
            </Container>
        </>
    )
}