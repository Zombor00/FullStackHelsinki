import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  
  return(
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setLoginVisible(true)}>view</button>
        </div>
      </div>
    
    <div style={showWhenVisible}>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setLoginVisible(false)}>hide</button> <br/>
        {blog.url} <br/>
        likes {blog.likes} 
        <button value={ blog.id } onClick={ handleLike }>like</button> <br/>
        {blog.user.name} <br/>
      </div>
    </div>
  </div>
  )
}

export default Blog
