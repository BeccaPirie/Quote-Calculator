import { QuoteStyled } from "../components/styles/quote.styled"
import { useState } from "react"
import Navbar from "../components/Navbar"
import PhysicalResource from "../components/PhysicalResource"
import HumanResource from "../components/HumanResource"
import ResourceTable from "../components/ResourceTable"
import { Link } from "react-router-dom"
import { MainContainer } from "../components/styles/mainContainer"

export default function Home() {
    const [resourceType, setResourceType] = useState("")

    return(
        <MainContainer>
            <Navbar />
            
            <h3>Fill in the form below to add a resource to your quote</h3>

            <QuoteStyled>
                <div className="resource-type">
                    <legend>Type of Resource:</legend>
                    <select onChange={(e) => setResourceType(e.target.value)}>
                        <option value="" selected="selected" disabled>Select Resource Type</option>
                        <option value="Physical Resource">Physical Resource</option>
                        <option value="Human Resource">Human Resource</option>
                    </select>
                </div>
                {resourceType === "Physical Resource" && <PhysicalResource />}
                {resourceType === "Human Resource" && <HumanResource />}
            </QuoteStyled>

            {/* Show table if resources > 0 */}
            <ResourceTable />

            <Link to="/quote">
                <button>Calculate Quote</button>
            </Link>
        </MainContainer>
    )
}