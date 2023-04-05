import styled from "styled-components";

export const ResourceForm = styled.form`
width: 80%;
margin: 20px auto;
background-color: #f4f4f4;
overflow: auto;
display: block;

.resource-type {
    background-color: #ddd;
    padding: 15px 20px;

    .expand {
        float: right;
        margin-top: 15px;
    }
}

.resource-form {
    padding: 20px;
    height: 40vh;
}

#resource-type-select, #pay-grade-select {
    width: 150px;
}

.input-container {
    margin-bottom: 20px;
}

button[type="submit"] {
    float: right;
    margin: 0 15px 10px 0;
}
`