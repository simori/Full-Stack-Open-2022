import { createSlice } from '@reduxjs/toolkit'

let timeoutRef

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification2(state, action) {
      switch (action.type) {
        case 'notification/setNotification2':
          return action.payload
        default:
          return state
      }
    },
    emptyNotification(state, action) {
      return null
    }
  }

})

// 6.18 setNotification action creator, jossa välitetään viesti ja timeout sekunneissa
export const setNotification = (message, timeout) => {
  if (timeoutRef) {
    clearTimeout(timeoutRef)
  }
  return dispatch => {
    dispatch(setNotification2(message))
    timeoutRef = setTimeout(() => {
      dispatch(emptyNotification())
    }, timeout * 1000)
  }
}
export const { setNotification2, emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer
//export default notificationReducer
