import api from "./ApiConfig";

const userApi = {
  
  createUser: (payload, token) => api.post(`/users/create`,payload,token),
  getUserByID: (id, token) => api.get(`/users/${id}`,token),
  processClaim: (payload, token) => api.post(`/users/processClaim`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),


};

export default userApi;
