import { createContext, useReducer } from "react";
const userReducer = (state, action) => {
    switch (action.payload) {
        case 'setUser':
            return action.payload
            break;
        default:
            return action.payload
    }
}
const UserContext = createContext()
export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)
    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContext