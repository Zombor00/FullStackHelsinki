import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : action.data 
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const addVote = (anecdote) => {
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
  return async dispatch => {
    await anecdoteService.vote(newAnecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newNote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer