import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getUserByHandle = async (handle) => {
  const response = await axios.get(`${baseUrl}/handle/${handle}`)
  return response.data
}

const clearBookmarks = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/clearBookmarks`)
  console.log(response)
  return response.data
}

const addBookmark = async (id,postID) => {
  const response = await axios.post(`${baseUrl}/${id}/addBookmark/${postID}`)
  return response.data
}

const removeBookmark = async (id,postID) => {
  const response = await axios.delete(`${baseUrl}/${id}/removeBookmark/${postID}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser, getUser, clearBookmarks, addBookmark, removeBookmark, getUserByHandle }