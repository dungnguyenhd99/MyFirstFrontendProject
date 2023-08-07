/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles/css/Community.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import communityService from '../Services/communityService';
import io from 'socket.io-client';
import authService from '../Services/authService';
import { animateScroll } from 'react-scroll';

export default function Communinty() {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('userProfile')));
  const [search, setSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [friendRequestSearch, setFriendRequestSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const navigate = useNavigate();
  const saveToken = JSON.parse(localStorage.getItem('userToken'));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendRequestResponse, setFriendRequestResponse] = useState(null);
  const [currentChatFriend, setCurrentChatFriend] = useState({ friend_id: 1, friend_name: null, friend_avatar: null });
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userProfile) {
      navigate("/signin");
    } else {
      communityService.getFriendList(saveToken.accessToken, search).then((res) => {
        setFriendList(res.data.friendList);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [search])

  useEffect(() => {
    if (saveToken && userProfile) {
      communityService.searchForUsers(saveToken.accessToken, userSearch).then((res) => {
        setUserList(res.data.userList);
      }).catch((err) => {
        console.log(err);
      })

      communityService.searchForFriendRequest(saveToken.accessToken, friendRequestSearch).then((res) => {
        setFriendRequestList(res.data);
      }).catch((err) => {
        console.log(err);
      })

      communityService.getChatHistories(saveToken.accessToken).then((res) => {
        setMessages(res.data);
      }).catch((err) => {
        console.log(err);
      })

      const socket = io('ngtbackend-production.up.railway.app', {
        query: { userId: userProfile.id.toString() },
      });
      setSocket(socket);

      socket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      socket.on('newMessage', (messageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });

      // socket.on('chatHistory', (history) => {
      //   setMessages(history);
      //   console.log(history);
      // });

      return () => {
        // Cleanup: đóng kết nối khi component unmount
        socket.off('onlineUsers');
        socket.off('newMessage');
        socket.off('chatHistory');
        socket.disconnect();
      };
    }
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentChatFriend]);

  const scrollToBottom = useCallback(() => {
    animateScroll.scrollToBottom({
      containerId: 'chat-list-container',
      smooth: true,
    });
  });

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    // Create a URL for the image preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };

    authService.uploadAvatar(avatarFile).then((res) => {
      setImageInput(res.data.data.link);
    }).catch((err) => {
      console.log(err);
    })
  });

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (socket && (messageInput.trim() !== '' || imageInput.trim() !== '')) {
      // Gửi tin nhắn và hình ảnh mới lên máy chủ
      socket.emit('sendMessage', {
        userId: userProfile.id,
        friendId: currentChatFriend.friend_id ? currentChatFriend.friend_id : 1,
        message: messageInput,
        image: imageInput,
      });
      setMessageInput('');
      setImageInput('');
      console.log('gửi tin nhắn');
    }
  });

  const handleAddFriend = useCallback(() => {
    // Toggle the state to show/hide the pop-up
    setShowPopup(!showPopup);
  });

  const handleRequestList = useCallback(() => {
    // Toggle the state to show/hide the pop-up
    setShowPopup2(!showPopup2);
  });

  const handleSearchFriend = useCallback((e) => {
    setSearch(e.target.value);
  })

  const handleSearchUsers = useCallback((e) => {
    setUserSearch(e.target.value);
  });

  const handleSendFriendRequest = useCallback((e, friendId) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    communityService.addFriend(saveToken.accessToken, friendId).then((res) => {
      setFriendRequestResponse(res.data);
    }).catch((err) => {
      console.log(err);
    });
  });

  const handleSendAceptRequest = useCallback((e, friendshipId, accept) => {
    communityService.acceptFriendRequest(saveToken.accessToken, friendshipId, accept).then(() => {

      communityService.searchForFriendRequest(saveToken.accessToken, friendRequestSearch).then((res) => {
        setFriendRequestList(res.data);
      }).catch((err) => {
        console.log(err);
      })

      communityService.getFriendList(saveToken.accessToken, search).then((res) => {
        setFriendList(res.data.friendList);
      }).catch((err) => {
        console.log(err);
      })

    }).catch((err) => {
      console.log(err);
    });
  });

  const handleClickSearchUser = useCallback((e) => {
    e.preventDefault();
    communityService.searchForUsers(saveToken.accessToken, userSearch).then((res) => {
      setUserList(res.data.userList);
    }).catch((err) => {
      console.log(err);
    })
  });

  const handlePopupContainerClick = useCallback((event) => {
    // Check if the click event originated from the popup container
    if (event.target.classList.contains('popup-container')) {
      // Close the popup when clicking outside of it
      setShowPopup(false);
    }
  });

  const handleClickSearchUser2 = useCallback((e) => {
    e.preventDefault();
    communityService.searchForFriendRequest(saveToken.accessToken, friendRequestSearch).then((res) => {
      setFriendRequestList(res.data);
    }).catch((err) => {
      console.log(err);
    })
  });

  const formatDateTime = useCallback((dateTimeString) => {
    const date = new Date(dateTimeString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${hours}:${minutes}:${seconds}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${hours}:${minutes}:${seconds}`;
    } else {
      return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year} (${hours}:${minutes}:${seconds})`;
    }
  });

  const handlePopupContainerClick2 = useCallback((event) => {
    // Check if the click event originated from the popup container
    if (event.target.classList.contains('popup-container-2')) {
      // Close the popup when clicking outside of it
      setShowPopup2(false);
    }
  });

  const handleChatWithFriend = useCallback((e, friendId, friendName, friendAvatar) => {
    if (saveToken) {
      setCurrentChatFriend({ friend_id: friendId, friend_name: friendName, friend_avatar: friendAvatar });
      const listId = messages
        .filter(message => message.user_id === currentChatFriend.friend_id && message.friend_id === userProfile.id && !message.isRead)
        .map(message => message.id);
      communityService.markAsRead(saveToken.accessToken, listId);
    }
  });

  const onlineFriends = useCallback(friendList ? friendList.filter((friend) => onlineUsers.includes(friend.friendId)) : []);
  const offlineFriends = useCallback(friendList ? friendList.filter((friend) => !onlineUsers.includes(friend.friendId)) : []);
  const sortedFriendList = useCallback([...onlineFriends, ...offlineFriends]);

  const chatHistoryList = useCallback(
    messages.map((messageData) => {
      if ((messageData.friend_id === currentChatFriend.friend_id && messageData.user_id === userProfile.id) || (messageData.friend_id === userProfile.id && messageData.user_id === currentChatFriend.friend_id)) {
        return (
          <div key={messageData.id} style={{ marginTop: '10px' }}>
            <img src={messageData.user_id === userProfile.id ? userProfile.avatar : currentChatFriend.friend_avatar} height={30} width={30} style={{ borderRadius: 15 }} /> &#160;&#160;
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{messageData.user_id === userProfile.id ? userProfile.full_name : currentChatFriend.friend_name}</span> &#160;
            <span style={{ fontSize: '0.7rem', color: 'lightgray' }}>{formatDateTime(messageData.created_at)}</span> &#160;
            <p style={{ marginLeft: '2.7rem', fontSize: '0.9rem' }}>{messageData.message}</p>
            {messageData.image ? (<img src={messageData.user_id === userProfile.id ? userProfile.avatar : currentChatFriend.friend_avatar} height={200} width={200} style={{ marginLeft: '2.7rem' }} />) : <></>}
          </div>
        )
      } else {
        return <></>
      }
    }));

  return (
    <div className="community container-fluid text-light">
      <div className="row">
        <div className="col-2">
          <p className='text-center'><i className="fas fa-vr-cardboard"></i> &#160; Server name</p>
          <div className='friend-list'>
            <div className='server-list'>...</div>

            <div className='name-card'>
              <hr></hr>
              <div className='row'>
                <div className='col-2'>
                  <img src={userProfile ? (userProfile.avatar ? userProfile.avatar : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png') : null} height={43} width={43} style={{ borderRadius: 25, marginLeft: '10px' }} />
                </div>
                <div className='col-7 ms-3'>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>{userProfile ? (userProfile.full_name ? userProfile.full_name : userProfile.user_name) : null}</p>
                  <span style={{ fontSize: '0.7rem' }}><span style={{ color: 'green', fontSize: '0.5rem' }}><i className="fas fa-circle"></i></span> Online</span>
                </div>
                <div className='col-1 pt-2'>
                  <span><i className="fas fa-cog"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-8">
          <p className='text-center'><i className="fas fa-comment-alt"></i> &#160; Chat area</p>
          <div className='friend-list'>
            <div className='chat-friend'>
              {currentChatFriend ?
                (<>
                  <img src={currentChatFriend.friend_avatar ? currentChatFriend.friend_avatar : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'} height={30} width={30} style={{ borderRadius: 15 }} />
                  <span style={{ paddingLeft: 10, fontSize: '0.85rem' }}>{currentChatFriend.friend_name}</span>
                </>)
                : (<></>)}
            </div>
            <div className='chat-list ms-3' id='chat-list-container'>
              {chatHistoryList}
              <span className="scroll-to-bottom"></span>
            </div>
            <div className='chat-input'>
              <hr style={{ marginTop: 15, marginBottom: 10, color: '0f0f0f' }}></hr>
              <div style={{ display: 'flex', marginLeft: 15 }}>
                <label className="btn btn-sm btn-secondary" style={{ fontSize: '1.13rem', marginTop: 10, marginBottom: 10 }}>
                  <i className="fas fa-image"></i>
                  <input className='form-control form-control-sm' style={{ display: 'none' }} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
                </label> &#160;&#160;

                <form onSubmit={(e) => handleSendMessage(e)} style={{ display: 'flex' }}>
                  <input className="form-control" type="search" value={messageInput} placeholder="Message ..." aria-label="Search"
                    onChange={(e) => setMessageInput(e.target.value)}
                    style={{
                      backgroundColor: '#272626', color: 'white', fontSize: '0.9rem',
                      height: 40, width: 1085, border: 'none',
                    }}>
                  </input>

                  <button className='btn btn-secondary' style={{ height: 38, width: 80, marginTop: 10, marginLeft: 5 }} type='submit'><i className="fas fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="col-2">
          <p className='text-center'><i className="fas fa-user-friends"></i> &#160; Friend List</p>
          <div className='friend-list'>

            <div className='search-bar'>
              <input className="form-control me-2" type="search" placeholder="Search ..." aria-label="Search" style={{ backgroundColor: '#161616', color: 'white', fontSize: '0.9rem' }} onChange={handleSearchFriend} />
            </div>

            <div className="friend-list-container">
              <ul className='friend-list-mapper'>
                {sortedFriendList.length > 0 ? (
                  sortedFriendList.map((friend) => {
                    // Tìm các tin nhắn chưa đọc của người bạn hiện tại
                    const unreadMessages = messages.filter((message) =>
                      message.user_id === friend.friendId && message.friend_id === userProfile.id && !message.isRead
                    );

                    return (
                      <li className='friend-list-map' key={friend.friendshipId} style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                        <div className='row' onClick={(e) => handleChatWithFriend(e, friend.friendId, friend.friendFullname ? friend.friendFullname : friend.friendName, friend.friendAvatar)}>
                          <div className='col-3' style={{ display: 'flex' }}>
                            &#160;
                            <img src={friend.friendAvatar ? friend.friendAvatar : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'}
                              height={40} width={40} style={{ border: '1px solid white', borderRadius: 60 }} />
                            {unreadMessages.length > 0 ? <span className='unread-message-number'>{unreadMessages.length}</span> : <></>}
                          </div>
                          <div className='col-5 friend_name' style={{ fontSize: '0.85rem' }}>
                            {friend.friendFullname ? friend.friendFullname : friend.friendName}
                          </div>
                          <div className='col-2 pt-2'>
                            {onlineUsers.includes(friend.friendId) ? (
                              <span style={{ color: 'green', fontSize: '0.8rem' }}><i className="fas fa-circle"></i></span>
                            ) : (
                              <span style={{ color: 'gray', fontSize: '0.8rem' }}><i className="fas fa-circle"></i></span>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li>No friends found.</li>
                )}
              </ul>
            </div>

            <div className='friend-list-bottom text-center'>
              <button className='btn btn-success' style={{ fontSize: '0.7rem', width: 100 }} onClick={handleAddFriend}><i className="fas fa-user-plus"></i> Add friend</button>
              &#160;&#160;
              <button className='btn btn-primary' style={{ fontSize: '0.7rem', width: 100 }} onClick={handleRequestList}><i className="fas fa-stream"></i> Requests {friendRequestList.length > 0 ? <span className='friend-request-number'>{friendRequestList.length}</span> : <></>}</button>
            </div>

            {/* The pop-up of request*/}
            {showPopup2 && (
              <div className="popup-container-2" onClick={(event) => handlePopupContainerClick2(event)}>
                <div className="popup-content">
                  <form className="d-flex" onSubmit={handleClickSearchUser2}>
                    <input className="form-control me-2" type="search" placeholder="Search ..." aria-label="Search" style={{ backgroundColor: '#161616', color: 'white', fontSize: '0.9rem' }} onChange={handleSearchUsers} />
                    <button className='btn btn-success mt-2' style={{ fontSize: '0.8rem', height: '37px' }}>Search</button>
                  </form>

                  <div className="friend-list-container-2">
                    <ul className='friend-list-mapper'>
                      {friendRequestList.length > 0 ? (
                        friendRequestList.map((friend) => (
                          <li key={friend.user_id} style={{ paddingTop: '10px' }}>
                            <div className='row'>
                              <div className='col-1'>
                                <img src={friend ? (friend.friend_avatar ? friend.friend_avatar : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png') : null}
                                  height={40} width={40} style={{ border: '1px solid white', borderRadius: 60 }} />
                              </div>
                              <div className='col-9 friend_name'>
                                &#160; {friend ? friend.friend_fullName : friend.friend_name}
                              </div>
                              <div className='col-2'>
                                <button className='accept-button' onClick={(e) => handleSendAceptRequest(e, friend.id, true)}><i className="fas fa-check"></i></button>
                                <button className='reject-button' onClick={(e) => handleSendAceptRequest(e, friend.id, false)}><i className="fas fa-times"></i></button>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>No friends found.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* The pop-up of add friend*/}
            {showPopup && (
              <div className="popup-container" onClick={(event) => handlePopupContainerClick(event)}>
                <div className="popup-content">
                  <form className="d-flex" onSubmit={handleClickSearchUser}>
                    <input className="form-control me-2" type="search" placeholder="Search ..." aria-label="Search" style={{ backgroundColor: '#161616', color: 'white', fontSize: '0.9rem' }} onChange={handleSearchUsers} />
                    <button className='btn btn-success mt-2' style={{ fontSize: '0.8rem', height: '37px' }}>Search</button>
                  </form>

                  <div className="friend-list-container-2">
                    <ul className='friend-list-mapper'>
                      {userList.length > 0 ? (
                        userList.map((friend) => {
                          // Kiểm tra xem friend có trong friendList không
                          const isFriendInList = friendList.some((friendItem) => friendItem.friendId === friend.id);

                          // Nếu friend không có trong friendList thì thực hiện render thông tin
                          if (!isFriendInList) {
                            return (
                              <li key={friend.id} style={{ paddingTop: '10px' }}>
                                <div className='row'>
                                  <div className='col-1'>
                                    <img
                                      src={
                                        friend.avatar
                                          ? friend.avatar
                                          : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
                                      }
                                      height={40}
                                      width={40}
                                      style={{ border: '1px solid white', borderRadius: 60 }}
                                    />
                                  </div>
                                  <div className='col-9 friend_name'>&#160; {friend.full_name ? friend.full_name : friend.user_name}</div>
                                  <div className='col-1'>
                                    <button
                                      className='add-friend-button'
                                      onClick={(e) => handleSendFriendRequest(e, friend.id)}
                                    >
                                      <i className='fas fa-user-plus'></i>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          }
                          return null; // Trả về null nếu friend có trong friendList
                        })
                      ) : (
                        <li>No friends found.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}