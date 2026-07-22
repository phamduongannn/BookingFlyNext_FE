import { http } from './config';

export const userServ = {
  getAllUsers: () => {
    return http.get('/users/get-all-users');
  },
  getUserById: (id) => {
    return http.get(`/users/get-user-by-id/${id}`);
  },
};
