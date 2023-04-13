import styled from 'styled-components'

export const Container = styled.div`
width: 100vw;

h3 {
    margin: 20px;
}

.btn-container {
    margin-left: 10%;
    box-shadow: none;

    button {
        margin-right: 10px;
        width: 150px;
    }

    .admin {
        background-color: #f0cb46;
    }
}

.clear-btn {
    display: block;
    margin-top: 15px;
    margin-left: 10%;
    background-color: #f06060;
}

.info {
    width: 95%;
    margin: auto;
}

.save-quote-btn {
    margin: 25px 50px;
    float: right;
}
`