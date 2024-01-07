import { useQuery } from "@tanstack/react-query"
import usersService from '../services/users'
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
const Users = () => {
    const usersResult = useQuery(
        {
            queryKey: ['users'],
            queryFn: usersService.getUsersAndBlogs
        }
    )
    if (usersResult.isLoading) {
        return (
            <div>Loading users data .....</div>
        )
    }
    console.log('usersResult is ', usersResult);
    if (usersResult.isSuccess) {
        const usersBlogs = usersResult.data
        return (
            <div>
                <h1>Users</h1>
                <Table striped>
                    <thead><tr>
                        <th>Users</th>
                        <th>blogs created</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            usersBlogs.map(
                                (usersBlog) => {
                                    return (
                                        <tr key={usersBlog.id}>
                                            <td><Link to={`/users/${usersBlog.id}`}>{usersBlog.name}</Link></td>
                                            <td>{usersBlog.blogs.length}</td>
                                        </tr>
                                    )
                                }
                            )

                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default Users