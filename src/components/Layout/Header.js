/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../styles/css/Header.css'
import { Link } from "react-router-dom";
import logo from '../../asset/logo.svg'
import { useTranslation } from 'react-i18next';
import vie from '../../asset/images/vie.png';
import eng from '../../asset/images/eng.webp'

export default function Header() {
    const { t, i18n } = useTranslation();

    const clickView = () => {
        window.scrollTo({
            top: 0, behavior:
                'smooth'
        });
    }

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('selectedLanguage', language);
    };

    const selectedLanguage = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'VI';

    return (
        <>
            <nav className="navbar-main fixed-top cl-effect-17">
                <Link to={'/'} style={{ marginLeft: 70 }}><img src={logo} width={85}></img></Link>
                <Link to={'/'} style={{ marginLeft: 50 }} data-hover={t('home')}>{t('home')}</Link>
                <Link to={'/'} style={{ marginLeft: 40 }} data-hover={t('project')}>{t('project')}</Link>
                <Link to={'/'} style={{ marginLeft: 40 }} data-hover={t('event')}>{t('event')}</Link>
                <Link to={'/'} style={{ marginLeft: 40 }} data-hover={t('about')}>{t('about')}</Link>
                <Link to={'/'} style={{ marginLeft: 40 }} data-hover={t('download')}>{t('download')}</Link>

                <span>
                    <span style={{ marginLeft: 40, color: 'white' }} className="dropdown">
                        <span>{selectedLanguage.toUpperCase() === 'VI' ? (<><img src={vie} width={30} height={20}></img></>) : (<><img src={eng} width={26} height={16}></img></>)}</span>
                        <div className="dropdown-content">
                            <button className='btn' style={{ width: 60, fontSize: 13 }} onClick={() => handleLanguageChange('vi')}>Vietnamese</button><br></br>
                            <button className='btn' style={{ width: 60, fontSize: 13 }} onClick={() => handleLanguageChange('en')}>English</button>
                        </div>
                    </span>

                    <span className="box-3 position-absolute top-50 end-0 translate-middle"><span className="btn btn-three"><span>&#160;&#160;{t('signin')}&#160;&#160;<i className="fas fa-user-alt"></i></span></span></span>
                </span>
            </nav>
        </>
    )
}