import { ListStyled } from "./styles/quotesList.styled"
import { List, ListItem, ListItemIcon,
ListItemText, Checkbox, IconButton, Tooltip, Button, ListItemAvatar} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

const quotes = [
    {name: "Quote One"},
    {name: "Quote Two"},
    {name: "Quote Three"}
]

export default function QuoteTable() {
    const [selected, setSelected] = useState([])

    const editQuote = (quote) => {

    }

    const deleteQuote = (quote) => {
        
    }

    const checkOnChange = (e, thisQuote) => {
        if(e.target.checked) {
            setSelected([...selected, thisQuote])  
        }
        else if(!e.target.checked) {
            const filter = selected.filter(quote => quote.name !== thisQuote.name) // TODO change to id
            setSelected(filter) 
        }       
    }

    const combineQuotes = () => {

    }

    return(
        <>
            <ListStyled>
            <List>
                {quotes && quotes.map((quote, index) => {
                    return(
                        <div key={index}>
                            <ListItem secondaryAction={
                                <>
                                    <Tooltip title="Edit">
                                        <IconButton edge="end" aria-label="edit" onClick={() => editQuote(quote)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteQuote(quote)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }>
                                <ListItemAvatar>
                                    <ListItemIcon>
                                        <Checkbox
                                            // edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': '' }} // TODO change to id
                                            onChange={e => checkOnChange(e, quote)}
                                        />
                                    </ListItemIcon>
                                </ListItemAvatar>

                                <ListItemText primary={quote.name}/>

                            </ListItem>
                        </div>
                    )
                })}
            </List>
            </ListStyled>

            {selected.length > 1 &&
            <Button variant="contained" onClick={combineQuotes}>Combine</Button>}
        </>
    )
}