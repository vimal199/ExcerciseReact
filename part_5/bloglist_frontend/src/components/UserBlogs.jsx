import { useParams } from "react-router-dom"
import userService from '../services/users'
import { useQuery } from "@tanstack/react-query"
import { ListGroup } from "react-bootstrap"
const UserBlogs = () => {
    const user_id = useParams().id
    const blogsByUsersResult = useQuery(
        {
            queryKey: ['blogsbyusers'],
            queryFn: () => userService.getBlogsByUser(user_id)
        }
    )
    if (blogsByUsersResult.isLoading) {
        return (
            <div>Loading.......</div>
        )
    }
    console.log('blogsByUsersResult', blogsByUsersResult)
    if (blogsByUsersResult.isSuccess) {
        const userBlogs = blogsByUsersResult.data
        return (
            <>
                <h1>{userBlogs.name}</h1>
                <h2>added blogs</h2>
                <ListGroup>
                    {userBlogs.blogs.map(
                        (blog) => {
                            return <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                        }
                    )
                    }
                </ListGroup>
            </>
        )
    }
}
export default UserBlogs