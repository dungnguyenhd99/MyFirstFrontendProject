import '../../styles/css/App.css';
import video from '../../asset/videos/background-video.mp4';

export default function Home() {
  return (
    <>
      <div className='home-module-video'>
        <div className="video-background">
          <video preload="true" muted loop playsInline data-testid="hero:video" autoPlay style={{width: '100%', height: '100%'}}>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
