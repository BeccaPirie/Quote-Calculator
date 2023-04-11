import Navbar from "../components/Navbar";
import QuoteList from "../components/QuotesList";
import { ListStyled } from "../components/styles/quotesList.styled"
import { QuoteContext } from "../context/quotes/QuoteContext"
import { UserContext } from "../context/user/UserContext"
import { List} from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { ButtonStyled } from '../components/styles/button.styled'

export default function Quotes() {
    const { quotes } = useContext(QuoteContext)
    const { user } = useContext(UserContext)
    const [selected, setSelected] = useState([])
    const [mainTasks, setMainTasks] = useState([])

    // TODO *** COMBINE QUOTES ***
    const combineQuotes = () => {
        console.log("combine button click")
    }

    // *** FETCH QUOTES TO DISPLAY IN MAIN LIST ***
    useEffect(() => {
        const fetchMainTasks = async() => {
            if(quotes.length > 0) {
                const filter = quotes.filter(quote => quote.mainTaskId === '')
                setMainTasks(filter)
            }
        }
        fetchMainTasks()
    }, [quotes, user._id])

    return(
        <>
            <Navbar />

            <ListStyled>
                <h2>Your Quotes</h2>
                <List>
                {mainTasks.length > 0 && mainTasks.map((quote) => {
                    const subtasks = quotes.filter(q => q.mainTaskId === quote._id)
                    return <QuoteList key={quote._id} quote={quote} subtasks={subtasks} selected={selected} setSelected={setSelected}/>
                })}
                </List>

                {selected.length > 1 &&
                <ButtonStyled className="combine-btn" onClick={combineQuotes}>Combine</ButtonStyled>}
        </ListStyled>
       </>
    )
}