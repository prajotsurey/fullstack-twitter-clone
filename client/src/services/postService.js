import axios from 'axios';
const baseUrl = '/api/posts'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getPosts = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getPostsByUser = async (userID) => {
  const response = await axios.get(`${baseUrl}/user/${userID}`)
  return response.data
}

const getPost = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}


const createPost = async (values) => {
  const config = { 
    headers: {  Authorization : token },
  }
  const response = await axios.post(baseUrl,values,config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getPosts, createPost, getPost, getPostsByUser}