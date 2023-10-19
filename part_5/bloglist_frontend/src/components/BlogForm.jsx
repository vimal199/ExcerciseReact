const BlogForm = ({ title, handleChangeTitle, author, handleChangeAuthor, url, handleChangeUrl, handleSubmitBlog }) => {
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmitBlog}>
                <label htmlFor="title">title</label>
                <input type="text" id="title" name="title" value={title} onChange={handleChangeTitle}></input>
                <br />
                <label htmlFor="author">author</label>
                <input type="text" id="author" name="author" value={author} onChange={handleChangeAuthor}></input>
                <br />
                <label htmlFor="url">url:</label>
                <input type="text" id="url" name="url" value={url} onChange={handleChangeUrl}></input>
                <br />
                <button type="submit">create</button>
            </form>
        </>
    )
}
export default BlogForm