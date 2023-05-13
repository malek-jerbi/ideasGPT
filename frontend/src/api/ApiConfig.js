import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/',
})

export default api
