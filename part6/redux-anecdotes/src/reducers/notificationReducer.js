const initialState = null

const notificationReducer = (state = initialState, action) => {
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

export const changeNotification = (notification) => {
  return {
    type: 'CHANGE',
    data: notification
  }
}

export const removeNotification = (notification) => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer