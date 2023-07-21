/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

class CommunintyService {
    getFriendList(access_token, search) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        };
        return axios.get('https://ngtbackend-production.up.railway.app/auth/' + `friend-list?search=${search}`, { headers })
    }
}

export default new CommunintyService();