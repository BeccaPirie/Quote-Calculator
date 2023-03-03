import { ResourceFormStyled } from "./styles/resourceForm.styled"
export default function PhysicalResource() {
    return(
        <ResourceFormStyled>
            <label htmlFor="pr_name">Resource:</label>
            <input
            type="text"
            id="pr_name"/>

            <div className="radio-group">
                <legend>Type of Cost:</legend>
                <input
                type="radio"
                id="one-off"
                name="payment-type"
                value="One-off"/>
                <label htmlFor="one-off">One-off</label><br/>
                <input
                type="radio"
                id="weekly-payments"
                name="payment-type"
                value="Weekly Payments"/>
                <label htmlFor="weekly-payments">Weekly payments</label><br/>
                <input
                type="radio"
                id="monthly-payments"
                name="payment-type"
                value="Monthly Payments"/>
                <label htmlFor="monthly-payments">Monthly Payments</label><br/>
            </div>
            
            <label htmlFor="cost">Cost</label>
            <span>£</span>
            <input
            type="number"
            id="cost"
            />
            

            <button>Add</button>
        </ResourceFormStyled>
    )
}