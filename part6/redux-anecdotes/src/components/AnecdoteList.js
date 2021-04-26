import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector  } from 'react-redux'
import { changeNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(changeNotification("you voted " + anecdote.content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    console.log('vote', anecdote)
    
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteForm