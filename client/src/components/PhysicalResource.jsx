export default function PhysicalResource({resource, setResource}) {
    return(
        <>
            <label htmlFor="pr_name">Resource:</label>
            <input
                type="text"
                id="pr_name"
                required
                value={resource.name || ""}
                onChange={(e) => setResource({...resource, name: e.target.value})}
            />

            <div className="radio-group"
                required
                onChange={(e) => setResource({...resource, costType: e.target.value})}>
                <legend>Type of Cost:</legend>
                <input
                    type="radio"
                    id="one-off-payment"
                    name="payment-type"
                    value="One-off Payment"
                />
                <label htmlFor="one-off-payment">One-off Payment</label><br/>
                <input
                    type="radio"
                    id="weekly-payments"
                    name="payment-type"
                    value="Weekly Payments"
                />
                <label htmlFor="weekly-payments">Weekly Payments</label><br/>
                <input
                    type="radio"
                    id="monthly-payments"
                    name="payment-type"
                    value="Monthly Payments"
                />
                <label htmlFor="monthly-payments">Monthly Payments</label><br/>
            </div>
            
            <label htmlFor="cost">Cost</label>
            <span>£</span>
            <input
                type="number"
                id="cost"
                required
                value= {resource.cost || ""}
                onChange={(e) => setResource({...resource, cost: e.target.value})}
            />
        </>
    )
}