import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {

    setNotification(state, action) {
      console.log('setnotification!', state, action);
      switch (action.type) {
        case 'notification/setNotification':
          console.log('notifikaatio typeöf', typeof action.payload);
          return action.payload
        default:
          return state
      }
    },
    emptyNotification(state, action) {
      console.log('emptynotifiation!', state, action);
      return null
    }
    
    
  }
})
export const { setNotification, emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer
//export default notificationReducer
// Your initial state is an array, then you replace it with a string and then with an empty string. Try with initial state null, string for notification and null again to remove the notification