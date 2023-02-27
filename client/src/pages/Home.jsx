import { QuoteStyled } from "../components/styles/quote.styled"
import { useState } from "react"
import Navbar from "../components/Navbar"
import PhysicalResource from "../components/PhysicalResource"
import HumanResource from "../components/HumanResource"
import ResourceTable from "../components/ResourceTable"
import { Link } from "react-router-dom"

export default function Home() {
    const [resourceType, setResourceType] = useState("")

    return(
        <>
            <Navbar />
            
            <QuoteStyled>
            <select onChange={(e) => setResourceType(e.target.value)}>
                <option value="" selected="selected" disabled>Select Resource Type</option>
                <option value="Physical Resource">Physical Resource</option>
                <option value="Human Resource">Human Resource</option>
            </select>

            {resourceType === "Physical Resource" && <PhysicalResource />}
            {resourceType === "Human Resource" && <HumanResource />}
            </QuoteStyled>

            <ResourceTable />

            <Link to="/quote">
                <button>Get Quote</button>
            </Link>
        </>
    )
}