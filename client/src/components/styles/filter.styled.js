import styled from "styled-components"

export const FilterStyled = styled.form`
width: 80%;
margin: 50px auto 15px;

input[type="text"] {
    width: calc(100% - 75px);
    padding: 7px;
    padding-right: 65px;

    :focus {
        outline: none;
    }
}

button {
    margin-left: -59px;
    padding: 8px;
    background-color: #34495e;
    color: white;
    border: none;
}
`