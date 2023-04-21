/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
import '../../styles/css/Profile.css';
import bg from '../../asset/images/signin-bg.png';
import icon from '../../asset/images/icon.svg';

const userProfile = JSON.parse(localStorage.getItem('userProfile'));

export default function Profile() {
    return (
        <div className="profile" style={{
            background: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            transition: 'background-position 1s ease-in-out', marginTop: 70, paddingTop: 150, paddingBottom: 200
        }}>
            <div className="page-content" id="page-content">
                <div className="container-profile" style={{ marginTop: 100, display: "flex", justifyContent: "center", alignItems: "center", color: 'white' }}>
                    <div className="col-xl-6 col-md-12" style={{ width: 650 }}>
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25 pt-4">
                                            <img src={icon} className="img-radius" height={90} alt="User-Profile-Image" />
                                        </div>
                                        <h6 className="f-w-600">{userProfile ? userProfile.user_name.split('@')[0] : 'None User'}</h6>
                                        <p>Classic Tier</p>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8" style={{ backgroundColor: '#221f1e' }}>
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Profile</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{userProfile ? userProfile.user_name : 'None Email'}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Type</p>
                                                <h6 className="text-muted f-w-400">{userProfile ? userProfile.type : 'None Type'}</h6>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Histories</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Create at</p>
                                                <h6 className="text-muted f-w-400">{userProfile ? userProfile.created_at.substring(0, 10) : 'No time'}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Last login</p>
                                                <h6 className="text-muted f-w-400">Coming soon</h6>
                                            </div>
                                        </div>
                                        <ul className="social-link list-unstyled m-t-40 m-b-10">
                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                        </ul>
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