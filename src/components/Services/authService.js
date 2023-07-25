/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import FormData from 'form-data';

const API_URL = "https://ngtbackend-production.up.railway.app/auth/";

class AuthService {
  signin(user_name, password) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(API_URL + "signin", {
        user_name,
        password,
        type: "ACCOUNT"
      }, { headers })
  }

  signup(data) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios.post(API_URL + "signup", data, { headers });
  }

  profile(accessToken) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    return axios.get(API_URL + "profile", { headers })
  }

  updateProfile(access_token, updateData) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };

    return axios.patch(API_URL + "profile", updateData, { headers })
  }

  async uploadAvatar(file) {
    const data = new FormData();
    data.append('image', file);

    const headers = {
      'Authorization': 'Client-ID 8a615a13eef111e',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.imgur.com/3/image',
      headers: headers,
      data: data,
    };

    return await axios.request(config);
  }

}

export default new AuthService();