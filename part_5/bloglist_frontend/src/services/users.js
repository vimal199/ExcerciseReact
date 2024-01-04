import axios from "axios";
const baseUrl = "/api/users";
//const baseUrl2 = "http://localhost:3002/blogsbyusers"
const getUsersAndBlogs = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
}
const getBlogsByUser = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then((response) => response.data);
}
export default { getUsersAndBlogs, getBlogsByUser }