import styled from "styled-components"

export const Table = styled.table`
width: 80%;
margin: 10px auto;
border-spacing: 0;
border-collapse: collapse;

tr {
    height: 40px; 
}

th, td {
    padding-left: 10px;
}

thead tr {
    background-color: #34495e
}

thead th {
    text-align: left;
    color: #eee;
} 

tbody tr {
    :nth-child(even) {
        background-color: #eee;
    }

    :nth-child(odd) {
        background-color: #f7f7f7
    }

    :hover {
        background-color: #ddd;
        cursor: pointer;
    }
}
`