/* eslint-disable jsx-a11y/alt-text */
import bg from '../../asset/images/signin-bg.png'
import '../../styles/css/Signin.css';
import sc from '../../asset/images/success.png'
import { useTranslation } from 'react-i18next';

export default function SendSuccess() {
    const { t } = useTranslation();
    return (
        <>
            <div className="signin" style={{
                background: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right',
                transition: 'background-position 1s ease-in-out', marginTop: 70, paddingTop: 150, paddingBottom: 200,
                color: 'white',
                textAlign: 'center',
            }}>
                <div className="container" id="container" style={{ backgroundColor: '#080808e1' }}>
                    <div>
                        <img src={sc} height={300} />
                        <h5 style={{ marginTop: 50 }}>{t('sendSuccess1')}</h5>
                        <h5>{t('sendSuccess2')}</h5>
                    </div>
                </div>
            </div>
        </>
    );
}
