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
      console.log('FILTER ANECDOTES  kontentti', content)
      console.log('FILTER ANECDOTES  tila', state)
      console.log('FILTER ANECDOTES  action', action)
      /* state.push({
        content
      })  */
      switch (action.type) {
      case 'filter/filterAnecdotes':
        console.log('swich vcase filter anedotes', action)
        return {
          // type: 'FILTER',
          content,
        }
      default:
        // console.log('swich vcase default ', action);
        return state
      }
    },
  },
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer
