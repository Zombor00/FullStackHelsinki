const initialState = "This is a notification"

const notificationReducer = (state = initialState, action) => {
  console.log('notif state now: ', state)
  console.log('action', action)

  switch(action.type){
      case 'CHANGE':
        return action.data

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

export default notificationReducer