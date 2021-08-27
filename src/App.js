import React, { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
const blogService = require('./services/blogService')

const App = () => {
    const [blogs, setBlogs] = useState([])
    
    useEffect(() => {
        (async () => {
            const blog = await blogService.getAll()
            setBlogs(blog)
        })()
    },[])

    console.log(blogs)

    return (
        <div>
            <h1>Check console</h1>
            <Blogs blogs='Test' />
        </div>
    )
}

export default App
