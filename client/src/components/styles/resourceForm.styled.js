import styled from "styled-components";

export const ResourceForm = styled.form`
width: 80%;
margin: 20px auto;
background-color: #f4f4f4;
overflow: auto;

.resource-type {
    background-color: #ddd;
    padding: 5px 20px 10px 20px;

    legend {
        margin-top: 0;
    }
}

.resource-form {
    padding: 0 20px;
    height: 30vh;
}

input, select {
    :focus {
        outline: none;
    }
}

label:not(.radio-group label), legend {
    display: block;
    margin-top: 15px;
    font-weight: bold;
}

select {
    padding: 5px;
    width: 170px;
    border: none;
}

input[type="text"] {
    width: 75%;
}

input[type="number"] {
    width: 20%;
}

input[type="text"], input[type="number"] {
    padding: 3px;
    border: none;
    border-bottom: 2px solid black;
    background-color: #f4f4f4;
}

#hours-span {
    margin-left: 5px;
}

button[type="submit"] {
    float: right;
    margin: 0 15px 10px 0;
}
`