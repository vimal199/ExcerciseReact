import { useState } from "react";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InitialiseBlogs, UpdateBlogsById, UpdateBlogs } from "../reducers/blogsReducer";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
//import blogService from '../services/blogs'
const Blog = ({ blog, user, blogService }) => {
  //console.log("user in blog enter", blog.user.userName);
  //console.log('setBlogs ', setBlogs)
  const [status, setStatus] = useState("view");
  const [like, setLike] = useState(blog.likes);
  //const blogs = useSelector(state => state.blogs);
  //const dispatch = useDispatch();
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation(
    {
      mutationFn: blogService.updateFull,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
      }
    }
  )
  const deleteBlogMutation = useMutation(
    {
      mutationFn: blogService.delete_blog,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
      }
    }
  )
  /*  const deleteButtonHidden = {
     display: user.userName == blog.user.userName ? "" : "none",
   }; */
  const handleClickView = () => {
    setStatus(status == "view" ? "hide" : "view");
  };
  /*commenting below for testing purpose*/
  const handleClickLikes = async () => {
    console.log('Liked blog ', blog);
    /*    blog.likes += 1;
       blog.user = user; */
    const temp_blog = { ...blog, likes: blog.likes + 1 };
    // const updated_blog = await blogService.updateFull(temp_blog.id, temp_blog);
    updateBlogMutation.mutate(temp_blog)
    setLike(temp_blog.likes);
    // dispatch(UpdateBlogsById(temp_blog));
  };
  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      // const delete_blog = await blogService.delete_blog(blog.id);
      deleteBlogMutation.mutate(blog.id)
      /* blogService.getAll().then((blogs) => {
        const sorted_list = blogs.sort((a, b) => {
          if (a.likes > b.likes) return 1;
          if (a.likes < b.likes) return -1;
          return 0;
        });
        //  setBlogs(sorted_list);
        dispatch(UpdateBlogs(sorted_list))
      }); */
    }
  };
  const toggleVisible = { display: status == "view" ? "none" : "" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      {/* <input type="button" onClick={handleClickView} value={status}></input> */}
    </div>
  );
};
export default Blog;
