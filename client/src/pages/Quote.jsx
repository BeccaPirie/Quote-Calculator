import Navbar from "../components/Navbar";
import ResourceTable from "../components/ResourceTable";

export default function Quote() {
    return(
        <>
        <Navbar />
        <ResourceTable />
        <h3>Estimated budget: £17,000</h3>
        <button>Save Quote</button>
        </>
    )
}