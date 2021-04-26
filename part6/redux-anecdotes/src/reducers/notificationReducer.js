let timeoutID = null

const notificationReducer = (state = null, action) => {
  console.log('notif state now: ', state)
  console.log('action', action)

  switch(action.type){
      case 'CHANGE':
        return action.data
      case 'REMOVE':
        return null
      default:
        return state
  }
}

export const changeNotification = (notification, timeToBeRemoved) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE',
      data: notification
    })

    if(timeoutID !== null){
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
      timeoutID = null
    }, timeToBeRemoved * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer