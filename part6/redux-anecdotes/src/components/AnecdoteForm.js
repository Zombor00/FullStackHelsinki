import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.newAnecdote.value
      event.target.newAnecdote.value = ''
      dispatch(newAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
          <div><input name="newAnecdote"/></div>
          <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm