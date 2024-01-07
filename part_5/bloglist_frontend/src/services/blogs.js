import axios from "axios";
const baseUrl = "/api/blogs";
//const baseUrl = 'http://localhost:3003/api/blogs'
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = (savedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.post(baseUrl, savedBlog, config);
  return req.then((response) => response.data);
};
const updateFull = (inputBlog) => {
  const request = axios.put(`${baseUrl}/${inputBlog.id}`, inputBlog);
  return request.then((response) => response.data);
};
const delete_blog = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};
const getBlogById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
const updateComment = (comment_data) => {
  const request = axios.post(`${baseUrl}/${comment_data.id}/comment`, comment_data)
  return request.then(response => response.data)
}
export default { getAll, create, updateFull, delete_blog, getBlogById, setToken, updateComment };
