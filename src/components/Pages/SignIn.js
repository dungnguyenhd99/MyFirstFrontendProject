/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import authService from "../Services/authService";
import { useState } from "react";
import '../../styles/css/Signin.css';
import bg from '../../asset/images/signin-bg.png';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Signin() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stateLogin, setStateLogin] = useState({
    user_name: "",
    password: "",
  });
  const [stateSignup, setStateSignup] = useState({
    userName: "",
    password: "",
    fullName: "",
    email: "",
    type: "ACCOUNT",
    status: "ACTIVE",
    level: "USER",
  })

  const [errorSignUp, setErrorSignUp] = useState(null);
  const [error, setError] = useState(null);

  const [isSignin, setIsSignin] = useState(true);

  const changeToSignin = (e) => {
    setIsSignin(true);
  }

  const changeToSignup = (e) => {
    setIsSignin(false);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setStateLogin({
      ...stateLogin,
    });

    authService.signin(stateLogin.user_name, stateLogin.password).then((res) => {
      localStorage.setItem('userToken', JSON.stringify(res.data));
      authService.profile(res.data.accessToken).then((res) => {
        localStorage.setItem('userProfile', JSON.stringify(res.data));
        navigate("/");
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      setError(err.response.data.messageCode);
    });
  }

  const handleSignup = (e) => {
    e.preventDefault();

    setStateSignup({
      ...stateSignup,
    });

    if (stateSignup.userName.length < 6) {
      setErrorSignUp('Username must be at least 6 characters');
    } else if (stateSignup.password.length < 8) {
      setErrorSignUp('Password must be at least 8 characters')
    }
    else {
      authService.signup(stateSignup).then((res) => {
        console.log(res.data);
        navigate("/send-success");
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <div className="signin" style={{
      background: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'right',
      transition: 'background-position 1s ease-in-out', marginTop: 70, paddingTop: 150, paddingBottom: 200
    }}>
      <div className="container" id="container">
        {!isSignin ? (
          <div className="form-container sign-up-container">
            <form action="/send-success" onSubmit={(e) => handleSignup(e)}>
              <h1>{t('signup')}</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="https://ngtbackend-production.up.railway.app/auth/google" className="social"><i className="fab fa-google-plus-g"></i></a>
              </div>
              <span>{t('orUseYourEmailForRegistration')}</span>
              <input type="text" placeholder="Full Name" value={stateSignup.fullName}
                onChange={(e) => setStateSignup({ ...stateSignup, fullName: e.target.value, })}
                style={{ color: 'white' }}
              />
              <input type="email" placeholder="Email" value={stateSignup.userName}
                onChange={(e) => setStateSignup({ ...stateSignup, userName: e.target.value, })}
                style={{ color: 'white' }}
              />
              <input type="password" placeholder="Password" value={stateSignup.password}
                onChange={(e) => setStateSignup({ ...stateSignup, password: e.target.value, })}
                style={{ color: 'white' }}
              />
              <button style={{marginTop: 7}}>{t('signup')}</button>
              <p style={{ color: 'red' }}>{errorSignUp ? errorSignUp : (<></>)}</p>
            </form>
          </div>
        ) : (
          <div className="form-container sign-in-container">
            <form action="/" onSubmit={(e) => handleLogin(e)}>
              <h1>{t('signin')}</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="https://ngtbackend-production.up.railway.app/auth/google" className="social"><i className="fab fa-google-plus-g"></i></a>
              </div>
              <span>{t('orUseYourAccount')}</span>
              <input type="email" placeholder="Email" name="user_name"
                value={stateLogin.user_name}
                onChange={(e) => setStateLogin({ ...stateLogin, user_name: e.target.value, })}
                style={{ color: 'white' }}
              />
              <input type="password" placeholder="Password"
                value={stateLogin.password}
                onChange={(e) => setStateLogin({ ...stateLogin, password: e.target.value, })}
                style={{ color: 'white' }}
              />
              <a href="#">{t('forgotYourPassword')}</a>
              <button>{t('signin')}</button>
              <p style={{ color: 'red' }}>{error ? error : (<></>)}</p>
            </form>
          </div>
        )}
        <div className="overlay-container">
          <div className="overlay">
            {!isSignin ? (
              <div className="overlay-panel overlay-left">
                <h1>{t('welcomeBack')}</h1>
                <p>{t('signininfo')}</p>
                <button className="ghost" id="signIn" style={{ color: 'black', background: 'lightblue' }} onClick={(e) => changeToSignin(e)}>{t('signin')}</button>
              </div>
            ) : (
              <>
                <div className="overlay-panel overlay-right">
                  <h1>{t('helloFriend')}</h1>
                  <p>{t('signupinfo')}</p>
                  <button className="ghost" id="signUp" style={{ color: 'black', background: 'lightblue' }} onClick={(e) => changeToSignup(e)}>{t('signup')}</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}