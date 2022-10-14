import { createSlice } from '@reduxjs/toolkit'
/*
  suodatin-reduceri

*/

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      const content = action.payload

      switch (action.type) {
        case 'filter/filterAnecdotes':
          return {
            content
          }  
        default:
          return state
      }
      
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer