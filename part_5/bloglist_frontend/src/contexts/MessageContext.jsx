import { createContext, useReducer } from 'react'
const messageReducer = (state, action) => {
    switch (action.type) {
        case 'createMessage':
            return action.payload;
            break;
        default:
            return state;
    }
}
const MessageContext = createContext()
export const MessageContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(messageReducer, '');
    return (
        <MessageContext.Provider value={[message, messageDispatch]} >
            {props.children}
        </MessageContext.Provider>
    )
}
export default MessageContext