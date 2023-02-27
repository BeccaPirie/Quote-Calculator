import{ Link } from 'react-router-dom'
import { LoginFormStyled } from '../components/styles/loginForm.styled'

export default function Login() {

    const handleSubmit = (e) => {
        console.log('login button clicked')
    }

    return(
        <LoginFormStyled>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>                
                <input
                    type="text"
                    required
                    placeholder="Username"
                />
                <input
                    type="password"
                    required
                    minLength="6"
                    placeholder="Password"
                />
                <button>Login</button>
            </form>

            <div>
                <span>Don't have an account? </span>
                <Link to={'/register'}><span>Register now</span></Link> 
            </div>        
        </LoginFormStyled>
    )
}