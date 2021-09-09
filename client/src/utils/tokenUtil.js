var token = null

const setToken = async () => {
  const user = JSON.parse(window.localStorage.getItem('blogappuser'))
  token = `bearer ${user.token}`
  console.log('set token: ', token)
}

const getToken = () => token

// eslint-disable-next-line import/no-anonymous-default-export
export default { token, setToken, getToken }