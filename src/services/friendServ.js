import { http } from './config';

export const friendServ = {
  addFriend: (userId, friendId) => {
    return http.post(`/friends/add-friend/${userId}/${friendId}`);
  },
  getFriendByUserId: (user_id) => {
    return http.get(`/friends/get-friends-by-userId/${user_id}`);
  },
};
