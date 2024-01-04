import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import messageReducer from "./reducers/messageReducer";
//import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import { MessageContextProvider } from "./contexts/MessageContext";
import { UserContextProvider } from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import {
    BrowserRouter as Router
} from 'react-router-dom'
/* const store = configureStore({
    reducer: {
        // message: messageReducer,
        // blogs: blogsReducer,
        //user: userReducer
    }
}) */
ReactDOM.createRoot(document.getElementById("root")).render(
    //<Provider store={store}>
    <MessageContextProvider>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}><Router><App /></Router></QueryClientProvider>
        </UserContextProvider>
    </MessageContextProvider>
    //</Provider>
)
