import styled from "styled-components"

export const ResourceFormStyled = styled.form`
padding: 0 20px;

input {
    :focus {
        outline: none;
    }
}

label:not(.radio-group label), legend {
    display: block;
    margin-top: 15px;
    font-weight: bold;
}

button {
    display: block;
    float: right;
    margin-top: 10px;
}

#hours-span {
    margin-left: 5px;
}

// input[type="text"], input[type="number"], button, select {
//     display: block;
// }

`