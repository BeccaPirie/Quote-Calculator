import Navbar from "../components/Navbar";
import ResourceTable from "../components/ResourceTable";
import { Button } from "../components/styles/button.styled";

export default function Quote() {
    const saveQuote = () => {
        // check if user is logged in
        // if not logged in, ask user to login
        // then save quote
    }

    return(
        <>
        <Navbar />
        {/* <ResourceTable /> */}
        <h3>Estimated budget: £17,000</h3>
        <Button onClick={saveQuote}>Save Quote</Button>
        </>
    )
}