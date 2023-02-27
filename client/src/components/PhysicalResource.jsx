import { ResourceFormStyled } from "./styles/resourceForm.styled"
export default function PhysicalResource() {
    return(
        <ResourceFormStyled>
            <input
            type="text"
            placeholder="Name of Physical Resource"/>

            <input
            type="radio"
            id="one-off"
            name="payment-type"
            value="One-off"/>
            <label for="one-off">One-off</label><br/>
            <input
            type="radio"
            id="weekly-payments"
            name="payment-type"
            value="Weekly Payments"/>
            <label for="weekly-payments">Weekly payments</label><br/>
            <input
            type="radio"
            id="monthly-payments"
            name="payment-type"
            value="Monthly Payments"/>
            <label for="monthly-payments">Monthly Payments</label><br/>

            <span>£</span>
            <input
            type="number"
            placeholder="Cost"
            />

            <button>Add</button>
        </ResourceFormStyled>
    )
}