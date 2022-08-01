import BlogList from './BlogList'

const Home = ({ user, newBlogForm, blogs }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col nav justify-content-end">{newBlogForm}</div>
        <div className="col">
          <BlogList blogs={blogs} user={user} />
        </div>
      </div>
    </div>
  )
}

export default Home