import { createSlice } from "@reduxjs/toolkit";
const initialState = ""
const messageSlice = createSlice({
    name: 'message', initialState, reducers: {
        createMessage(state, action) {
            state = action.payload;
            return state
        }
    }
}
)
export default messageSlice.reducer
export const { createMessage } = messageSlice.actions