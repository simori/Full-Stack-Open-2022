import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogs from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log('setUser reducer\n----------')
      console.log('state:', state)
      console.log('action:', action)
      window.localStorage.setItem('loggedUser', JSON.stringify(action.payload))
      blogs.setToken(action.payload.token)
      return action.payload
    },
    nullUser() {
      // uloskirjaus
      return null
    }
  }
})

export const { setUser, nullUser } = userSlice.actions

export const loginUser = (user) => {
  console.log('loginUser action creator', user)

  return async (dispatch) => {
    const logged = await loginService.login(user)
    console.log('logged: ', logged)
    dispatch(setUser(logged))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    await dispatch(nullUser())
  }
}

export const checkLogin = () => {
  console.log('check login action kreator')
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('loggeduserjson existaa, user on', user)
      if (user) {
        dispatch(setUser(user))
        blogs.setToken(user.token)
      }
    }
  }
}

export default userSlice.reducer
