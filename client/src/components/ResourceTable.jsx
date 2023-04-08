import { Table } from "./styles/table.styled"
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function ResourceTable({resources, setResources}) {

    // **** REMOVE RESOURCE ****
    const deleteResource = (index) => {
        setResources(resources.filter((_, j) => j !== index))
    }

    return(
        <Table>
        <thead>
            <tr>
                <th>Resources</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {resources.map((resource, index) => {
                return <tr key={index}>
                    
                    {resource.type === 'Physical Resource' ?
                    <>
                        <td>{resource.name}</td>
                        <td>{`${resource.costType} of £${resource.cost}`}</td>
                    </> :
                    <>
                        <td>{`x${resource.workers} ${resource.paygrade}s`}</td>
                        <td>{`${resource.time} hours`}</td>
                    </>}
                    <td>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={() => deleteResource(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </td>

                </tr>
            })}
        </tbody>
    </Table>
    )
}