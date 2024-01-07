<div style={toggleVisible} className="blogDetails">
    <p>{blog.url}</p>
    <p>
        likes {like}{" "}
        <input
            type="button"
            onClick={handleClickLikes}
            value="likes"
            id="like"
        ></input>{" "}
    </p>
    <p> {blog.user.name}</p>
    <input
        style={deleteButtonHidden}
        type="button"
        onClick={handleDeleteBlog}
        value="remove"
        className="deleteBlog"
    ></input>
</div>