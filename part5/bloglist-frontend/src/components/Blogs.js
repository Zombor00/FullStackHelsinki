import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleLike }) => {
    return(
        <div>
            {blogs
            .sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map(blog =>
                <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
            )}
        </div>
    )
}

export default Blogs