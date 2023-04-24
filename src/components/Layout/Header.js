/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../styles/css/Header.css'
import { Link } from "react-router-dom";
import logo from '../../asset/logo.svg'
import { useTranslation } from 'react-i18next';
import vie from '../../asset/images/vie.png';
import eng from '../../asset/images/eng.webp';
import icon from '../../asset/images/icon.svg';
import { useLocation } from 'react-router-dom';
import authService from '../Services/authService';
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    const clickView = () => {
        window.scrollTo({
            top: 0, behavior:
                'smooth'
        });
    }

    if(token) {
        authService.profile(token).then((res) => {
            localStorage.setItem('userProfile', JSON.stringify(res.data));
            navigate("/");
            window.location.reload();
          }).catch((err) => {
            console.log(err);
          });
          localStorage.setItem('userToken', JSON.stringify(token));
    }

    const handleProfile = () => {
        navigate("/profile");
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
      }

    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('selectedLanguage', language);
    };

    const selectedLanguage = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'VI';

    return (
        <>
            <nav className="navbar-main fixed-top cl-effect-17">
                <Link className='title' to={'/'} style={{ marginLeft: 70 }} onClick={clickView}><img src={logo} width={85}></img></Link>
                <Link className='title' to={'/'} style={{ marginLeft: 50 }} onClick={clickView} data-hover={t('home')}>{t('home')}</Link>
                <Link className='title' to={'/'} style={{ marginLeft: 40 }} onClick={clickView} data-hover={t('project')}>{t('project')}</Link>
                <Link className='title' to={'/'} style={{ marginLeft: 40 }} onClick={clickView} data-hover={t('event')}>{t('event')}</Link>
                <Link className='title' to={'/'} style={{ marginLeft: 40 }} onClick={clickView} data-hover={t('about')}>{t('about')}</Link>
                <a className='title' href='https://drive.google.com/u/6/uc?id=1F9DcEvNOy5TEzMCyt5C65_fmTGo4jbjq&export=download' style={{ marginLeft: 40 }} data-hover={t('download')}>{t('download')}</a>

                <span>
                    <span style={{ marginLeft: 40, color: 'white' }} className="dropdown">
                        <span>{selectedLanguage.toUpperCase() === 'VI' ? (<><img src={vie} width={30} height={20}></img></>) : (<><img src={eng} width={26} height={16}></img></>)}</span>
                        <div className="dropdown-content">
                            <button className='btn text-light' style={{ width: 90, fontSize: 13 }} onClick={() => handleLanguageChange('vi')}>Vietnamese</button><br></br>
                            <button className='btn text-light' style={{ width: 90, fontSize: 13 }} onClick={() => handleLanguageChange('en')}>English</button>
                        </div>
                    </span>

                    {!userProfile ?
                        (<Link to={'/signin'} className="box-3 position-absolute top-50 end-0 translate-middle" onClick={clickView}><span className="btn btn-three"><span>&#160;&#160;{t('signin')}&#160;&#160;<i className="fas fa-ghost"></i></span></span></Link>) :
                        (<> <span style={{ color: 'white' }} className="dropdown box-3 position-absolute top-50 end-0 translate-middle">
                            <span>{userProfile ? (<><img src={icon} height={20}></img>&#160; &#160;<span>{userProfile.user_name}</span></>) : (<><img src={eng} width={26} height={16}></img></>)}</span>
                            <div className="dropdown-content">
                                <button className='btn text-light' style={{ width: 250, fontSize: 13 }} onClick={handleProfile}><i className="fa fa-user"></i>&#160; Account</button><br></br>
                                <button className='btn text-light' style={{ width: 250, fontSize: 13 }} onClick={handleLogout}><i className="fa fa-sign-out-alt"></i>&#160; Logout</button>
                            </div>
                        </span></>)}
                </span>
            </nav>
        </>
    )
}