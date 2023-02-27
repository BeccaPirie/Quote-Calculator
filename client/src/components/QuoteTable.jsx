import QuoteListItem from "./QuoteListItem"
import { QuoteListStyled } from "./styles/quoteList.styled"

const quotes = [
    {name: "Quote One"},
    {name: "Quote Two"},
    {name: "Quote Three"}
]

export default function QuoteTable() {
    return(
        <QuoteListStyled>
            <tr>
                <th>Quote</th>
            </tr>

            {quotes.map(quote => {
                return <QuoteListItem quote={quote} />
            })}
        </QuoteListStyled>
    )
}