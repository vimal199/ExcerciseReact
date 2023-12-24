import { createSlice } from "@reduxjs/toolkit";
const initialState = []
const blogsSlice = createSlice({
    name: 'blogs', initialState,
    reducers: {
        InitialiseBlogs(state, action) {
            return [
                ...state, ...action.payload
            ]
        },
        UpdateBlogsById(state, action) {
            const temp_blogs = state.map((blog) => blog.id != action.payload.id ? blog : action.payload);
            console.log('temp_blogs', temp_blogs);
            return temp_blogs;
        },
        UpdateBlogs(state, action) {
            return action.payload
        }
    }
})
export default blogsSlice.reducer
export const { InitialiseBlogs, UpdateBlogsById, UpdateBlogs } = blogsSlice.actions