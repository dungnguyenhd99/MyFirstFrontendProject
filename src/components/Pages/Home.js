/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from 'react';
import '../../styles/css/App.css';
import video from '../../asset/videos/background-video.mp4';
import ngt from '../../asset/images/ngtpresent.png'
import '../../styles/css/Home.css';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
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
import concept03 from '../../asset/videos/concept03.mp4';
import title02 from '../../asset/images/title02.png';
import title03 from '../../asset/images/title03.png';
import ReactModal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Helmet } from 'react-helmet';

export default function Home() {
  const { t } = useTranslation();

  const imageRef = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef4 = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);

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

  useEffect(() => {
    function handleScroll() {
      const image2 = imageRef2.current;
      const top2 = image2.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top2 < windowHeight * 0.75) {
        setIsVisible2(true);
      } else {
        setIsVisible2(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const image3 = imageRef3.current;
      const top3 = image3.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top3 < windowHeight * 0.75) {
        setIsVisible3(true);
      } else {
        setIsVisible3(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const image4 = imageRef4.current;
      const top4 = image4.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top4 < windowHeight * 0.75) {
        setIsVisible4(true);
      } else {
        setIsVisible4(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const handleOpenModal = () => { setIsModalOpen(true) };

  const handleOpenModal2 = () => { setIsModalOpen2(true) };

  const handleOpenModal3 = () => { setIsModalOpen3(true) };

  const handleCloseModal = () => { setIsModalOpen(false) };

  const handleCloseModal2 = () => setIsModalOpen2(false);

  const handleCloseModal3 = () => setIsModalOpen3(false);

  return (
    <>
      {/* ======================= ======================= Video Container ======================= ======================= */}
      {/* ======================= ======================= Video Container ======================= ======================= */}
      <Helmet>
        <title>NGT Studio | Home Page</title>
        <meta property="og:description" content="NGT Studio - Your Fantasy, Our Content" />
        <meta property="og:title" content="NGT Studio Official Website" />
        <meta property="og:image" content="https://i.postimg.cc/52QqNmbs/preview-Creator.png" />
        <meta property="og:url" content="https://ngtstudio.netlify.app/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className='home-module-video' style={{ position: 'relative' }}>
        <video ref={ref} preload="true" muted loop playsInline data-testid="hero:video" autoPlay style={{ width: '100%', height: '100%' }}>
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

      {/* ======================= ======================= Body 1 ======================= ======================= */}
      {/* ======================= ======================= Body 1 ======================= ======================= */}

      <div className='body-01-container container-fluid text-white' id='event'>
        <hr className="hr-text" data-content="NEWS" /><br />
        <div className='body-01 row'>
          <div className='col-2'></div>
          <div className='col-8 text-center'>
            <img ref={imageRef} className={isVisible ? "fade-in-1" : "fade-out-1"} src={thelastestspan} height={115} />
            <br /> <br />
          </div>
          <div className='col-2'></div>
        </div>
        <div className='body-02 row'>
          <div className='col-2'></div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <a href='https://www.youtube.com/watch?v=xjhQOX3B9tU&ab_channel=PlayStation' target='_blank' rel="noreferrer">
              <div className="card">
                <div className="wrapper">
                  <img src={card01bg} className="cover-image" />
                </div>
                <img src={card01logo} className="title-1" />
                <img src={card01character} className="character" />
              </div>
            </a>
          </div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <a href='https://www.youtube.com/watch?v=pyC_qiW_4ZY&ab_channel=PlayStation' target='_blank' rel="noreferrer">
              <div className="card">
                <div className="wrapper">
                  <img src={card02bg} className="cover-image" />
                </div>
                <img src={card02logo} className="title-1" />
                <img src={card02character} className="character" />
              </div>
            </a>
          </div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <a href='https://www.youtube.com/watch?v=UUiMHHG4w1Y&ab_channel=PlayDeceit' target='_blank' rel='noreferrer'>
              <div className="card">
                <div className="wrapper">
                  <img src={card03bg} className="cover-image" />
                </div>
                <img src={card03logo} className="title-1" />
                <img src={card03character} className="character" />
              </div>
            </a>
          </div>
          <div className={isVisible ? "col-2 fade-in-1" : "col-2 fade-out-1"}>
            <a href='https://www.youtube.com/watch?v=MnMJ0urMz54&ab_channel=GameSpot' target='_blank' rel='noreferrer'>
              <div className="card">
                <div className="wrapper">
                  <img src={card04bg} className="cover-image" />
                </div>
                <img src={card04logo} className="title-1" />
                <img src={card04character} className="character" />
              </div>
            </a>
          </div>
          <div className='col-2'></div>
        </div>

        {/* ======================= ======================= Body 2 ======================= ======================= */}
        {/* ======================= ======================= Body 2 ======================= ======================= */}

        <br id='myproject' /> <br />

        <hr className="hr-text mt-5" data-content="CONCEPTS" />
        <br />

        <div className={isVisible2 ? "fade-in-1 text-center" : "fade-out-1 text-center"}>
          <img ref={imageRef2} src={title02} height={43} />
        </div>

        <br /> <br />  <br />

        <div className='row'>
          <div className='col-2'></div>
          <div className='col-4 ps-5'>
            <span className={isVisible2 ? "fade-in-1" : "fade-out-1"}>
              <h5 style={{ fontFamily: 'Comic Sans MS', paddingTop: 15 }}>HOA AM HORROR DEMO</h5>
              <p style={{ paddingRight: 110, paddingTop: 10, fontSize: '.95rem' }}>{t('hoaamdescription')}</p>
              <p style={{ paddingRight: 110, overflow: 'auto', fontSize: '.95rem' }}>{t('hoaamdescription2')}</p>
              <span className="text-box">
                <ReactModal isOpen={isModalOpen2} onRequestClose={handleCloseModal2} style={{
                  content: { width: "42.7%", height: "54.7%", margin: "auto", backgroundColor: 'black' },
                  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)', },
                }}>
                  <iframe width="770" height="450" src="https://www.youtube.com/embed/lfHEgyeO8T4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                    style={{ display: 'block', margin: 'auto', }}
                  ></iframe>
                </ReactModal>

                <a href="javascript:void(0)" className="btn btn-white btn-animate" style={{ marginRight: 250 }} onClick={handleOpenModal2}><i className="fas fa-play" style={{ fontSize: '.7rem' }}></i> Demo</a>
                <a href="https://drive.google.com/u/6/uc?id=1F9DcEvNOy5TEzMCyt5C65_fmTGo4jbjq&export=download" target='_blank' className="btn btn-blue btn-animate" rel="noreferrer"><i className="fas fa-download" style={{ fontSize: '.7rem' }} onClick={handleOpenModal}></i> Download</a>
              </span>
            </span>
          </div>
          <div className='video-concept col-4 text-center'>
            <video className={isVisible2 ? "fade-in text-center" : "fade-out text-center"} ref={ref} autoPlay muted loop height={340} style={{ border: '2px solid rgba(44, 43, 47, 0.57)' }}>
              <source src={concept02} type="video/mp4" />
            </video>
          </div>
          <div className='col-2'></div>

        </div>
        <br />
        <hr className="hr-text mt-5" data-content="CONCEPTS 02" />

        <br />
        <div className={isVisible3 ? "fade-in-1 text-center" : "fade-out-1 text-center"}>
          <img ref={imageRef3} src={title03} height={55} />
        </div>
        <br />  <br />

        <div className='row'>
          <div className='col-2'></div>
          <div className='col-4 text-center'>
            <video ref={ref} className={isVisible3 ? "fade-in text-center" : "fade-out text-center"} autoPlay muted loop height={340} style={{ border: '2px solid rgba(44, 43, 47, 0.57)' }}>
              <source src={concept01} type="video/mp4" />
            </video>
          </div>
          <div className='col-4'>
            <span className={isVisible3 ? "fade-in-1" : "fade-out-1"}>
              <h5 style={{ fontFamily: 'Comic Sans MS', paddingTop: 60, paddingLeft: 110 }}>MEDIEVAL CITY LEVEL DESIGN</h5>
              <p style={{ paddingLeft: 110, paddingTop: 10, fontSize: '.95rem' }}>{t('citydescription')}</p>
              <p style={{ paddingLeft: 110, overflow: 'auto', fontSize: '.95rem' }}>{t('citydescription2')}</p>
              <span className="text-box">
                <ReactModal isOpen={isModalOpen3} onRequestClose={handleCloseModal3} style={{
                  content: { width: "42.7%", height: "54.7%", margin: "auto", backgroundColor: 'black' },
                  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)', },
                }}>
                  <iframe
                    width="770" height="450" src="https://www.youtube.com/embed/MnBXQodntz0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                    style={{ display: 'block', margin: 'auto', }}
                  ></iframe>
                </ReactModal>

                <a href="javascript:void(0)" className="btn btn-white btn-animate" onClick={handleOpenModal3}><i className="fas fa-play" style={{ fontSize: '.7rem' }}></i> Demo</a>
                <a href="javascript:void(0)" style={{ marginLeft: 250 }} className="btn btn-blue btn-animate" rel="noreferrer"><i className="fas fa-download" style={{ fontSize: '.7rem' }} onClick={handleOpenModal}></i> Download</a>
              </span>
            </span>
          </div>
          <div className='col-2'></div>
        </div>
      </div >

      <hr className="hr-text mt-5" data-content="CONCEPTS 03" />
      <br />

      <div className={isVisible3 ? "fade-in-1 text-center" : "fade-out-1 text-center"}>
        <img ref={imageRef4} src={title03} height={55} />
      </div>
      <br /><br />
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-4'>
          <span className={isVisible4 ? "fade-in-1" : "fade-out-1"} style={{ color: 'white' }}>
            <h5 style={{ fontFamily: 'Comic Sans MS', paddingTop: 40 }}>RPG COMBAT SYSTEM</h5>
            <p style={{ paddingRight: 110, paddingTop: 10, fontSize: '.95rem' }}>{t('rpgdescription')}</p>
            <p style={{ paddingRight: 110, overflow: 'auto', fontSize: '.95rem' }}>{t('rpgdescription2')}</p>
            <span className="text-box">
              <ReactModal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={{
                content: { width: "42.7%", height: "54.7%", margin: "auto", backgroundColor: 'black' },
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)', },
              }}>
                <iframe width="770" height="450" src="https://www.youtube.com/embed/TgP6LXrM_xY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                  style={{ display: 'block', margin: 'auto', }}
                ></iframe>
              </ReactModal>

              <a href="javascript:void(0)" className="btn btn-white btn-animate" style={{ marginRight: 250 }} onClick={handleOpenModal}><i className="fas fa-play" style={{ fontSize: '.7rem' }}></i> Demo</a>
              <a href="javascript:void(0)" target='_blank' className="btn btn-blue btn-animate" rel="noreferrer"><i className="fas fa-download" style={{ fontSize: '.7rem' }} onClick={handleOpenModal}></i> Download</a>
            </span>
          </span>
        </div>
        <div className='video-concept col-4 text-center'>
          <video className={isVisible4 ? "fade-in text-center" : "fade-out text-center"} ref={ref} autoPlay muted loop height={340} style={{ border: '2px solid rgba(44, 43, 47, 0.57)' }}>
            <source src={concept03} type="video/mp4" />
          </video>
        </div>
        <div className='col-2'></div>
      </div>
      <br />
      <hr className="hr-text mt-5" data-content="CONCLUSION" />
      <br />  <br />
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-4 text-light'>
          <h2>How i made all of this ?</h2>
          <p style={{ paddingTop: 20, fontSize: '0.95rem' }}>{t('conclution1')}</p>
          <p style={{ fontSize: '0.95rem' }}>Start create your React app: <a href='https://create-react-app.dev'>https://create-react-app.dev</a></p>
          <p style={{ fontSize: '0.95rem' }}>Start create your Nest backend: <a href='https://docs.nestjs.com/first-steps'>https://docs.nestjs.com/first-steps</a></p>
          <p style={{ fontSize: '0.95rem' }}>Start create your Unreal Engine Project: <a href='https://www.unrealengine.com/en-US'>https://www.unrealengine.com/en-US</a></p>
          <p style={{ fontSize: '0.95rem' }}>Start create your 3d Model Free: <a href='https://www.blender.org/'>https://www.blender.org/</a></p>
        </div>
        <div className='col-4 text-center' style={{ paddingLeft: 100 }}>
          <img src='https://i.pinimg.com/originals/78/c6/f2/78c6f275d9cd802a053b2453233a4c6c.gif' height={250} />
        </div>
        <div className='col-2'></div>
      </div>

      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6 mt-5 pt-4'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={5}
            navigation={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
          >
            <SwiperSlide><img src='https://www.vhv.rs/dpng/d/498-4989583_nestjs-logo-hd-png-download.png' height={55} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://cdn.worldvectorlogo.com/logos/react-1.svg' height={55} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3pzMmevwtJl6MQYbv301-rFXJtQzAsYSPK_HJ9xwNKJPJ-M4ybc39brBV1S1RFkC9bqA&usqp=CAU' height={60} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png' height={55} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiERgeYqmgBy0ksDOpfYikYDJwtJGv420Dcg&usqp=CAU' height={55} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png' height={55} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://cdn.worldvectorlogo.com/logos/postman.svg' height={65} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://cdn3.iconfinder.com/data/icons/inficons/512/github.png' height={70} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://cdn.iconscout.com/icon/free/png-256/netlify-3628945-3030170.png' height={65} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://railway.app/brand/logo-light.png' height={70} style={{ paddingLeft: 45 }} /></SwiperSlide>
            <SwiperSlide><img src='https://d3uwib8iif8w1p.cloudfront.net/megascans/icons/bridge_icon_2048_preview.png' height={55} style={{ paddingLeft: 45 }} /></SwiperSlide>

            <br /><br /> <br />
          </Swiper>
        </div>
        <div className='col-3'></div>
      </div>

    </>
  );
}
