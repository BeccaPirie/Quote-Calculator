export default function Register() {

    const handleSubmit = (e) => {
        console.log('register button clicked')
    }

    return(
        <>
            <h3>Regsiter</h3>

            <form onSubmit={handleSubmit}>                
                <input
                    type="text"
                    required
                    placeholder="Username"
                />
                <input
                    type="email"
                    required
                    placeholder="Email"
                />
                <input
                    type="password"
                    required
                    minLength="6"
                    placeholder="Password"
                />
                <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                />
                <button>Register</button>
            </form>     
        </>
    )
}