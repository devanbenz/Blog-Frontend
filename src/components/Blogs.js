const Blogs = ({ blogs }) => <div><p><a href={blogs.url}>{blogs.title}</a> {blogs.author}</p></div>

export default Blogs