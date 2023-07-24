/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "https://ngtbackend-production.up.railway.app/friendship/";

class CommunintyService {
  getFriendList(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL + `list?search=${search}`, { headers })
  }

  searchForUsers(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL + `search-friend-list?search=${search}&take=10`, {headers})
  }
}

export default new CommunintyService();