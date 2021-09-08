import { useState } from "react"

const Blogs = ({ blogs, updateLikes }) => {
    const [visible, setVisible] = useState(false)

    const updateLike = (e) => {
        e.preventDefault()
        updateLikes({
            ...blogs, likes: blogs.likes++
        })
        console.log(blogs)
    }

    const visibility = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
    <div style={blogStyle}>
        <p><a href={blogs.url}>{blogs.title}</a> {blogs.author} 
            <button onClick={visibility}>{visible ? 'show' : 'hide'}</button>
        </p>
        <div style={visible ? {display: ''} : {display: 'none'}}>
            <p>{blogs.url}</p>
            <p>likes {blogs.likes} <button onClick={updateLike}>like</button></p>
            <p>{blogs.user.name}</p>
        </div>
    </div>
    )
}
export default Blogs