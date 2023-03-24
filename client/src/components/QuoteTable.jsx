import { Table } from "./styles/table.styled"
import { List, ListItem, ListItemButton, ListItemIcon,
ListItemText, Checkbox, IconButton, Tooltip, Button} from '@mui/material'
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

    const editClick = (quote) => {

    }

    const deleteClick = (quote) => {
        
    }

    return(
        <>
            <List>
                {quotes && quotes.map(quote => {
                    return(
                        <div>
                            <ListItem secondaryAction={
                                <>
                                    <Tooltip title="Edit">
                                        <IconButton edge="end" aria-label="edit" onClick={() => editClick(quote)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteClick(quote)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }>
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            // edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': '' }} // TODO change to id
                                        />
                                    </ListItemIcon>
                                </ListItemButton>

                                <ListItemText primary={quote.name}/>

                            </ListItem>
                        </div>
                    )
                })}
            </List>

            <Button variant="contained" disabled>Combine</Button>

            {/* <Table>
                <thead>
                    <tr>
                        <th>Quote</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map(quote => {
                        return (
                        <tr>
                            <td>{quote.name}</td>
                        </tr>)
                    })}
                </tbody>
            </Table> */}
        </>
    )
}