import { ResourceFormStyled } from "./styles/resourceForm.styled";

export default function HumanResource() {
    return(
        <ResourceFormStyled>
            <legend>Pay grade:</legend>
            <select>
                <option value="" selected="selected" disabled>Select pay grade</option>
                <option value="Junior">Juniors</option>
                <option value="Standard">Standard</option>
                <option value="Senior">Senior</option>
            </select>


            <label htmlFor="workers">Number of workers:</label>
            <input
            type="number"
            id="workers"/>

            <label htmlFor="time">Time required (hours):</label>
            <input
            type="number"
            id="time"/>
            <span id="hours-span">hours</span>

            <button>Add</button>
        </ResourceFormStyled>
    )
}