import { FilterStyled } from "./styles/filter.styled"

export default function Filter() {
    return (
        <FilterStyled>
            <input
                type="text"
                placeholder="Filter quotes"
            />
            <button>
                Search
            </button>
        </FilterStyled>
    )
}