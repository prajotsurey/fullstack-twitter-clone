let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('set token in postservice: ',token)
}

export default { token, setToken }