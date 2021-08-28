import React, { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
const blogService = require('./services/blogService')

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    // useEffect(() => {
    //     (async () => {
    //         const blog = await blogService.getAll()
    //         setBlogs(blog)
    //     })()
    // },[])

    const handleLogin = async (e) => {
        e.preventDefault()
        const userLogin = blogService.loginService(
            username,
            password
        )
        console.log(userLogin)
        setUsername('')
        setPassword('')
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <div>
            <h1>login</h1>
            <div>
                <form onSubmit={handleLogin}>
                    username <input type="username" value={username} onChange={handleUsername} />
                    password <input type="password" value={password} onChange={handlePassword} />
                    <button type="submit">Login</button>
                </form>
            </div>
            <Blogs blogs='Test' />
        </div>
    )
}

export default App
