const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const logger = require("../utils/logger");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
//const middleware = require('../utils/middleware')
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user");
  //console.log('get blog by id ', blog);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});
/* const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log('authorization ', authorization);
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null;
} */
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log("token from request ", request.token);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  console.log("decoded token ", decodedToken);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = request.user;
  //console.log('user is ', user);
  // adding author in back end now
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user.id,
    author: body.author,
  });
  const savedBlog = await blog.save();
  const populated_data = await savedBlog.populate("user");
  logger.info("saved Blog is ", savedBlog);
  logger.info("populated_data is ", populated_data);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});
blogsRouter.delete("/:id", async (request, response) => {
  if (request.token == null || request.token == undefined) {
    response.status(400).end();
    return null;
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const getBlog = await Blog.findById(request.params.id);
  const user = request.user;
  if (user && decodedToken.id.toString() === getBlog.user.toString()) {
    const blog = await Blog.findByIdAndRemove(request.params.id);
    console.log("deleted blog ", blog);
    /*  let index=user.blogs.indexOf(decodedToken.id.toString())
         if(index>-1){
             user.blogs.splice(index,1)
 
         } */
    response.status(204).end();
    return null;
  } else {
    response.status(400).end();
  }
});
blogsRouter.put("/:id", async (request, response) => {
  const user = await User.findOne({ userName: request.body.user.userName });
  const temp_data = request.body;
  const blog = {
    title: temp_data.title,
    author: temp_data.author,
    url: temp_data.url,
    likes: temp_data.likes,
    user: user,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedBlog);
});
blogsRouter.post("/:id/comment", async (request, response) => {
  console.log('at post of comment', request.body.comment);
  const blog_data = await Blog.findById(request.params.id);
  //const updatedBlog = [...getBlog, comments.concat('temp')]
  blog_data.comments = blog_data.comments.concat(request.body.comment);
  console.log('updatedBlog after push', blog_data);
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog_data, {
    new: true,
    runValidators: true,
    context: "query",
  })
  console.log('updatedBlog', updatedBlog);
  response.json(updatedBlog);
});
module.exports = blogsRouter;
