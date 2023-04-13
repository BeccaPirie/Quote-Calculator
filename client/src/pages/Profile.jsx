import { useContext, useState } from "react"
import { UserContext } from "../context/user/UserContext"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Paper } from '@mui/material'
import axios from 'axios'
import { ButtonStyled } from "../components/styles/button.styled"
import { ProfileStyled } from "../components/styles/profile.styled"
import Navbar from "../components/Navbar"

export default function Profile() {
    const {user, dispatch} = useContext(UserContext)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [passError, setPassError] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    const onSubmit = async(e) => {
        e.preventDefault()

        // client validation
        const checkUsername = username.length < 3 || username.length > 20
        setUsernameError(checkUsername)
        if(checkUsername) return

        // if no error, send to server
        const updatedUser = {
            ...user,
            username: username,
            email: email
        }

        try {
            await axios.put(`https://quote-calculator-api.onrender.com/api/user/update-user/${user._id}`, updatedUser,{
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_USER", payload: updatedUser})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const updatePassword = async(e) => {
        e.preventDefault()

        // client side validation
        const checkPassLength = newPass.length < 6
        const checkPassMatch = confirmPass !== newPass

        // save state for display error on text fields
        setPassLength(checkPassLength)
        setPassError(checkPassMatch)

        // return from function if errors exist
        if(checkPassLength || checkPassMatch) return
        
        // if no errors, send to server  
        const passwords = {
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: confirmPass
        }

        try {
            const res = await axios.put(`https://quote-calculator-api.onrender.com/api/user/update-password/${user._id}`, passwords, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_PASSWORD", payload: res.data})
        } catch (err) {
            console.error(err.response.data)
        } 
    }

    const deleteAccount = async() => {
        try {
            await axios.delete(`https://quote-calculator-api.onrender.com/api/user/delete-user/${user._id}`, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"DELETE_USER"})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return (
    <>
        <Navbar />
            <ProfileStyled>
                
                <h3>Profile Page</h3>

                <Paper className="paper">
                    <form className="form" onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={usernameError}
                            helperText={usernameError ? "Username must be between 3-20 characters long" : ""}
                            />
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        <ButtonStyled type="submit" id="update-btn">Save</ButtonStyled>
                    </form>

                    <form  className="password-form" onSubmit={updatePassword}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Current Password"
                            variant="outlined"
                            margin="normal"
                            value={oldPass || ''}
                            onChange={(e) => setOldPass(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="New Password"
                            variant="outlined"
                            margin="normal"
                            value={newPass || ''}
                            onChange={(e) => setNewPass(e.target.value)}
                            error={passLength}
                            helperText={passLength ? "Password must contain at leasr six characters" : ""}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Confirm New Password"
                            variant="outlined"
                            margin="normal"
                            value={confirmPass || ''}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            error={passError}
                            helperText={passError ? "Passwords don't match" : ""}
                        />
                        <ButtonStyled>Update Password</ButtonStyled>
                    </form>

                    <div className="delete-acc">
                        <ButtonStyled className="del-btn" onClick={() => setOpenAlert(true)}>
                            Delete Account
                        </ButtonStyled>

                        <Dialog
                            open={openAlert}
                            onClose={() => setOpenAlert(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure you want to delete your account?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    This action can't be undone
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenAlert(false)}>No</Button>
                                <Button onClick={deleteAccount} autoFocus>Yes</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Paper>
            </ProfileStyled>
        </>
    )
}