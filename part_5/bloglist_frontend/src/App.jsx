import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users"
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import UserBlogs from "./components/UserBlogs"
import Toggable from "./components/Toggable";
//import { createMessage } from "./reducers/messageReducer";
import { InitialiseBlogs, UpdateBlogs } from "./reducers/blogsReducer";
//import { setUser } from "./reducers/userReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MessageContext from "./contexts/MessageContext";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import UserContext from "./contexts/UserContext";
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
const App = () => {
  console.log("Starting Blog application");
  //const dispatch = useDispatch();
  // const blogs = useSelector(state => state.blogs);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  //const [message, setMessage] = useState("");
  //const user = useSelector(state => state.user)
  const [message, messageDispatch] = useContext(MessageContext)
  const [user, userDispatch] = useContext(UserContext)
  const toggableRef = useRef();
  const navigate = useNavigate()
  /* useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sorted_list = blogs.sort((a, b) => {
        if (a.likes > b.likes) return -1;
        if (a.likes < b.likes) return 1;
        return 0;
      });
      //setBlogs(sorted_list);
      dispatch(InitialiseBlogs(sorted_list))
    });
  }, []); */
  useEffect(() => {
    const browserUser = window.localStorage.getItem("loggedBloggedUser");
    if (browserUser) {
      console.log("Token in browser ", browserUser);
      const blog_user = JSON.parse(browserUser);
      // setUser(blog_user);
      //  userDispatch(setUser(blog_user))
      userDispatch({ type: 'setUser', payload: blog_user })
      blogService.setToken(blog_user.token);
    }
  }, []);
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  }

  )
  /*
  Replacing getting of data from effect hook with tanstack  
  */
  const blogResult = useQuery(
    {
      queryKey: ['blogs'],
      queryFn: blogService.getAll
    }
  )
  if (blogResult.isLoading) {
    return <div>loading....</div>
  }
  console.log('blogResult is', JSON.parse(JSON.stringify(blogResult)))
  if (blogResult.isSuccess) {
    console.log('is it success');
    /*  if (blogs.length == 0) { */
    console.log('setting to state');
    /* const sorted_list = [...blogResult.data].sort((a, b) => {
      if (a.likes > b.likes) return -1;
      if (a.likes < b.likes) return 1;
      return 0;
    }); */
    //setBlogs(blogResult.data);
    //dispatch(UpdateBlogs(sorted_list))
    //}

  }
  const blogs = blogResult.data;
  //setBlogs(sorted_list);
  /*   states and variables definition ends here function definitions begins below */

  const handleOnChangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleOnChangePassword = ({ target }) => {
    setPassword(target.value);
  };
  const handleChangeTitle = ({ target }) => {
    setTitle(target.value);
  };
  const handleChangeAuthor = ({ target }) => {
    setAuthor(target.value);
  };
  const handleChangeUrl = ({ target }) => {
    setUrl(target.value);
  };
  const handleSubmitBlog = async (event) => {
    event.preventDefault();
    const blogToBeSaved = {
      title: title,
      author: author,
      url: url,
    };
    //const saved_blog = await blogService.create(blogToBeSaved);
    newBlogMutation.mutate(blogToBeSaved)
    // console.log("Form submitted ", saved_blog);
    //const new_blogs = blogs.concat(saved_blog)
    /*  const sorted_list = new_blogs.sort((a, b) => {
       if (a.likes > b.likes)
         return 1
       if (a.likes < b.likes)
         return -1
       return 0
     }
     ) */
    // const new_blogs = [blogToBeSaved].concat(blogs);
    //setBlogs(new_blogs);
    //dispatch(UpdateBlogs(new_blogs));
    setTitle("");
    setAuthor("");
    setUrl("");
    //setMessage(`a new blog ${saved_blog.title} by ${saved_blog.author}`);
    //dispatch(createMessage(`a new blog ${saved_blog.title} by ${saved_blog.author}`))
    messageDispatch({ type: 'createMessage', payload: `a new blog ${blogToBeSaved.title} by ${blogToBeSaved.author}` })
    setTimeout(() => {
      //setMessage(null);
      // dispatch(createMessage(null))
      messageDispatch({ type: 'createMessage', payload: null })
    }, 4000);
    toggableRef.current.toggleVisibility();
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const login_out = await loginService.login({ userName, password });
      userDispatch({ type: 'setUser', payload: login_out })
      setUserName("");
      setPassword("");
      blogService.setToken(login_out.token);
      window.localStorage.setItem(
        "loggedBloggedUser",
        JSON.stringify(login_out),
      );
      console.log("Logged in user ", login_out);
      if (login_out) {
        // navigate('/users')
      }
    } catch (error) {
      console.log("Error while logging ", error.response.data.error);
      //setMessage(error.response.data.error);
      // dispatch(createMessage(error.response.data.error))   implement context
      messageDispatch({ type: 'createMessage', payload: error.response.data.error })
      setTimeout(() => {
        // setMessage(null);
        //  dispatch(createMessage(null))                     implement context
        messageDispatch({ type: 'createMessage', payload: null })
      }, 4000);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
        userName={userName}
        password={password}
        handleOnChangeUserName={handleOnChangeUserName}
        handleOnChangePassword={handleOnChangePassword}
        handleLoginSubmit={handleLoginSubmit}
      ></LoginForm>
    );
  };
  const blogForm = () => {
    return (
      <Toggable buttonLabel="create new blog" ref={toggableRef}>
        <BlogForm
          title={title}
          handleChangeTitle={handleChangeTitle}
          author={author}
          handleChangeAuthor={handleChangeAuthor}
          url={url}
          handleChangeUrl={handleChangeUrl}
          handleSubmitBlog={handleSubmitBlog}
        ></BlogForm>
      </Toggable>
    );
  };
  const Blogdetails = () => {
    const queryClient = useQueryClient()
    const [comment, setComment] = useState('');
    const blogId = useParams().id
    const updateCommentMutation = useMutation(
      {
        mutationFn: blogService.updateComment,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['blog'] })
        }
      }
    )
    const handleChangeComment = (event) => {
      event.preventDefault();
      const comment_data = {
        comment: comment, id: blogId
      }
      updateCommentMutation.mutate(comment_data)
      messageDispatch({ type: 'createMessage', payload: `${comment} added by ${user.name}` })
      setTimeout(() => {
        messageDispatch({ type: 'createMessage', payload: null })
      }, 5000);
    }
    const updateBlogMutation = useMutation(
      {
        mutationFn: blogService.updateFull,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['blog'] })
        }
      }
    )
    const blogResult = useQuery(
      {
        queryKey: ['blog'],
        queryFn: () => blogService.getBlogById(blogId)
      }
    )
    if (blogResult.isLoading) {
      return (
        <div>Loading.......</div>
      )
    }
    const blog = blogResult.data
    console.log('blog', blog);
    //const [like, setLike] = useState(blog.likes);
    const handleClickLikes = async () => {
      console.log('Liked blog ', blog);
      /*    blog.likes += 1;
         blog.user = user; */
      const temp_blog = { ...blog, likes: blog.likes + 1 };
      // const updated_blog = await blogService.updateFull(temp_blog.id, temp_blog);
      updateBlogMutation.mutate(temp_blog)
      // setLike(temp_blog.likes);
      // dispatch(UpdateBlogsById(temp_blog));
    };
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <input
            type="button"
            onClick={handleClickLikes}
            value="likes"
            id="like"
          ></input>
        </p>
        <p>added by {blog.user.name}</p>
        <h2>comments</h2>
        <form onSubmit={handleChangeComment}>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}></input>
          <button type="submit" id="bwcomment">add comment</button>
        </form>
        <ListGroup>
          {blog.comments && blog.comments.map(comment_blog => <ListGroup.Item key={comment_blog}>{comment_blog}</ListGroup.Item>)}
        </ListGroup>
      </div>
    )
  }
  /* Function definitions ends here.*/
  console.log('Blogs at app ', blogs)
  return (
    <div className="container">
      {user == null && loginForm()}
      {user != null && (
        <div>
          <Notification status="success"></Notification>
          {/* <Link to={'/blogs'} >blogs </Link>

          <Link to={'/users'} >users </Link>
          {user.name} logged in */}
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link to={'/blogs'} >blogs </Link>

                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to={'/users'} >users </Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user.name} logged in
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <input
            type="button"
            id="logout"
            value="logout"
            onClick={() => {
              window.localStorage.removeItem("loggedBloggedUser");
              navigate('/');
              location.reload();

            }}
          ></input>
          <h1>blog app</h1>
          {blogForm()}
          {/* {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              blogService={blogService}
            />
          ))} */}
        </div>
      )}
      <Routes>
        <Route path="/users" element={user != null && <Users />} />
        <Route path="/" element={null} />
        <Route path="/users/:id" element={<UserBlogs />}></Route>

        <Route path="/blogs" element={
          blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              blogService={blogService}
            />
          ))
        }></Route>
        <Route path="/blogs/:id" element={<Blogdetails />}></Route>
      </Routes>
    </div>
  );
};
export default App;
