/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
import '../../styles/css/AboutMe.css';
import Song02 from '../../asset/sounds/MainThemeMusic.mp3';
import Song04 from '../../asset/sounds/Song04.mp3';
import Song01 from '../../asset/sounds/Song01.mp3';
import Song03 from '../../asset/sounds/Song03.mp3';
import { Helmet } from 'react-helmet';
import MusicBar from '../ChildComponents/MusicBar';
import gif01 from '../../asset/images/gif01.gif';
import gif02 from '../../asset/images/gif02.gif';
import gif03 from '../../asset/images/gif03.gif';
import { useEffect, useState } from 'react';
import WeatherBar from '../ChildComponents/WeatherBar';

export default function AboutMe() {
    const [backgroundUrl, setBackgroundUrl] = useState(gif01);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const audioList = [
        { audioSource: Song01, songName: 'Id 072019 | 3107 - W/n ft. 267' },
        { audioSource: Song02, songName: 'Peaches - Justin Bieber ft. Daniel Caesar, Giveon' },
        { audioSource: Song03, songName: '海のまにまに - YOASOBI' },
        { audioSource: Song04, songName: '祝福 - YOASOBI' },
    ];

    useEffect(() => {
        switch (currentSongIndex) {
            case 0:
                setBackgroundUrl(gif01);
                break;
            case 1:
                setBackgroundUrl(gif02);
                break;
            case 2:
                setBackgroundUrl(gif03);
                break;
            default:
                setBackgroundUrl(gif01);
                break;
        }
    }, [currentSongIndex]);

    const handleMusicBarEvent = (eventData) => {
        if (eventData.type === 'songIndexChange') {
            setCurrentSongIndex(eventData.value);
        }
    };

    const getBackgroundStyle = () => {
        return {
            background: `url(${backgroundUrl})`,
        };
    };

    return (
        <div className="aboutme" style={getBackgroundStyle()}>
            <Helmet>
                <title>NGT Studio | Creator</title>
            </Helmet>
            <div className="page-content" id="page-content">
                {/* <div className="weather-player" style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 30}}>
                    <WeatherBar />
                </div> */}

                <div className="container-profile" style={{ display: "flex", justifyContent: "center", alignItems: "center", color: 'white', paddingTop: 55 }}>
                    <div>
                        <div className="card-profile user-card-full" style={{ width: 600 }}>
                            <div className="row m-l-0 m-r-0">
                                <div className="col-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="pb-3" style={{ paddingTop: 175 }}>
                                            <img src='https://64.media.tumblr.com/94ed37cc57863fba61742b9a68f4e7a7/9853b4dc4501eb38-6e/s540x810/1e68e41a53635194a679908075a0a9f9164ac5e3.gif' className="img-radius" height={110} width={110} style={{ border: '1px solid white', borderRadius: 60 }} alt="User-Profile-Image" />
                                            <br />
                                        </div>

                                        <h6 className="f-w-600" style={{ fontSize: '0.9rem' }}>
                                            Dung Nguyen
                                        </h6>

                                        <p style={{ fontSize: '0.8rem' }}>Backend Developer</p>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-8" style={{ backgroundColor: '#221f1e' }}>
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600" style={{ marginTop: 20, fontSize: '0.9rem' }}>Profile</h6>
                                        <div className="row">
                                            <div className="">
                                                <p className="m-b-10 f-w-600" style={{ fontSize: '0.9rem' }}>Email</p>
                                                <h6 className="text-muted f-w-400" style={{ fontSize: '0.85rem' }}>dungnguyent9902@gmail.com</h6>
                                            </div>
                                            <div className="">
                                                <p className="m-b-10 f-w-600" style={{ fontSize: '0.9rem' }}>Education</p>
                                                <h6 className="text-muted f-w-400" style={{ fontSize: '0.85rem' }}>National University Of Civil Engineering</h6>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600" style={{ fontSize: '0.9rem' }}>Histories</h6>
                                        <div className="row">
                                            <div className="">
                                                <p className="m-b-10 f-w-600" style={{ fontSize: '0.9rem' }}>Birth Date</p>
                                                <h6 className="text-muted f-w-400" style={{ fontSize: '0.85rem' }}>02-10-1999</h6>
                                            </div>

                                            <div className="pt-1">
                                                <p className="m-b-10 f-w-600" style={{ fontSize: '0.9rem' }}>Languages</p>
                                                <h6 className="text-muted f-w-400" style={{ fontSize: '0.85rem' }}>Java, Kotlin, JavaScript, Typescript, C#, Python</h6>
                                            </div>

                                            <div className="pt-1">
                                                <p className="m-b-10 f-w-600" style={{ fontSize: '0.9rem' }}>Frameworks</p>
                                                <h6 className="text-muted f-w-400" style={{ fontSize: '0.85rem' }}>Springboot, Reactjs, Nestjs, .NET, Flask</h6>
                                            </div>

                                            <div className="pt-1">
                                                <p className="m-b-10 f-w-600" style={{ fontSize: '0.9rem' }}>Hobbies</p>
                                                <h6 className="text-muted f-w-400" style={{ fontSize: '0.85rem' }}>Games, Football, Art</h6>
                                            </div>
                                        </div>

                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Social</h6>
                                        <div className="row">
                                            <ul className="social-link list-unstyled m-b-10">
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="fab fa-facebook"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="fab fa-twitter"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="fab fa-instagram"></i></a></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="audio-player" style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: 55 }}>
                    <MusicBar audioList={audioList} onMusicChange={handleMusicBarEvent} />
                </div>

                <div className="background-blur"></div>
            </div>
        </div>
    );
}