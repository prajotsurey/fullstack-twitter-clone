import axios from 'axios';
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getBlogs = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlog = async(id) => {
  const response = await axios.get(`${baseUrl}/id`)
  return response.data
}


const createBlog = async (values) => {
  const config = { 
    headers: {  Authorization : token },
  }
  const response = await axios.post(baseUrl,values,config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getBlogs, createBlog, getBlog}