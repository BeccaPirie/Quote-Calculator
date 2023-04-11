import styled from 'styled-components'

export const NavbarStyled = styled.div`
width: 100vw;
height: 55px;
background-color: #34495e;
color: #fff;
display: flex;
position: sticky;
top: 0;
z-index: 100;
align-items: center;

.left {
    flex: 10;
    align-items: center;
    padding-left: 10px;
}

.right {
    flex: 2;

    ul {
        list-style-type: none;
        display: flex;
        padding-left: 0;
    }

    li {
        align-items: center;
        height: 35px;
        width: 60px;
        margin: 10px;
        line-height: 35px;
        padding: 0 15px;
        border-radius: 20px;
        border: 2px solid #fff;
        text-align: center;
        cursor: pointer;
    }
}

a {
    text-decoration: none;
    // cursor: default;
    color: #fff;
}

.menu-list {
    position: absolute;
    top: 50px;
    right: 20px;
    z-index: 100;

    ul {
        display: block;
        padding: 0;
    }

    li {
        padding: 8px 40px;
        border-radius: 0;
        width: 100%;
        margin: 0;
    }

    a {
        color: #000;
    }
}
`