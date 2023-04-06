import styled from "styled-components"

export const LoginForm = styled.div`
width: 400px;
height: 400px;
margin: 10vh auto 0;
background-color: #34495e;
color: #ebebeb;
text-align: center;
padding-top: 50px;

h2 {
    margin-bottom: 5px;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    margin: auto;

    // input {
    //     margin: 10px;
    //     padding: 8px;
    //     border: 1px solid #ccc;

    //     :focus {
    //         outline: none;
    //     }
    // }

    input {
        background-color: #fff;
    }

    button {
        // width: 80px;
        padding: 12px;
        // border-radius: 10px;
        border: none;
        cursor: pointer;
        margin: 15px 0 10px;

        :hover {
            background-color: #c4c4c4;
        }
    }
}

a {
    color: #ebebeb;
}
`