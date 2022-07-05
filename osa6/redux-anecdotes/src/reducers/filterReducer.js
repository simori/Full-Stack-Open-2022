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
      //console.log('FILTER ANECDOTES  kontentti, tila, aktio', content, state, action);
      /* state.push({
        content
      })  */
      switch (action.type) {
        case 'filter/filterAnecdotes':
          return {
            //type: 'FILTER',
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