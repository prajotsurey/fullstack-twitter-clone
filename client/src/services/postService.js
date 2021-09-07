import axios from 'axios';
const baseUrl = '/api/posts'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('set token in postservice: ',token)
}

const getPosts = async() => {
  const config = { 
    headers: {  Authorization : token },
  }
  const response = await axios.get(baseUrl,config)
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

const likePost = async (postId) => {
  const config = { 
    headers: {  Authorization : token },
  }
  const response = await axios.post(`${baseUrl}/like/${postId}`,{},config)
  return response.data
}

const addBookmark = async (postID) => {
  const config = { 
    headers: {  Authorization : token },
  }
  console.log(token)
  const response = await axios.post(`${baseUrl}/addBookmark/${postID}`,{},config)
  return response.data
}

const removeBookmark = async (postID) => {
  const config = { 
    headers: {  Authorization : token },
  }
  const response = await axios.delete(`${baseUrl}/removeBookmark/${postID}`,config)
  return response.data
}


const getBookmarks = async() => {
  const config = { 
    headers: {  Authorization : token },
  }
  console.log(token)
  const response = await axios.get(`${baseUrl}/bookmarks/all`,config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getPosts, createPost, getPost, getPostsByUser, likePost, addBookmark, removeBookmark, token, getBookmarks}