import{ Link } from 'react-router-dom'

export default function Login() {

    const handleSubmit = (e) => {
        console.log('login button clicked')
    }

    return(
        <>
            <h3>Login</h3>

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
        </>
    )
}