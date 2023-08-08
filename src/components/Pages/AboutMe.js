/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
import '../../styles/css/AboutMe.css';
import bg from '../../asset/images/signin-bg.png';
import ms from '../../asset/sounds/MainThemeMusic.mp3';
import { useEffect } from 'react';

const audio = new Audio(ms);

export default function AboutMe() {
    useEffect(() => {
        audio.play();

        return () => {
            audio.pause();
        };
    },[]);

    return (
        <div className="profile" style={{
            background: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            transition: 'background-position 1s ease-in-out', marginTop: 70, paddingTop: 150, paddingBottom: 200
        }}>
            <div className="page-content" id="page-content">
                <div className="container-profile" style={{ marginTop: 55, display: "flex", justifyContent: "center", alignItems: "center", color: 'white' }}>
                    <div>
                        <div className="card-profile user-card-full" style={{ width: 800 }}>
                            <div className="row m-l-0 m-r-0">
                                <div className="col-3 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="pb-3" style={{paddingTop: 80}}>
                                            <img src='https://64.media.tumblr.com/94ed37cc57863fba61742b9a68f4e7a7/9853b4dc4501eb38-6e/s540x810/1e68e41a53635194a679908075a0a9f9164ac5e3.gif' className="img-radius" height={110} width={110} style={{ border: '1px solid white', borderRadius: 60 }} alt="User-Profile-Image" />
                                            <br />
                                        </div>

                                        <h6 className="f-w-600" style={{fontSize: '0.9rem'}}>
                                            Dung Nguyen
                                        </h6>

                                        <p style={{fontSize: '0.8rem'}}>Backend Developer</p>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-9" style={{ backgroundColor: '#221f1e' }}>
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600" style={{ marginTop: 20 }}>Profile</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">dungnguyent9902@gmail.com</h6>
                                            </div>
                                            <div className="col-6">
                                                <p className="m-b-10 f-w-600">Education</p>
                                                <h6 className="text-muted f-w-400">National University Of Civil Engineering</h6>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Histories</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="m-b-10 f-w-600">Birth Date</p>
                                                <h6 className="text-muted f-w-400">02-10-1999</h6>
                                            </div>
                                            <div className="col-6">
                                                <p className="m-b-10 f-w-600">Experience</p>
                                                <h6 className="text-muted f-w-400">1 year</h6>
                                            </div>
                                        </div>

                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Social</h6>
                                        <div className="row">
                                            <ul className="social-link list-unstyled m-b-10">
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="fab fa-facebook"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="fab fa-twitter"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="fab fa-instagram"></i></a></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}