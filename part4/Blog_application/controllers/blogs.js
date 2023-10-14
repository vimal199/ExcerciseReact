const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const logger = require('../utils/logger')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
//const middleware = require('../utils/middleware')
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
}
)
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
}
)
/* const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log('authorization ', authorization);
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null;
} */
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('token from request ', request.token);
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('decoded token ', decodedToken);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
    //console.log('user is ', user);
    // adding author in back end now
    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes,
        user: user.id,
        author: body.author
    })
    const savedBlog = await blog.save()
    logger.info('saved Blog is ', savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
}
)
blogsRouter.delete('/:id', async (request, response) => {
    if (request.token == null || request.token == undefined) {
        response.status(400).end()
        return null
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const getBlog = await Blog.findById(request.params.id)
    const user = request.user
    if (user && decodedToken.id.toString() === getBlog.user.toString()) {
        const blog = await Blog.findByIdAndRemove(request.params.id)
        console.log('deleted blog ', blog)
        /*  let index=user.blogs.indexOf(decodedToken.id.toString())
         if(index>-1){
             user.blogs.splice(index,1)
 
         } */
        response.status(204).end()
        return null
    } else {
        response.status(400).end()
    }


})
blogsRouter.put('/:id', async (request, response) => {
    const temp_data = request.body
    const blog = {
        title: temp_data.title,
        author: temp_data.author,
        url: temp_data.url,
        likes: temp_data.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
})
module.exports = blogsRouter