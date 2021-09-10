import axios from 'axios';
import createConfig from '../utils/createConfig';

const baseUrl = '/api/posts'


const getPosts = async() => {
  const config = await createConfig();

  const response = await axios.get(baseUrl,config)
  return response.data
}

const getPostsByUser = async (userID) => {
  const response = await axios.get(`${baseUrl}/user/${userID}`)
  return response.data
}

const getPost = async(id) => {
  const config = await createConfig();

  const response = await axios.get(`${baseUrl}/${id}`,config)
  return response.data
}


const createPost = async (values) => {
  const config = await createConfig();
  
  const response = await axios.post(baseUrl,values,config)
  return response.data
}

const likePost = async (postId) => {
  const config = await createConfig();

  const response = await axios.post(`${baseUrl}/like/${postId}`,{},config)
  return response.data
}

const addBookmark = async (postID) => {
  const config = await createConfig();

  const response = await axios.post(`${baseUrl}/addBookmark/${postID}`,{},config)
  return response.data
}

const removeBookmark = async (postID) => {
  const config = await createConfig();

  const response = await axios.delete(`${baseUrl}/removeBookmark/${postID}`,config)
  return response.data
}


const getBookmarks = async() => {
  const config = await createConfig();
  const response = await axios.get(`${baseUrl}/bookmarks/all`,config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {  getPosts, createPost, getPost, getPostsByUser, likePost, addBookmark, removeBookmark, getBookmarks}