import axios from 'axios';
import token from '../utils/tokenUtil';

const baseUrl = '/api/posts'


const getPosts = async() => {
  const returnedToken = await token.getToken()
  const config = { 
    headers: {  Authorization : returnedToken },
  }

  console.log(config)
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
  const returnedToken = await token.getToken()
  const config = { 
    headers: {  Authorization : returnedToken },
  }
  const response = await axios.post(`${baseUrl}/like/${postId}`,{},config)
  return response.data
}

const addBookmark = async (postID) => {
  const returnedToken = await token.getToken()
  const config = { 
    headers: {  Authorization : returnedToken },
  }
  console.log(token)
  const response = await axios.post(`${baseUrl}/addBookmark/${postID}`,{},config)
  return response.data
}

const removeBookmark = async (postID) => {
  const returnedToken = await token.getToken()
  const config = { 
    headers: {  Authorization : returnedToken },
  }
  const response = await axios.delete(`${baseUrl}/removeBookmark/${postID}`,config)
  return response.data
}


const getBookmarks = async() => {
  const returnedToken = await token.getToken()
  const config = { 
    headers: {  Authorization : returnedToken },
  }
  console.log(token)
  const response = await axios.get(`${baseUrl}/bookmarks/all`,config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {  getPosts, createPost, getPost, getPostsByUser, likePost, addBookmark, removeBookmark, getBookmarks}