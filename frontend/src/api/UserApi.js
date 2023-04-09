import api from "./ApiConfig";

const userApi = {
  
  createUser: (payload, token) => api.post(`/users/create`,payload,token),
  getUserByID: (id, token) => api.get(`/users/${id}`,token),
  getUserIdea: (id, payload, token) => api.post(`/users/${id}/ideas`,payload,token),

};

export default userApi;
