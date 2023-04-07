import axios from "axios";

// Allows cross-site Access-Control requests to be made using credentials
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export default api;