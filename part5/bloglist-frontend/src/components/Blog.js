import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, userLogged }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    userLogged: PropTypes.object.isRequired,
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return(
    <div className='blog'>
      <div style={hideWhenVisible}>
        <div style={blogStyle} className='blogDefault'>
          {blog.title} {blog.author}
          <button onClick={() => setLoginVisible(true)}>view</button>
        </div>
      </div>

      <div style={showWhenVisible}>
        <div style={blogStyle} className='blogFull'>
          {blog.title} {blog.author}
          <button onClick={() => setLoginVisible(false)}>hide</button> <br/>
          {blog.url} <br/>
        likes {blog.likes}
          <button value={ blog.id } onClick={ handleLike }>like</button> <br/>
          {blog.user.name} <br/>
          {blog.user.username === userLogged.username && <button value={ blog.id } onClick={handleDelete}>remove</button> }
        </div>
      </div>
    </div>
  )
}

export default Blog
