import { ResourceFormStyled } from "./styles/resourceForm.styled";

export default function HumanResource() {
    return(
        <ResourceFormStyled>
            <select>
                <option value="" selected="selected" disabled>Select pay grade</option>
                <option value="Junior">Juniors</option>
                <option value="Standard">Standard</option>
                <option value="Senior">Senior</option>
            </select>

            <input
            type="number"
            placeholder="Number of workers"/>

            <input
            type="number"
            placeholder="Time required"/>

            <button>Add</button>
        </ResourceFormStyled>
    )
}