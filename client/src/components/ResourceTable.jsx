import { Table } from "./styles/table.styled";
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function ResourceTable({resources, setNewResource, setBtnText}) {

    const editResource = (resource) => {
        setNewResource(resource)
        setBtnText('Save')
    }

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
                return <tr key={index}>
                    
                    {resource.type === 'Physical Resource' ?
                    <>
                        <td>{resource.name}</td>
                        <td>{`${resource.costType} of £${resource.cost}`}</td>
                    </> :
                    <>
                        <td>{`x${resource.workers} ${resource.payGrade}s`}</td>
                        <td>{`${resource.time} hours`}</td>
                    </>}
                    <td>
                        <Tooltip title="Edit">
                            <IconButton aria-label="edit" onClick={() => editResource(resource)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={() => deleteResource(resource)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </td>

                </tr>
            //     if(resource.type === "Physical Resource")
            //     return <tr key={index}>
            //         <td>{resource.name}</td>
            //         
            //         <td>
            //             <Tooltip title="Delete">
            //                 <IconButton aria-label="delete" onClick={() => deleteResource(resource)}>
            //                     <DeleteIcon />
            //                 </IconButton>
            //             </Tooltip>
            //         </td>
            //     </tr>
            //     else return <tr key={index}>
            //     <td>{`x${resource.workers} ${resource.payGrade}s`}</td>
            //     <td>{`${resource.time} hours`}</td>
            //     <td>
            //         <Tooltip title="Edit">
            //             <IconButton aria-label="edit" onClick={() => editResource(resource)}>
            //                 <EditIcon />
            //             </IconButton>
            //         </Tooltip>
            //         <Tooltip title="Delete">
            //             <IconButton aria-label="delete" onClick={() => deleteResource(resource)}>
            //                 <DeleteIcon />
            //             </IconButton>
            //         </Tooltip>
            //     </td>
            // </tr>
            })}
        </tbody>
    </Table>
    )
}