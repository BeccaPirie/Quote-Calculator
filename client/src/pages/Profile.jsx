import Navbar from "../components/Navbar";
import QuoteList from "../components/QuotesList";
import { ListStyled } from "../components/styles/quotesList.styled"
import { QuoteContext } from "../context/quotes/QuoteContext"
import { List, Button} from '@mui/material'
import { useState, useContext } from 'react'

export default function Profile() {
    const { quotes, dispatch } = useContext(QuoteContext)
    const [selected, setSelected] = useState([])

    const combineQuotes = () => {
        console.log("combine button click")
    }

    return(
        <>
            <Navbar />

            <ListStyled>
                <List>
                {quotes.length > 0 && quotes.map((quote) => {
                    if(quote.mainTaskId !== '') return <></>
                    const subtasks = quotes.filter(q => q.mainTaskId === quote._id)
                    return <QuoteList quote={quote} subtasks={subtasks} selected={selected} setSelected={setSelected}/>
                })}
                </List>
            </ListStyled>

            {selected.length > 1 &&
            <Button variant="contained" onClick={combineQuotes}>Combine</Button>}
        </>
    )
}