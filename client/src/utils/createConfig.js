const createConfig = async () => {
  const user = JSON.parse(await window.localStorage.getItem('blogappuser'))
  return {
    headers: {
      Authorization : `bearer ${user.token}`
    }
  }
}

export default createConfig;