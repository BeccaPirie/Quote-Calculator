// this page should display list of users saved quotes

import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import QuoteList from "../components/QuoteTable";

export default function Profile() {
    return(
        <>
            <Navbar />
            <Filter />
            <QuoteList />
        </>
    )
}