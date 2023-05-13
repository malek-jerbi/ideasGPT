//import api from './ApiConfig'
import axios from 'axios'

const userApi = {
  createUser: (payload, token) => axios.post(`/users/create`, payload, token),
  getUserByID: (id, token) => axios.get(`/users/${id}`, token),
}

export default userApi
