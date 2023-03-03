import QuoteTableRow from "./QuoteTableRow"
import { Table } from "./styles/table.styled"

const quotes = [
    {name: "Quote One"},
    {name: "Quote Two"},
    {name: "Quote Three"}
]

export default function QuoteTable() {
    return(
        <Table>
            <thead>
                <tr>
                    <th>Quote</th>
                </tr>
            </thead>
            <tbody>
                {quotes.map(quote => {
                    return <QuoteTableRow quote={quote} />
                })}
            </tbody>
        </Table>
    )
}