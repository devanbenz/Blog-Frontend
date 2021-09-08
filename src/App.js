import React, { useEffect, useRef, useState } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
const blogService = require('./services/blogService')

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setError] = useState(null)
    const [addMessage, setAddMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

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

    const handlePost = async (blogObj) => {
        // Toggle form to not visible after posting
        blogFormRef.current.toggleVisibility()
        try{
            await blogService.createBlog(blogObj)
            setAddMessage(`${blogObj.title} by ${blogObj.author} added`)
            const blogsFetched = await blogService.getAll()
            setBlogs(blogsFetched)
            setTimeout(() => {
                setAddMessage(null)
            }, 2000)
        }catch(e){
            setError(e)
        }
    }

    const updateLikes = async (blogObj) => {
        try{
            blogObj = {...blogObj, likes: blogObj.likes++}
            await blogService.updateLikes(blogObj.id, blogObj)
            console.log(blogObj)
            const blogsFetched = await blogService.getAll()
            setBlogs(blogsFetched)
        }catch(e){
            setError(e)
            setTimeout(()=>{
                setError(null)
            },2000)
        }
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



    if(user === null){
        return (
            <div>
                <h3 style={{color: "red"}} >{errorMessage}</h3>
                <Togglable buttonlabel='login'>
                    <LoginForm handleLogin={handleLogin} handlePassword={handlePassword}
                        handleUsername={handleUsername} username={username} password={password} />
                </Togglable>
            </div>
        )
    }

    return (
        <div>
            <h3 style={{color: "red"}} >{errorMessage}</h3>
            <h3 style={{color:"green"}}>{addMessage}</h3>
            <h1>blogs</h1>
            <p><b>{user.name} logged in! <button onClick={handleLogout}>logout</button></b></p>
            <Togglable buttonlabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={handlePost} />
            </Togglable>
            {blogs.map(x => <Blogs key={x.id} blogs={x} updateLikes={updateLikes} />)}
        </div>
    )
}

export default App
