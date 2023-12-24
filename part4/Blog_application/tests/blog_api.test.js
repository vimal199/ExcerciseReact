const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");
test("Dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
describe("total likes ", () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  test("when list has only one blog, equals the likes of that ", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("blog with max likes ", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
  test("Author who has the largest amount of blogs ", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result.author).toBe("Robert C. Martin");
    expect(result.blogs).toBe(3);
  });
  test("blog posts have the largest amount of likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result.likes).toBe(17);
    expect(result.author).toBe("Edsger W. Dijkstra");
  });
});
test("Blogs are returned as json", async () => {
  const x = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  console.log("x is ", x);
  expect(x.body[0].id).toBeDefined();
}, 100000);
test("Blogs are saved to db as json after post request", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogtobeSaved = {
    title: "node",
    author: "john",
    url: "http@1234.com",
    likes: 4,
  };
  let auth_token =
    "Bearer " +
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkRhZGZkZmRmIiwiaWQiOiI2NGZjOTlhYjkzNWNiZGU1MmUyNWFmMWIiLCJpYXQiOjE2OTQzNzIxMjJ9.xEbE7TjS5M-_ue9K615HTgWScp1qvgCQ5NMQ9MzsYKQ";
  const returned_Blog = await api
    .post("/api/blogs")
    .send(blogtobeSaved)
    .set("Authorization", auth_token);

  console.log("returned_Blog is ", returned_Blog);
  const blogsAtEnd = await api.get("/api/blogs");
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1);
});
test("Request is default to zero if its value missing", async () => {
  const test_blog = {
    title: "node",
    author: "john",
    url: "http@1234.com",
  };
  const ret_blog = await api.post("/api/blogs").send(test_blog);
  console.log("ret_blog", ret_blog);
  expect(ret_blog.body.likes).toBe(0);
}, 100000);
test("Backend respond with 400 if title/url is missing", async () => {
  const test_blog = {
    /* title: 'node', */
    url: "http@1234.com",
    author: "john",
  };
  const ret_blog = await api.post("/api/blogs").send(test_blog).expect(400);
  console.log("ret_blog", ret_blog);
});
test.only("Testing deleting a blog", async () => {
  let auth_token =
    "Bearer " +
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkRhZGZkZmRmIiwiaWQiOiI2NGZjOTlhYjkzNWNiZGU1MmUyNWFmMWIiLCJpYXQiOjE2OTQzNzIxMjJ9.xEbE7TjS5M-_ue9K615HTgWScp1qvgCQ5NMQ9MzsYKQ";
  const blogsAtStart = await api.get("/api/blogs");
  await api
    .delete("/api/blogs/64fe14f37e17191e36451d6f")
    .send()
    .set("Authorization", auth_token);
  const blogsAtEnd = await api.get("/api/blogs");
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);
});
test("Testing updating a blog", async () => {
  const blogtobeSaved = {
    title: "node",
    author: "john",
    url: "http@1234.com",
    likes: 23,
    id: "64f8e4e15783b4e66c719cb9",
  };
  const returned_blog = await api
    .put("/api/blogs/64f8e4e15783b4e66c719cb9")
    .send(blogtobeSaved);
  expect(returned_blog.body.likes).toBe(23);
});
test("log fails with the proper status code 401 Unauthorized if a token is not provided", async () => {
  const blogtobeSaved = {
    title: "node",
    author: "john",
    url: "http@1234.com",
    likes: 4,
  };
  await api.post("/api/blogs").send(blogtobeSaved).expect(401);
});
afterAll(async () => {
  await mongoose.connection.close();
});
