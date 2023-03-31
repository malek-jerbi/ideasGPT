import api from "./ApiConfig";

const userApi = {
  
  createUser: (payload, token) => api.post(`/users/create`,payload,token),
  getUserByID: (id) => api.get(`/users/${id}`),


};

export default userApi;
