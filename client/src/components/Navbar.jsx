import { NavbarStyled } from "./styles/navbar.styled"
import { Link } from "react-router-dom"

export default function Navbar() {
    return(
        <NavbarStyled>
            <div className="left">
                <h3>Quotes App</h3>
            </div>
            
            <div className="right">
                
                <ul>
                    {/* if not signed in */}
                    <Link to="/register">
                        <li>Sign up</li>
                    </Link>
                    <Link to="/login">
                        <li>Login</li>
                    </Link>

                    {/* if signed in */}
                    {/* <Link to="/profile">
                        <li>Profile</li>
                    </Link> */}
                </ul>
                
            </div>
        </NavbarStyled>
    )
}