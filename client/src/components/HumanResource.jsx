export default function HumanResource({resource, setResource}) {
    const payGrades = [
        {type: "Junior", salary: 20000},
        {type: "Standard", salary: 40000},
        {type: "Senior", salary: 60000}
    ]

    return(
        <>
            <legend>Pay grade:</legend>
            <select
                defaultValue="default"
                required
                onChange={(e) => setResource({...resource, payGrade: e.target.value})}>
                <option value="default" disabled>Select pay grade</option>
                {payGrades.map(payGrade => {
                    return <option value={payGrade.type}>{payGrade.type}</option>
                })}
            </select>

            <label htmlFor="workers">Number of workers:</label>
            <input
                type="number"
                id="workers"
                required
                value={resource.workers || ""}
                onChange={(e) => setResource({...resource, workers: e.target.value})}
            />

            <label htmlFor="time">Time required (hours):</label>
            <input
                type="number"
                id="time"
                required
                value={resource.time || ""}
                onChange={(e) => setResource({...resource, time: e.target.value})}
            />
            <span id="hours-span">hours</span>
        </>
    )
}