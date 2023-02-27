import styled from "styled-components"

export const QuoteTableStyled = styled.table`
width: 80%;
margin: 10px auto;
border-spacing: 0;
border-collapse: collapse;

th {
    text-align: left;
    color: #eee;
}

th, td {
    padding-left: 10px;
}

tr {
    height: 40px;

    :nth-child(even) {
        background-color: #eee;
    }

    :first-child {
        background-color: #34495e;
    }

    :hover:not(:first-child) {
        background-color: #ddd;
        cursor: pointer;
    }
}



`