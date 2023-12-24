const testingRouter = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});
module.exports = testingRouter;
