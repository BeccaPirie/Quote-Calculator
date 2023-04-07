import { NavbarStyled } from "./styles/navbar.styled"
import { Link } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../context/user/UserContext';

export default function Navbar() {
    const { user } = useContext(UserContext)

    return(
        <NavbarStyled>
            <div className="left">
                <Link to="/">
                    <h3>Quotes App</h3>
                </Link>
            </div>
            
            <div className="right">
                
                <ul>
                    {/* if not signed in */}
                    {!user &&
                    <>
                        <Link to="/register">
                            <li>Sign up</li>
                        </Link>
                        <Link to="/login">
                            <li>Login</li>
                        </Link>
                    </>}

                    {/* if signed in and not admin*/}
                    {(user && !user.isAdmin) &&
                    <>
                        <Link to="/quotes">
                            <li>Quotes</li>
                        </Link>
                        <Link to="/profile">
                            <li>Profile</li>
                        </Link>
                    </>}

                    {/* if signed in and admin*/}
                    {(user && user.isAdmin) &&
                    <>
                        <Link to="/quotes">
                            <li>Quotes</li>
                        </Link>
                        <Link to="/profile">
                            <li>Profile</li>
                        </Link>
                        <Link to="/admin">
                            <li>Admin</li>
                        </Link>
                    </>}
                </ul>
                
            </div>
        </NavbarStyled>
    )
}