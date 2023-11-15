import { createSlice } from '@reduxjs/toolkit'
const initialState = null
const filterSlice = createSlice(
    {
        name: 'filter',
        initialState,
        reducers: {
            filterAnecdote(state, action) {
                console.log(action.type);
                switch (action.type) {
                    case 'filter/filterAnecdote':
                        return action.payload
                        break;
                    default:
                        return state
                }
            },

        }
    }
)



/* const reducer = (state = null, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload
            break;
        default:
            return state
    }
} */
/* export const filterAnecdote = (input_data) => {
    return (
        {
            type: 'FILTER',
            payload: { input_data }
        }
    )
} */
export const { filterAnecdote } = filterSlice.actions
export default filterSlice.reducer