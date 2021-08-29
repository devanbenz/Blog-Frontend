import React, { useEffect, useState } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
const blogService = require('./services/blogService')

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setError] = useState(null)
    const [addMessage, setAddMessage] = useState(null)
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
            setAddMessage(`${blog.title} by ${blog.author} added`)
            setBlog({title:'',author:'',url:''})
            setTimeout(() => {
                setAddMessage(null)
            }, 2000)
        }catch(e){
            console.log('Error', e)
        }
        const blogsFetched = await blogService.getAll()
        setBlogs(blogsFetched)
    }

    // Handle login functionality for login component
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    // handle blog creation functionality for blog component
    const handleBlogTitle = (e) => {
        setBlog({...blog, title: e.target.value})
    }
    const handleBlogAuthor = (e) => {
        setBlog({...blog, author: e.target.value})
    }
    const handleBlogUrl = (e) => {
        setBlog({...blog, url: e.target.value})
    }

    if(user === null){
        return (
            <div>
                <h3 style={{color: "red"}} >{errorMessage}</h3>
                <LoginForm handleLogin={handleLogin} handlePassword={handlePassword}
                    handleUsername={handleUsername} username={username} password={password} />
            </div>
        )
    }

    return (
        <div>
            <h3 style={{color:"green"}}>{addMessage}</h3>
            <h1>blogs</h1>
            <p><b>{user.name} logged in! <button onClick={handleLogout}>logout</button></b></p>
            <BlogForm handlePost={handlePost} blog={blog} handleBlogTitle={handleBlogTitle}
                handleBlogAuthor={handleBlogAuthor} handleBlogUrl={handleBlogUrl} />
            {blogs.map(x => <Blogs key={x.id} blogs={x} />)}
        </div>
    )
}

export default App
