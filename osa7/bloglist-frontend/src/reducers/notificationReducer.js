import { createSlice } from '@reduxjs/toolkit'
// notification reduseri 7.10

const notificationSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    setNotification2(state, action) {
      //console.log('6.18 setnotification2!', state, action)
      switch (action.type) {
        case 'message/setNotification2':
          return action.payload
        default:
          return state
      }
    },
    emptyNotification() {
      //console.log('emptynotifiation!', state, action)
      return null
    }
  }
})

// 6.18 setNotification action creator, jossa välitetään viesti ja timeout sekunneissa
export const createNotification = (message) => {
  //console.log('6.18 setnotification! export const', message)

  return (dispatch) => {
    dispatch(setNotification2(message))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 3000)
  }
}
export const { setNotification2, emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer

/*
WANHA
const initialState = null
//anecdotesAtStart.map(asObject)

const notificationReducer = (state = initialState, action) => {
  console.log('motificationReducer accessed', action.data)
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const createNotification = (message, error) => {
  console.log('export const createNotifivation', message, error)
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message,
      error
    }
  }
}

export default notificationReducer
*/
