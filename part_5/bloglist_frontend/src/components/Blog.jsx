import { useState } from 'react'
import Notification from './Notification'
//import blogService from '../services/blogs'
const Blog = ({ blog, user, blogs, setBlogs, blogService }) => {
  console.log('user in blog enter', blog.user.userName)
  //console.log('setBlogs ', setBlogs)
  const [status, setStatus] = useState('view')
  const [like, setLike] = useState(blog.likes)
  const deleteButtonHidden = { display: user.userName == blog.user.userName ? '' : 'none' }
  const handleClickView = () => {
    setStatus(status == 'view' ? 'hide' : 'view')
  }
  /*commenting below for testing purpose*/
  const handleClickLikes = async () => {
    blog.likes += 1
    blog.user = user
    const updated_blog = await blogService.updateFull(blog.id, blog)
    setLike(updated_blog.likes)
  }
  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const delete_blog = await blogService.delete_blog(blog.id)
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
    }
  }
  const toggleVisible = { display: status == 'view' ? 'none' : '' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <input type="button" onClick={handleClickView} value={status}></input>
      <div style={toggleVisible} className='blogDetails'>
        <p>{blog.url}</p>
        <p>likes {like} <input type="button" onClick={handleClickLikes} value='likes' id='like'></input> </p>
        <p> {blog.user.name}</p>
        <input style={deleteButtonHidden} type='button' onClick={handleDeleteBlog} value='remove' className='deleteBlog'></input>
      </div>
    </div >
  )
}
export default Blog