import { Form, Button } from "react-bootstrap";
const BlogForm = ({
  title,
  handleChangeTitle,
  author,
  handleChangeAuthor,
  url,
  handleChangeUrl,
  handleSubmitBlog,
}) => {
  return (
    <>
      <h2>create new</h2>
      <Form onSubmit={handleSubmitBlog}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChangeTitle}
          style={{ marginLeft: "2%" }}
        ></input>
        <br />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={handleChangeAuthor}
          style={{ marginLeft: "0.5%" }}
        ></input>
        <br />
        <label htmlFor="url">Url:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={handleChangeUrl}
          style={{ marginLeft: "2.5%" }}
        ></input>
        <br />
        <Button type="submit" id="bwcreate" style={{ marginTop: "1%" }}>
          create
        </Button>
      </Form>
    </>
  );
};
export default BlogForm;
