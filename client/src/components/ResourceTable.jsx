import { Table } from "./styles/table.styled";
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ResourceTable({resources}) {

    const deleteResource = (resource) => {
        resources = resources.filter(thisResource => thisResource.id === resource.id)
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
                (resource.type === "Physical Resource") ?
                <tr key={index}>
                    <td>{resource.name}</td>
                    <td>{`${resource.costType} of £${resource.cost}`}</td>
                    <td>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={() => deleteResource(resource)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </td>
                </tr>
                :<tr key={index}>
                <td>{`x${resource.workers} ${resource.payGrade}s`}</td>
                <td>{`${resource.time} hours`}</td>
                <td>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={() => deleteResource(resource)}>
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