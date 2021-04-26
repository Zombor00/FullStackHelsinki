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
  return {
    type: 'VOTE',
    data: {
      ...anecdote,
      votes: anecdote.votes + 1
    }
  }
}

export const newAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer