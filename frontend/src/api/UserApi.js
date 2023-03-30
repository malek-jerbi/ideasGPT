import api from "./ApiConfig";

const userApi = {
  
  createUser: (payload, token) => api.post(`/users/create`,payload,token),



};

export default userApi;
