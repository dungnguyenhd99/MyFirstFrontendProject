/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles/css/Community.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import communityService from '../Services/communityService';
import io from 'socket.io-client';

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

    const socket = io('ngtbackend-production.up.railway.app', {
      query: { userId: userProfile.id.toString() }, // Định danh userId trong thông báo kết nối
    });

    socket.on('onlineUsers', (users) => {
      // Nhận danh sách user_id đang trực tuyến từ socket server và cập nhật state
      setOnlineUsers(users);
    });

    return () => {
      // Cleanup: đóng kết nối khi component unmount
      socket.disconnect();
    };
  }, [])

  const handleAddFriend = () => {
    // Toggle the state to show/hide the pop-up
    setShowPopup(!showPopup);
  };

  const handleRequestList = () => {
    // Toggle the state to show/hide the pop-up
    setShowPopup2(!showPopup2);
  };

  const handleSearchFriend = (e) => {
    setSearch(e.target.value);
  }

  const handleSearchUsers = (e) => {
    setUserSearch(e.target.value);
  }

  const handleSendFriendRequest = (e, friendId) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    communityService.addFriend(saveToken.accessToken, friendId).then((res) => {
      setFriendRequestResponse(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleSendAceptRequest = (e, friendshipId, accept) => {
    communityService.acceptFriendRequest(saveToken.accessToken, friendshipId, accept).then(() => {
      
      communityService.searchForFriendRequest(saveToken.accessToken, friendRequestSearch).then((res) => {
        setFriendRequestList(res.data);
      }).catch((err) => {
        console.log(err);
      })

    }).catch((err) => {
      console.log(err);
    });
  }

  const handleClickSearchUser = (e) => {
    e.preventDefault();
    communityService.searchForUsers(saveToken.accessToken, userSearch).then((res) => {
      setUserList(res.data.userList);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handlePopupContainerClick = (event) => {
    // Check if the click event originated from the popup container
    if (event.target.classList.contains('popup-container')) {
      // Close the popup when clicking outside of it
      setShowPopup(false);
    }
  };

  const handleClickSearchUser2 = (e) => {
    e.preventDefault();
    communityService.searchForFriendRequest(saveToken.accessToken, friendRequestSearch).then((res) => {
      setFriendRequestList(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handlePopupContainerClick2 = (event) => {
    // Check if the click event originated from the popup container
    if (event.target.classList.contains('popup-container-2')) {
      // Close the popup when clicking outside of it
      setShowPopup2(false);
    }
  };

  const onlineFriends = friendList ? friendList.filter((friend) => onlineUsers.includes(friend.friendId)) : [];
  const offlineFriends = friendList ? friendList.filter((friend) => !onlineUsers.includes(friend.friendId)) : [];
  const sortedFriendList = [...onlineFriends, ...offlineFriends];

  return (
    <div className="community container-fluid text-light">
      <div className="row">
        <div className="col-2">
          <p className='text-center'><i class="fas fa-vr-cardboard"></i> &#160; Server name</p>
          <div className='friend-list'>...</div>
        </div>

        <div className="col-8">
          <p className='text-center'><i class="fas fa-comment-alt"></i> &#160; Chat area</p>
          <div className='friend-list'>...</div>
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
                  sortedFriendList.map((friend) => (
                    <li key={friend.friendshipId} style={{ paddingTop: '10px' }}>
                      <div className='row'>
                        <div className='col-2'>
                          <img src={friend.friendAvatar ? friend.friendAvatar : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'}
                            height={40} width={40} style={{ border: '1px solid white', borderRadius: 60 }} />
                        </div>
                        <div className='col-5 friend_name'>
                          &#160; {friend.friendFullname ? friend.friendFullname : null}
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
                  ))
                ) : (
                  <li>No friends found.</li>
                )}
              </ul>
            </div>

            <div className='friend-list-bottom text-center'>
              <button className='btn btn-success' style={{ fontSize: '0.7rem', width: 100 }} onClick={handleAddFriend}><i className="fas fa-user-plus"></i> Add friend</button>
              &#160;&#160;
              <button className='btn btn-primary' style={{ fontSize: '0.7rem', width: 100 }} onClick={handleRequestList}><i class="fas fa-stream"></i> Requests {friendRequestList.length > 0 ? <span className='friend-request-number'>{friendRequestList.length}</span> : <></>}</button>
            </div>

            {/* The pop-up of request*/}
            {showPopup2 && (
              <div className="popup-container-2" onClick={(event) => handlePopupContainerClick2(event)}>
                <div className="popup-content">
                  <form class="d-flex" onSubmit={handleClickSearchUser2}>
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
                                <img src={friend.user_avatar ? friend.user_avatar : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'}
                                  height={40} width={40} style={{ border: '1px solid white', borderRadius: 60 }} />
                              </div>
                              <div className='col-9 friend_name'>
                                &#160; {friend.user_fullName ? friend.user_fullName : null}
                              </div>
                              <div className='col-2'>
                                <button className='add-friend-button' onClick={(e) => handleSendAceptRequest(e, friend.id, true)}>Accept</button>
                                <button className='add-friend-button' onClick={(e) => handleSendAceptRequest(e, friend.id, false)}>Reject</button>
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
                  <form class="d-flex" onSubmit={handleClickSearchUser}>
                    <input className="form-control me-2" type="search" placeholder="Search ..." aria-label="Search" style={{ backgroundColor: '#161616', color: 'white', fontSize: '0.9rem' }} onChange={handleSearchUsers} />
                    <button className='btn btn-success mt-2' style={{ fontSize: '0.8rem', height: '37px' }}>Search</button>
                  </form>

                  <div className="friend-list-container-2">
                    <ul className='friend-list-mapper'>
                      {userList.length > 0 ? (
                        userList.map((friend) => (
                          <li key={friend.id} style={{ paddingTop: '10px' }}>
                            <div className='row'>
                              <div className='col-1'>
                                <img src={friend.avatar ? friend.avatar : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'}
                                  height={40} width={40} style={{ border: '1px solid white', borderRadius: 60 }} />
                              </div>
                              <div className='col-9 friend_name'>
                                &#160; {friend.full_name ? friend.full_name : null}
                              </div>
                              <div className='col-1'>
                                <button className='add-friend-button' onClick={(e) => handleSendFriendRequest(e, friend.id)}><i class="fas fa-user-plus"></i></button>
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
          </div>
        </div>
      </div>
    </div>
  );
}