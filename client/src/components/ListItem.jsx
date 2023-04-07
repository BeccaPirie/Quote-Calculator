import { ListItem, ListItemIcon,
ListItemText, Checkbox, IconButton, Tooltip, Button, ListItemAvatar} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useContext } from 'react'
import { UserContext } from "../context/user/UserContext"
import { QuoteContext } from "../context/quotes/QuoteContext"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios'

export default function QuoteItem({quote, checkOnChange, subtask, show, setShow}) {
    const { user } = useContext(UserContext)
    const { dispatch } = useContext(QuoteContext)

    const editQuote = (quote) => {
        console.log("Editing quote " + quote.name)
    }

    const deleteQuote = async(quote) => {
        try {
            await axios.delete(`http://localhost:8000/api/quotes/delete/${user._id}/${quote._id}`)
            dispatch({type: "DELETE_QUOTE", payload: quote._id})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return (
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
                {!subtask &&
                (show ? <ExpandLess onClick={() => setShow(false)}/> : <ExpandMore onClick={() => setShow(true)}/>)}
            </>
        }>
            <ListItemAvatar>
                <ListItemIcon>
                    <Checkbox
                        // edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': quote._id }}
                        onChange={e => checkOnChange(e, quote)}
                    />
                </ListItemIcon>
            </ListItemAvatar>

            <ListItemText primary={`${quote.name} - £${quote.quote}`}/>
        </ListItem>
    )
}