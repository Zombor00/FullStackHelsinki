import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog renders the blog\'s title and author, but does not render its url or number of likes by default.', () => {
  const user ={
    username: 'Alex',
    name: 'Alex',
  }

  const blog = {
    title: 'Blog 0',
    author: 'Alex test',
    url: 'google.com',
    likes: 3,
    user: user
  }

  const component = render( <Blog blog={blog} handleLike={() => null} handleDelete={() => null} userLogged={user}/> )
  const defaultCo = component.container.querySelector('.blogDefault')
  const notDefaultCo = component.container.querySelector('.blogFull')

  expect(defaultCo).toBeVisible()
  expect(defaultCo).toHaveTextContent('Blog 0 Alex test')
  expect(defaultCo).not.toHaveTextContent('google.com 3')
  expect(notDefaultCo).not.toBeVisible()
})
