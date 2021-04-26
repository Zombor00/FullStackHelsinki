import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, removeNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.newAnecdote.value
      event.target.newAnecdote.value = ''
      dispatch(newAnecdote(content))
      dispatch(changeNotification("You have created the anecdote " + content))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
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