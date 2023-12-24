import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import messageReducer from "./reducers/messageReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
const store = configureStore({
    reducer: {
        message: messageReducer,
        blogs: blogsReducer,
        user: userReducer
    }
})
ReactDOM.createRoot(document.getElementById("root")).render(<Provider store={store}><App /></Provider>);
