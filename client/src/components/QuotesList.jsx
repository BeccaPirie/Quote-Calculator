import { List} from '@mui/material'
import { useState } from 'react'
import Collapse from "@mui/material/Collapse"
import QuoteItem from "./ListItem"

export default function QuoteList({quote, subtasks, selected, setSelected}) {
    const [show, setShow] = useState(false)

    // **** HANDLE CHECKBOX CHANGE ****
    const checkOnChange = (e, thisQuote) => {
        if(e.target.checked) {
            setSelected([...selected, thisQuote])  
        }
        else if(!e.target.checked) {
            const filter = selected.filter(quote => quote._id !== thisQuote._id)
            setSelected(filter) 
        }       
    }

    return(  
        <div key={quote._id}>
            <QuoteItem quote={quote} checkOnChange={checkOnChange} subtask={false} show={show} setShow={setShow}/>

            <Collapse in={show} timeout="auto" unmountOnExit>
                <List>
                    {subtasks.length > 0 && subtasks.map(subtask => {
                        return(
                            <QuoteItem key={subtask._id} quote={subtask} checkOnChange={checkOnChange} subtask={true}/>
                        )
                    })}
                </List>
            </Collapse>
        </div>
    )
}