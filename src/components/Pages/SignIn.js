import React from "react";
import authService from "../Services/authService";
import { Link } from 'react-router-dom';
import {useState } from "react";

export default function Signin() {
  const [stateLogin, setStateLogin] = useState({
    user_name: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    setStateLogin({
      ...stateLogin,
    });

    authService.signin(stateLogin.user_name, stateLogin.password).then((res) => {
      console.log(res.data);
      localStorage.setItem('userToken', res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="login">
    <div className="container" style={{height: '680px'}}>
      <div className="row pt-5">
        <div className="col-md-8"></div>
        <div className="col-md-4 p-5 mt-4" style={{backgroundColor:'white', borderRadius: '5px'}}>
          <div className="mb-3 text-center">
            <img className="img-fluid"
              src="https://i.imgur.com/N9Kg4e1.png" width="50%"/>
          </div>

          <form onSubmit={(e) => handleLogin(e)}>
            <div className="form-group">
              <label htmlFor="user_name">Tên đăng nhập</label>
              <input
                type="text"
                className="form-control"
                name="user_name"
                value={stateLogin.user_name}
                onChange={(e) => setStateLogin({
                  ...stateLogin,
                  user_name: e.target.value,
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={stateLogin.password}
                onChange={(e) => setStateLogin({
                  ...stateLogin,
                  password: e.target.value,
                })}
              />
            </div>

            <div className="form-group pt-3" style={{textAlign: 'center'}}>
              <button
                className="btn btn-primary btn-block"
                disabled={stateLogin.loading}
                style = {{padding: "5px 30px"}}
              >
                {stateLogin.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Đăng nhập</span>
              </button>
              <br/><br/>
              <span> Chưa có tài khoản?  <Link to={'/register'} style={{textDecoration: 'none'}}>Đăng kí ngay</Link> </span>
            </div>

            {stateLogin.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {stateLogin.message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}