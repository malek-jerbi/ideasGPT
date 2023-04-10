import api from "./ApiConfig";

const userApi = {
  
  createUser: (payload, token) => api.post(`/users/create`,payload,token),
  getUserByID: (id, token) => api.get(`/users/${id}`,token),
  getUserLikedIdeas: (id, token) => api.get(`/users/${id}/liked`,token),
  getUserClaimedIdeas: (id, token) => api.get(`/users/${id}/claimed`,token),


};

export default userApi;
