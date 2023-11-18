import { createSlice } from "@reduxjs/toolkit"
const initialState = ''
const notifSlice = createSlice(
    {
        name: 'notification',
        initialState,
        reducers: {
            sendNotification(state, action) {
                return action.payload
            },
            removeNotification(state, action) {
                return ''
            },
        }
    }
)
export const setNotification = (message, delay) => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch(removeNotification())
        }, delay)
        dispatch(sendNotification(message))
    }
}
export default notifSlice.reducer
export const { sendNotification, removeNotification } = notifSlice.actions