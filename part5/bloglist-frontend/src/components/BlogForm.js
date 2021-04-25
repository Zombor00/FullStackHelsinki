import React, { useState } from 'react'

const BlogForm = ({ handleCreate }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    await handleCreate({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='create-button' type='submit'>create</button>
    </form>
  )
}

export default BlogForm
