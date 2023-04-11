import { NavbarStyled } from "./styles/navbar.styled"
import { Link } from "react-router-dom"
import { useContext, useState } from 'react';
import { UserContext } from '../context/user/UserContext';
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
    const { user } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false)

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
                        <li onClick={() => setShowMenu(!showMenu)}>Profile</li>
                        <div className="menu-list">
                            {showMenu && <ProfileMenu setShowMenu={setShowMenu}/>}
                        </div>
                    </>}

                    {/* if signed in and admin*/}
                    {(user && user.isAdmin) &&
                    <>
                        <Link to="/quotes">
                            <li>Quotes</li>
                        </Link>
                        <li onClick={() => setShowMenu(!showMenu)}>Profile</li>
                        <div className="menu-list">
                            {showMenu && <ProfileMenu setShowMenu={setShowMenu}/>}
                        </div>
                        <Link to="/admin">
                            <li>Admin</li>
                        </Link>
                    </>}
                </ul>
                
            </div>
        </NavbarStyled>
    )
}