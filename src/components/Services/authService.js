import axios from "axios";

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
      }, {headers})
  }

  signup(data) {
    const headers = {
        'Content-Type': 'application/json',
      };
    return axios.post(API_URL + "signup", data, {headers});
  }

  profile(access_token) {
      const headers = {
          'Content-Type': 'application/json',
          Authorization: `${access_token}`,
        };
      return axios
        .post(API_URL + "profile", {headers})
  }

}

export default new AuthService();