import QuoteTableRow from "./QuoteTableRow"
import { QuoteTableStyled } from "./styles/quoteTable.styled"

const quotes = [
    {name: "Quote One"},
    {name: "Quote Two"},
    {name: "Quote Three"}
]

export default function QuoteTable() {
    return(
        <QuoteTableStyled>
            <tr>
                <th>Quote</th>
            </tr>

            {quotes.map(quote => {
                return <QuoteTableRow quote={quote} />
            })}
        </QuoteTableStyled>
    )
}