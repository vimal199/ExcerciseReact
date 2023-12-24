import React, { useEffect } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";
import userEvent from "@testing-library/user-event";
test("component displaying a blog renders the blog's title and author, but does not render its URL or number of likes", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "author",
    url: "url",
    user: {
      userName: "xyz",
    },
  };
  const user = {
    userName: "xyz",
  };
  const { container } = render(<Blog blog={blog} user={user} />);
  //const element = screen.getByText('Component testing is done with react-testing-library')
  const div = container.querySelector(".blog");
  const div_url = container.querySelector(".blogDetails");
  expect(div).toBeDefined();
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library",
  );
  expect(div).toHaveTextContent("author");
  expect(div_url).toBeDefined();
  expect(div_url).toHaveStyle("display: none");
  screen.debug(div_url);
});
test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "author",
    url: "url",
    user: {
      userName: "xyz",
    },
  };
  const user = {
    userName: "xyz",
  };
  const { container } = render(<Blog blog={blog} user={user} />);
  const input_user = userEvent.setup();
  const button = screen.getByText("view");
  await input_user.click(button);
  const div_url = container.querySelector(".blogDetails");
  expect(div_url).not.toHaveStyle("display: none");
  //expect(button).toBeDefined()
  screen.debug(div_url);
});
test("like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "author",
    url: "url",
    user: {
      userName: "xyz",
    },
  };
  const user = {
    userName: "xyz",
  };
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} user={user} handleClickLikes={mockHandler} />,
  );
  const input_user = userEvent.setup();
  const button = container.querySelector("#like");
  expect(button).toBeDefined();
  await input_user.click(button);
  await input_user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(2);
  screen.debug();
});
test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "author",
    url: "url",
  };
  const mockHandler = jest.fn((e) => e.preventDefault());
  const mockHandlerForTitle = jest.fn();
  const mockHandlerForAuthor = jest.fn();
  const mockHandlerForUrl = jest.fn();
  const { container } = render(
    <BlogForm
      title={blog.title}
      handleChangeTitle={mockHandlerForTitle}
      author={blog.author}
      handleChangeAuthor={mockHandlerForAuthor}
      url={blog.url}
      handleChangeUrl={mockHandlerForUrl}
      handleSubmitBlog={mockHandler}
    ></BlogForm>,
  );
  const input_user = userEvent.setup();
  const button = container.querySelector("#bwcreate");
  const input = container.querySelector("#title");
  await input_user.type(input, "testing a form...");
  //   screen.debug(button)
  await input_user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log(mockHandler.mock.calls[0][0].title);
  //expect(button).toBeDefined()
});
