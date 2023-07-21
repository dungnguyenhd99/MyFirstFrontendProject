/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "localhost:3000/friendship/";

class CommunintyService {
    getFriendList(access_token, search) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        };
        return axios.get(API_URL + `friend-list?search=${search}`, { headers })
    }
}

export default new CommunintyService();