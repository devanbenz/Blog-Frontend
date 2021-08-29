const BlogForm = ({handlePost, blog, handleBlogTitle, handleBlogAuthor, handleBlogUrl}) => {
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