import React from "react"

// 5.6
const AddBlogForm = ({
    handleSubmit,
    setTitle,
    setAuthor,
    setUrl,
    title,
    author,
    url
   }) => {
   return (
    <div>
     <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={setTitle}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={setAuthor}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={setUrl}
          />
        </div>
        <button type="submit">create new blog!</button>
      </form>
    </div>
   )
 }
 
 export default AddBlogForm