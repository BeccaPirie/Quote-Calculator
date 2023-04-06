import { LoginForm } from "../components/styles/loginForm.styled"
import { useState } from 'react'
import axios from 'axios'
import{ useNavigate, Link } from 'react-router-dom'
import { TextField, Alert } from '@mui/material'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passError, setPassError] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [alertText, setAlertText] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        // client validation
        const checkUsername = username.length < 3 || username.length > 20
        const checkPassLength = password.length < 6
        const checkPassMatch = confirmPassword !== password

        // save state for displaying errors on text fields
        setUsernameError(checkUsername)
        // setEmailError(checkEmail)
        setPassLength(checkPassLength)
        setPassError(checkPassMatch)

        // return from function if errors exist
        if(checkUsername || checkPassLength || checkPassMatch) return

        // if no errors, send to server
        const user = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        try {
            await axios.post('http://localhost:8000/api/auth/signup', user)
            setAlertText('')
            navigate('/login')
        } catch (err) {
            console.err(err.response.data)
            setAlertText("Error signing up")
        }
    }

    return(
        <>
            {alertText.length > 0 &&
                <Alert className="alert" severity="error" onClose={() => {setAlertText('')}}>
                    {alertText}
                </Alert>}

            <LoginForm>
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>                
                    <TextField
                        type="text"
                        required
                        placeholder="Username"
                        margin='normal'
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                        error={usernameError}
                        helperText={usernameError ? "Username must be between 3-20 characters long" : ""}
                    />
                    <TextField
                        type="email"
                        required
                        placeholder="Email"
                        margin='normal'
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}
                        // error={emailError}
                        // helperText={emailError ? "Please enter a valid email" : ""}
                    />
                    <TextField
                        type="password"
                        required
                        minLength="6"
                        placeholder="Password"
                        margin='normal'
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passLength}
                        helperText={passLength ? "Password must contain at least six characters" : ""}
                    />
                    <TextField
                        type="password"
                        required
                        placeholder="Confirm Password"
                        margin='normal'
                        value={confirmPassword || ''}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={passError}
                        helperText={passError ? "Passwords don't match" : ""}
                    />
                    <button>Register</button>
                </form>     
            </LoginForm>
        </>
    )
}