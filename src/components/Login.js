const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password}) => {
    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
            username <input type="username" value={username} onChange={handleUsername} />
            </div>
            <div>
            password <input type="password" value={password} onChange={handlePassword} />
            </div>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default LoginForm