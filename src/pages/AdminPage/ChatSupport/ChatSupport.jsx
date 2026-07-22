import { jwtDecode } from 'jwt-decode';
import React, { Fragment, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { friendServ } from '../../../services/friendServ';
import { Avatar } from 'antd';

const socket = io('ws://localhost:8081');

const ChatSupport = () => {
  const [user_id, setUserId] = useState(null);
  const [listFriends, setListFriends] = useState([]);
  const [dataChat, setDataChat] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  useEffect(() => {
    if (user_id !== null) {
      friendServ
        .getFriendByUserId(user_id)
        .then((res) => {
          setListFriends(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user_id]);

  useEffect(() => {
    const token = localStorage.getItem('LOGIN_USER');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.user_id);
    }
    // Load danh sách chat
    socket.on('load-chat', (lstChat) => {
      setDataChat(lstChat);
    });

    socket.on('mess-server', (data) => {
      setDataChat((prevData) => [...prevData, data]);
    });
  }, []);

  useEffect(() => {
    if (selectedFriendId !== null) {
      const to = selectedFriendId;
      const from = user_id;
      const roomId = to > from ? `${from}-${to}` : `${to}-${from}`;
      localStorage.setItem('roomId', roomId);
      socket.emit('join-room', roomId);
    }
  }, [selectedFriendId, user_id]);

  const handleFriendClick = (friendId) => {
    setSelectedFriendId(friendId);
  };

  useEffect(() => {
    const elChatConversation = document.querySelector('.chat-conversation');
    if (!elChatConversation) return;
    elChatConversation.scrollTop = elChatConversation.scrollHeight;
  }, [dataChat]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const txtChat = document.querySelector('#txt-chat').value;
    const roomId = localStorage.getItem('roomId');
    socket.emit('send-mess', {
      user_id: user_id,
      txtChat,
      roomId,
    });
    document.querySelector('#txt-chat').value = '';
  };

  return (
    <>
      <div className="grid md:grid-cols-[300px_1fr] h-[580px] w-full">
        <div className="bg-[white] border-r flex flex-col">
          <div className="bg-white top-0 border-b p-4">
            <h2 className="text-lg font-semibold">Customer</h2>
          </div>
          {/* List Friends */}
          <div className="flex-1 h-[700px] overflow-y-auto">
            <div className="p-4 grid gap-4">
              {listFriends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg cursor-pointer"
                  onClick={() =>
                    handleFriendClick(
                      friend.users_user_friends_friend_idTousers.user_id
                    )
                  }
                >
                  <span className="relative flex shrink-0 overflow-hidden">
                    <Avatar size={45}>
                      {friend.users_user_friends_friend_idTousers.full_name}
                    </Avatar>
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-[#dcbb87] text-[17px]">
                      {friend.users_user_friends_friend_idTousers.full_name}
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      Active recently
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Chat */}
        <div className="flex flex-col overflow-y-auto">
          <div className="top-0 border-b p-4 bg-background">
            <h2 className="text-lg font-semibold">Chat</h2>
          </div>
          <div className="chat-conversation flex-1 overflow-auto p-4 grid gap-4">
            {dataChat &&
              dataChat.map((chat, index) => (
                <div
                  key={index}
                  className={`flex gap-4 mb-4 ${
                    chat.user_id === user_id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 ${
                      chat.user_id === user_id ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span className="relative flex shrink-0 overflow-hidden">
                      {chat.users && (
                        <Avatar size={45}>{chat.users.full_name}</Avatar>
                      )}
                    </span>
                    <div className="grid gap-1 text-sm max-w-[80%]">
                      <p className="font-medium text-[13px]">
                        {chat.users && chat.users.full_name}
                      </p>
                      <div
                        className={`prose text-muted-foreground p-3 rounded-lg ${
                          chat.user_id === user_id
                            ? 'bg-gray-100'
                            : 'bg-[#dcbb87]'
                        }`}
                      >
                        <p>{chat.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Bottom */}
          <div className="sticky bottom-0 border-t p-4 bg-white">
            <div className="relative">
              <textarea
                className="flex w-full bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#dcbb87] min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
                placeholder="Type your message..."
                id="txt-chat"
                rows={1}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={sendMessage}
                id="btn-send"
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-[#dcbb87] bg-primary text-primary-foreground absolute w-8 h-8 top-3 right-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSupport;
