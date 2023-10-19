import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
const App = () => {
  console.log('Starting Blog application');
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const toggableRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted_list = blogs.sort((a, b) => {
        if (a.likes > b.likes)
          return 1
        if (a.likes < b.likes)
          return -1
        return 0
      }
      )
      setBlogs(sorted_list)
    }
    )

  }, [])
  useEffect(() => {
    const browserUser = window.localStorage.getItem('loggedBloggedUser')
    if (browserUser) {
      console.log('Token in browser ', browserUser);
      const blog_user = JSON.parse(browserUser)
      setUser(blog_user)
      blogService.setToken(blog_user.token)
    }
  }, []
  )

  /*   states and variables definition ends here function definitions begins below */

  const handleOnChangeUserName = (event) => {
    setUserName(event.target.value)
  }
  const handleOnChangePassword = ({ target }) => {
    setPassword(target.value)
  }
  const handleChangeTitle = ({ target }) => {
    setTitle(target.value)
  }
  const handleChangeAuthor = ({ target }) => {
    setAuthor(target.value)
  }
  const handleChangeUrl = ({ target }) => {
    setUrl(target.value)
  }
  const handleSubmitBlog = async (event) => {
    event.preventDefault()
    const blogToBeSaved = {
      title: title,
      author: author,
      url: url
    }
    const saved_blog = await blogService.create(blogToBeSaved)
    console.log('Form submitted ', saved_blog);
    setBlogs(blogs.concat(saved_blog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage(`a new blog ${saved_blog.title} by ${saved_blog.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 4000);
    toggableRef.current.toggleVisibility()
  }
  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const login_out = await loginService.login({ userName, password })
      setUser(login_out)
      setUserName('')
      setPassword('')
      blogService.setToken(login_out.token)
      window.localStorage.setItem('loggedBloggedUser', JSON.stringify(login_out))
      console.log('Logged in user ', login_out)
    }
    catch (error) {
      console.log('Error while logging ', error.response.data.error)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 4000);
    }
  }

  const loginForm = () => {
    return (

      <LoginForm userName={userName} password={password} handleOnChangeUserName={handleOnChangeUserName} handleOnChangePassword={handleOnChangePassword} handleLoginSubmit={handleLoginSubmit} message={message}></LoginForm>

    )
  }
  const blogForm = () => {
    return (
      <Toggable buttonLabel='create new blog' ref={toggableRef}>
        <BlogForm title={title} handleChangeTitle={handleChangeTitle} author={author} handleChangeAuthor={handleChangeAuthor} url={url} handleChangeUrl={handleChangeUrl} handleSubmitBlog={handleSubmitBlog}>
        </BlogForm>
      </Toggable>
    )
  }
  /* Function definitions ends here.*/
  // console.log('setBlogs at app ', setBlogs)
  return (
    <>
      {user == null && loginForm()}
      {user != null && <div>
        <h2>blogs</h2>
        <Notification message={message} status='success'></Notification>
        {user.name} logged in
        <input type="button" id='logout' value="logout" onClick={() => { window.localStorage.removeItem('loggedBloggedUser'); location.reload(); }}></input>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} blogService={blogService} />
        )}
      </div>
      }

    </>
  )
}
export default App