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
            }
        }
    }
)
export default notifSlice.reducer
export const { sendNotification, removeNotification } = notifSlice.actions