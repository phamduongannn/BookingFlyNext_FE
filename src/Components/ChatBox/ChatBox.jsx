import { jwtDecode } from 'jwt-decode';
import React, { Fragment, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:8081');

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [user_id, setUserId] = useState(null);
  const [dataChat, setDataChat] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('LOGIN_USER');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.user_id);
    }
    //load danh sách chat
    socket.on('load-chat', (lstChat) => {
      setDataChat(lstChat);
    });

    socket.on('mess-server', (data) => {
      setDataChat((prevData) => [...prevData, data]);
    });

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      const to = 1;
      const from = user_id;
      const roomId = to > from ? `${from}-${to}` : `${to}-${from}`;
      socket.emit('join-room', roomId);
      localStorage.setItem('roomId', roomId);
    }
  };

  useEffect(() => {
    const elChatConversation = document.querySelector(
      '.chat-conversation-chat-box'
    );
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
    <div className="fixed bottom-[20px] right-[20px] z-[1200]">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[355px] p-4 mr-14 mb-1">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-semibold">Chat with Support Center</h2>
            <button
              onClick={toggleChatbox}
              className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-white hover:bg-[#dcbb87] transition-all ease-in-out rounded-lg focus:outline-none"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="flex flex-col h-[400px]">
            <div className="chat-conversation-chat-box flex-grow overflow-y-auto">
              <div className="flex flex-col space-y-4 mr-2">
                {dataChat &&
                  dataChat.map((chat, i) => {
                    return (
                      <Fragment key={i}>
                        {chat.user_id !== user_id ? (
                          <div className="self-start bg-gray-200 text-black p-2 rounded-lg max-w-xs">
                            {chat.content}
                          </div>
                        ) : (
                          <div className="self-end bg-[#dcbb87] text-white p-2 rounded-lg max-w-xs">
                            {chat.content}
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
              </div>
            </div>
            <div className="border-t pt-2 mt-10 flex">
              <input
                id="txt-chat"
                type="text"
                className="w-full p-2 border rounded-l-lg focus:outline-none focus:border-[#dcbb87]"
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-[#dcbb87] text-white p-3 rounded-r-lg"
                id="btn-send"
                onClick={sendMessage}
              >
                &#x27A4;
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChatbox}
          className={`bg-[#e1b87f] text-white w-12 h-12 rounded-full focus:outline-none text-xl flex items-center justify-center transition-all ${
            isVisible ? 'block' : 'hidden'
          }`}
        >
          <i className="fa-brands fa-facebook-messenger"></i>
        </button>
      )}
    </div>
  );
};

export default Chatbox;
