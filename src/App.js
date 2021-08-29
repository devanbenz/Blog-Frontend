import React, { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
const blogService = require('./services/blogService')

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setError] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blog, setBlog] = useState({
        title: '', author: '', url: ''
    })

    useEffect(() => {
        (async () => {
            const blogsFetched = await blogService.getAll()
            setBlogs(blogsFetched)
        })()
    }, [])


    useEffect(() => {
        const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogUser"))
        if(loggedUser) {
            setUser(loggedUser)
            blogService.getToken(loggedUser.token)
        }
    }, [])
    
    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const userLogin = await blogService.loginService({
                username, password
            })
            setUser(userLogin)
            blogService.getToken(userLogin.token)
            window.localStorage.setItem("loggedBlogUser", JSON.stringify(userLogin))
            setUsername('')
            setPassword('')
        }catch(e){
            setError('Wrong credentials')
            setUsername('')
            setPassword('')
            setTimeout(() => {
                setError(null)
            }, 2000)
        }
    }

    const handlePost = async (e) => {
        e.preventDefault()
        try{
            await blogService.createBlog(blog)
            setBlog({title:'',author:'',url:''})
        }catch(e){
            console.log('Error', e)
        }
        const blogsFetched = await blogService.getAll()
        setBlogs(blogsFetched)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    if(user === null){
        return (
            <div>
                <h3>{errorMessage}</h3>
                <LoginForm handleLogin={handleLogin} handlePassword={handlePassword}
                    handleUsername={handleUsername} username={username} password={password} />
            </div>
        )
    }

    return (
        <div>
            <h1>blogs</h1>
            <p><b>{user.name} logged in! <button onClick={handleLogout}>logout</button></b></p>
            <form onSubmit={handlePost} >
                <div>title: <input type="text" value={blog.title} onChange={({target}) => setBlog({...blog, title: target.value})} /></div>
                <div>author: <input type="text" value={blog.author} onChange={({target}) => setBlog({...blog, author: target.value})} /></div>
                <div>url: <input type="text" value={blog.url} onChange={({target}) => setBlog({...blog, url: target.value})} /></div>
                <button type="submit">post</button>
            </form>
            {blogs.map(x => <Blogs key={x.id} blogs={x} />)}
        </div>
    )
}

export default App
