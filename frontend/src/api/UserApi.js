import axios from 'axios';

const userApi = {
  createUser: (payload, token) =>
    axios.post(`/users/create`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getUserByID: (id, token) =>
    axios.get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  claimIdea: (id, ideaId, config) =>
    axios.post(`/users/${id}/claim`, { ideaId }, config),
  reduceCredits: (id, token) =>
    axios.post(
      `/users/${id}/reduce-credits`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    ),
};

export default userApi;

