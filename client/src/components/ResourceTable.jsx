import { Table } from "./styles/table.styled";

export default function ResourceTable({resources}) {
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
                if(resource.type === "Physical Resource")
                return <tr key={index}>
                    <td>{resource.name}</td>
                    <td>{`${resource.costType} of £${resource.cost}`}</td>
                    <td><button>Remove</button></td>
                </tr>
                else return <tr key={index}>
                <td>{`x${resource.workers} ${resource.payGrade}s`}</td>
                <td>{`${resource.time} hours`}</td>
                <td><button>Remove</button></td>
            </tr>
            })}
        </tbody>
    </Table>
    )
}