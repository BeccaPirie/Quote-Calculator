import{ Link } from 'react-router-dom'
import { LoginForm } from '../components/styles/loginForm.styled'
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/user/UserContext'
import { TextField, Alert } from '@mui/material'

export default function Login() {
    const { dispatch } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [alertText, setAlertText] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const credentials = {
            email: email,
            password: password
        }

        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data})
            setAlertText('')
            setError(false)
        } catch (err) {
            console.error(err.response.data)
            setAlertText("Couldn't login")
            setError(true)
        }
    }

    return(
        <>
            {alertText.length > 0 &&
                <Alert className="alert" severity="error" onClose={() => {setAlertText('')}}>
                    {alertText}
                </Alert>}
                
            <LoginForm>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>                
                    <TextField
                        type="email"
                        required
                        placeholder="Email"
                        margin='normal'
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        required
                        minLength="6"
                        placeholder="Password"
                        margin='normal'
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={error ? "Username or password is incorrect" : ""}
                    />
                    <button>Login</button>
                </form>

                <div>
                    <span>Don't have an account? </span>
                    <Link to={'/register'}><span>Register now</span></Link> 
                </div>        
            </LoginForm>
        </>
    )
}