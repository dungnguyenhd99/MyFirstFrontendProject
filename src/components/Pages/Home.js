/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from 'react';
import '../../styles/css/App.css';
import video from '../../asset/videos/background-video.mp4';
import ngt from '../../asset/images/ngtpresent.png'
import '../../styles/css/Home.css';
import { useTranslation } from 'react-i18next';
import thelastestspan from '../../asset/images/thelastestspan1.png';
import card01logo from '../../asset/images/Card01-logo.png';
import card01bg from '../../asset/images/card01-bg.png';
import card01character from '../../asset/images/card01-character.png';
import card02bg from '../../asset/images/card02-bg.png';
import card02logo from '../../asset/images/card02-logo.png';
import card02character from '../../asset/images/card02-character.png';
import card03bg from '../../asset/images/card03-bg.png';
import card03logo from '../../asset/images/card03-logo.png';
import card03character from '../../asset/images/card03-character.png';
import card04bg from '../../asset/images/card04-bg.png';
import card04logo from '../../asset/images/card04-logo.png';
import card04character from '../../asset/images/card04-character.png';
import concept01 from '../../asset/videos/concept01.mp4';
import concept02 from '../../asset/videos/concept02.mp4';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const { t } = useTranslation();

  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    function handleScroll() {
      const image = imageRef.current;
      const top = image.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight * 0.75) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Email Container */}
      <div className='home-module-video' style={{ position: 'relative' }}>
        <video preload="true" muted loop playsInline data-testid="hero:video" autoPlay style={{ width: '100%', height: '100%' }}>
          <source src={video} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <p className='text-center' style={{ color: 'white', fontFamily: 'Comic Sans MS', letterSpacing: 3, paddingBottom: 7 }}>{t('homeMessage')}</p>
          <img alt="DiEdIEdieÍ" loading="lazy" src={ngt} />
          <div>
            <svg className="arrows">
              <path className="a1" d="M0 0 L30 32 L60 0"></path>
              <path className="a2" d="M0 20 L30 52 L60 20"></path>
              <path className="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Body 1  */}
      <div className='body-01-container container-fluid text-white'>
        <hr class="hr-text" data-content="NEWS" /><br />
        <div className='body-01 row'>
          <div className='col-2'></div>
          <div className='col-8 text-center'>
            <img ref={imageRef} className={isVisible ? "fade-in" : "fade-out"} src={thelastestspan} height={115} />
            <br /> <br />
          </div>
          <div className='col-2'></div>
        </div>
        <div className='body-02 row'>
          <div className='col-2'></div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <a href='https://www.youtube.com/watch?v=xjhQOX3B9tU&ab_channel=PlayStation' target='_blank' rel="noreferrer">
              <div class="card">
                <div class="wrapper">
                  <img src={card01bg} class="cover-image" />
                </div>
                <img src={card01logo} class="title-1" />
                <img src={card01character} class="character" />
              </div>
            </a>
          </div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <a href='https://www.youtube.com/watch?v=pyC_qiW_4ZY&ab_channel=PlayStation' target='_blank' rel="noreferrer">
              <div class="card">
                <div class="wrapper">
                  <img src={card02bg} class="cover-image" />
                </div>
                <img src={card02logo} class="title-1" />
                <img src={card02character} class="character" />
              </div>
            </a>
          </div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <div class="card">
              <div class="wrapper">
                <img src={card03bg} class="cover-image" />
              </div>
              <img src={card03logo} class="title-1" />
              <img src={card03character} class="character" />
            </div>
          </div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <div class="card">
              <div class="wrapper">
                <img src={card04bg} class="cover-image" />
              </div>
              <img src={card04logo} class="title-1" />
              <img src={card04character} class="character" />
            </div>
          </div>
          <div className='col-2'></div>
        </div>
        <br /> <br />

        <hr class="hr-text mt-5" data-content="CONCEPTS 01" />
        <br /> <br />

        <div className='row'>
          <div className='col-2'></div>
          <div className='col-4 text-center'>
            <h5>HOA AM HORROR DEMO</h5>
          </div>
          <div className='col-4 text-center'>
            <video ref={ref} autoPlay muted loop height={300}>
              <source src={concept02} type="video/mp4" />
            </video>
          </div>
          <div className='col-2'></div>
        </div>

        <hr class="hr-text mt-5" data-content="CONCEPTS 02" />
        <br /> <br />

        <div className='row'>
          <div className='col-2'></div>
          <div className='col-4 text-center'>
            <video ref={ref} autoPlay muted loop height={300}>
              <source src={concept01} type="video/mp4" />
            </video>
          </div>
          <div className='col-4 text-center'>
            <h5>MEDIEVAL CITY DESIGN CONCEPT</h5>
          </div>
          <div className='col-2'></div>
        </div>
      </div >
    </>
  );
}
