import Blog from './Blog'

const BlogList = ({ blogs, user }) => (
  <div>
    <h2>List of Blogs</h2>

    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} currentUser={user} />
    ))}
  </div>
)

export default BlogList