import ClickAwayListener from "@mui/base/ClickAwayListener"
import {Paper, MenuItem, MenuList} from '@mui/material'
import { Link } from "react-router-dom"
import { UserContext } from "../context/user/UserContext"
import { useContext } from 'react'

export default function ProfileMenu({setShowMenu}) {
    const {dispatch } = useContext(UserContext)

    const logout = () => {
        setShowMenu(false)
        dispatch({type:"LOGOUT"})
    }

    return(
        <ClickAwayListener onClickAway={() => setShowMenu(false)}>
            <Paper>
                <MenuList
                    id="account-menu"
                    aria-labelledby="account-button">
                    <Link to='/profile' onClick={()=> setShowMenu(false)}>
                        <MenuItem>Settings</MenuItem>
                    </Link>
                    <Link to='/' onClick={logout}>
                        <MenuItem>Logout</MenuItem>
                    </Link>
                </MenuList>
            </Paper>
        </ClickAwayListener>
    )
}