import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const createUser = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser, getUser }