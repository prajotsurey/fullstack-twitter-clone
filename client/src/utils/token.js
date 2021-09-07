var token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('set token in function: ',token)
}

const getToken = () => token

// eslint-disable-next-line import/no-anonymous-default-export
export default { token, setToken, getToken }