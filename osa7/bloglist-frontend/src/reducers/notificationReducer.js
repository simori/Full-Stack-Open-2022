import { createSlice } from '@reduxjs/toolkit'
// notification reduseri 7.10

const notificationSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    setNotification2(state, action) {
      switch (action.type) {
        case 'message/setNotification2':
          return action.payload
        default:
          return state
      }
    },
    emptyNotification() {
      return null
    }
  }
})

// 6.18 setNotification action creator, jossa välitetään viesti ja timeout sekunneissa
export const createNotification = (message) => {

  return (dispatch) => {
    dispatch(setNotification2(message))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 3000)
  }
}
export const { setNotification2, emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer
