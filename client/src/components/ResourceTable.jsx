import { QuoteTableStyled } from "./styles/quoteTable.styled";
export default function ResourceTable() {
    return(
        <QuoteTableStyled>
        <tr>
            <th>Resources</th>
            <th></th>
            <th></th>
        </tr>
        
        <tr>
            <td>x2 Juniors</td>
            <td>300 hours</td>
            <td><button>Remove</button></td>
        </tr>
        <tr>
            <td>Laptops</td>
            <td>One-off cost of £5000</td>
            <td><button>Remove</button></td>
        </tr>
    </QuoteTableStyled>
    )
}