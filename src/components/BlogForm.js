import { useState } from "react"


const BlogForm = ({createBlog}) => {
    const [blog, setBlog] = useState({
        title:'',author:'',url:''
    })

    const handlePost = (e) => {
        e.preventDefault()
        createBlog({...blog})
        setBlog({title:'',author:'',url:''})
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

    return (
    <form onSubmit={handlePost} >
        <div>title: <input type="text" value={blog.title} onChange={handleBlogTitle} /></div>
        <div>author: <input type="text" value={blog.author} onChange={handleBlogAuthor} /></div>
        <div>url: <input type="text" value={blog.url} onChange={handleBlogUrl} /></div>
        <button type="submit">post</button>
    </form>
    )
}

export default BlogForm