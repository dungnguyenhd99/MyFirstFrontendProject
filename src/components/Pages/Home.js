import '../../styles/css/App.css';
import video from '../../asset/videos/background-video.mp4';
import ngt from '../../asset/images/ngtpresent.png'
import '../../styles/css/Home.css';

export default function Home() {
  return (
    <>
      <div className='home-module-video' style={{ position: 'relative' }}>
        <video preload="true" muted loop playsInline data-testid="hero:video" autoPlay style={{ width: '100%', height: '100%' }}>
          <source src={video} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <p className='text-center' style={{ color: 'white', fontFamily: 'Comic Sans MS', letterSpacing: 3, paddingBottom: 7 }}>A PRODUCT OF NGT STUDIO</p>
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
    </>
  );
}
