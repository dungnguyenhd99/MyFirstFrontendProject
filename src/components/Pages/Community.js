/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles/css/Community.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import communityService from '../Services/communityService';
import io from 'socket.io-client';

export default function Communinty() {
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('userProfile')));
  const [search, setSearch] = useState('');
  const [friendList, setFriendList] = useState(null);
  const navigate = useNavigate();
  const saveToken = JSON.parse(localStorage.getItem('userToken'));

  useEffect(() => {
    if (!userProfile) {
      navigate("/signin");
    } else {
      communityService.getFriendList(saveToken.accessToken, search).then((res) => {
        setFriendList(res.data);
      }).catch((err) => {
        console.log(err);
      })

      const socket = io('ngtbackend-production.up.railway.app', {
        query: { userId: userProfile.id.toString() }, // Định danh userId trong thông báo kết nối
      });

      // Event listener để xử lý khi kết nối thành công
      socket.on('connect', () => {
        console.log('Connected to server');
        // Gửi yêu cầu đặt trạng thái lên backend (ví dụ: "online") cùng với userId
      });
  
      // Event listener để xử lý khi mất kết nối
      socket.on('disconnect', () => {
        console.log('Disconnected from server');
        // Gửi yêu cầu đặt trạng thái lên backend (ví dụ: "offline") cùng với userId
      });
  
      return () => {
        // Cleanup: đóng kết nối khi component unmount
        socket.disconnect();
      };
    }
  }, [])

  return (
    <div className="community container-fluid text-light">
      <div className="row">
        <div className="col-2">
          <p className='text-center'>Server name</p>
          <div className='friend-list'>...</div>
        </div>

        <div className="col-8">
          <p className='text-center'>Chat area</p>
          <div className='friend-list'>...</div>
        </div>

        <div className="col-2">
          <p className='text-center'>Friend List</p>
          <div className='friend-list'>
            <ul>
              {friendList && friendList.map((friend) => (
                <li key={friend.id}>{friend.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}