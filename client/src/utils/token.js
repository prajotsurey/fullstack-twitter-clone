var token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getToken = () => token

// eslint-disable-next-line import/no-anonymous-default-export
export default { token, setToken, getToken }