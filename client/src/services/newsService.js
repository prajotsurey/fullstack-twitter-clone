import axios from 'axios';

const getHeadlines = async () => {
  const API_KEY = '8988f296b7cb4d9ebdd3a39850f3331b'
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`)
  return response.data
}

export default {
  getHeadlines
}