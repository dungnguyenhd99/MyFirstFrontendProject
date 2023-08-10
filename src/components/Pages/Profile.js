/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
import '../../styles/css/Profile.css';
import bg from '../../asset/images/signin-bg.png';
import icon from '../../asset/images/icon.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../Services/authService';
import { Helmet } from 'react-helmet';

export default function Profile() {
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('userProfile')));
    const [isEditing, setIsEditing] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [updateData, setUpdateData] = useState({ full_name: userProfile ? userProfile.full_name : null, avatar: userProfile ? userProfile.avatar : null });
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();
    const saveToken = JSON.parse(localStorage.getItem('userToken'));

    useEffect(() => {
        if (!userProfile) {
            navigate("/");
        }
    }, [])

    function handleFileChange(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        // Create a URL for the image preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
    }

    function handleSubmitAvatar(event) {
        event.preventDefault();
        if (avatarFile) {
            authService.uploadAvatar(avatarFile)
                .then((response) => {
                    authService.updateProfile(saveToken.accessToken, { avatar: response.data.data.link }).then((res) => {
                        localStorage.setItem('userProfile', JSON.stringify(res.data));
                        setUserProfile(res.data)
                        setIsUpload(false);
                        setUpdateData({ avatar: response.data.data.link })
                    }).catch((err) => {
                        console.log(err);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleChange = (e, t) => {
        if (t === 1) {
            setUpdateData({ full_name: e.target.value });
        } else {
            setUpdateData({ avatar: e.target.value });
        }
    }

    const handleClickEdit = () => {
        setIsEditing(true);
    }

    const handleClickSave = (e) => {
        e.preventDefault();
        authService.updateProfile(saveToken.accessToken, updateData).then((res) => {
            localStorage.setItem('userProfile', JSON.stringify(res.data));
            setUserProfile(res.data)
        })
        setIsEditing(false)
    }

    const handleClickClose = () => {
        setIsEditing(false)
    }

    const handleClickUpload = () => {
        setIsUpload(true);
    }

    const handleClickCloseUpload = () => {
        setIsUpload(false)
    }

    return (
        <div className="profile" style={{
            background: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            transition: 'background-position 1s ease-in-out', marginTop: 70, paddingTop: 150, paddingBottom: 200
        }}>
            <Helmet>
                <title>NGT Studio | User Profile</title>
            </Helmet>

            <div className="page-content" id="page-content">
                <div className="container-profile" style={{ marginTop: 100, display: "flex", justifyContent: "center", alignItems: "center", color: 'white' }}>
                    <div className="col-6" style={{ width: 650 }}>
                        <div className="card-profile user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="pt-4 pb-3">
                                            {!isUpload ? (userProfile ? (userProfile.avatar ? (<img src={userProfile.avatar} className="img-radius" height={110} width={110} style={{ border: '1px solid white', borderRadius: 60 }} alt="User-Profile-Image" />) : (<img src={icon} className="img-radius" height={110} width={110} alt="User-Profile-Image" style={{ border: '1px solid white', borderRadius: 60, padding: 10 }} />)) : (<img src={icon} className="img-radius" height={110} width={110} alt="User-Profile-Image" style={{ border: '1px solid white', borderRadius: 60, padding: 10 }} />))
                                                :
                                                (<><form className='profile-form' onSubmit={handleSubmitAvatar}>
                                                    <label>
                                                        <input className='form-control form-control-sm' style={{ fontSize: '.73rem' }} type="file" onChange={handleFileChange} />
                                                    </label>
                                                    {previewUrl && (
                                                        <img src={previewUrl} alt="Avatar Preview" height={110} width={110} style={{ border: '1px solid white', borderRadius: 60 }} />
                                                    )}
                                                    <button className='btn btn-info mt-3' style={{ fontSize: '.75rem', textTransform: 'none', padding: 5, marginLeft: 15, marginRight: 10 }} type="submit">Save</button>
                                                    <button className='btn btn-danger mt-3' style={{ fontSize: '.75rem', textTransform: 'none', padding: 5 }} onClick={handleClickCloseUpload}>Cancel</button>
                                                </form></>)}
                                            <br />
                                            {!isUpload ? (<button className='btn btn-light' style={{ fontSize: '.65rem', marginTop: 13, textTransform: 'none', padding: 5 }} onClick={handleClickUpload}>Change avatar</button>) : null}
                                        </div>

                                        <h6 className="f-w-600">{isEditing ?
                                            (<>
                                                <form className='profile-form' onSubmit={handleClickSave}>
                                                    <input class="form-control form-control-sm" onChange={(e) => handleChange(e, 1)} value={updateData ? updateData.full_name : null} required />
                                                    <button className='btn text-light' type='submit' data-bs-toggle="tooltip" data-bs-placement="right" title="save" style={{ padding: 0, borderRadius: 50, border: '0px solid white', fontSize: '0.85rem' }}><i class="fas fa-check text-success"></i></button>
                                                    &#160;&#160;
                                                    <button className='btn text-light' data-bs-toggle="tooltip" data-bs-placement="right" title="cancel" style={{ padding: 0, borderRadius: 50, border: '0px solid white', fontSize: '0.85rem' }} onClick={handleClickClose}> <i class="fa fa-times text-danger" style={{ fontSize: '1rem', paddingTop: 2 }}></i></button>
                                                </form>
                                            </>)
                                            :
                                            (userProfile ? (userProfile.full_name ?
                                                (<>
                                                    {userProfile.full_name} &#160; <button className='btn text-light' data-bs-toggle="tooltip" data-bs-placement="right" title="Edit your name" style={{ padding: 0, borderRadius: 50, border: '0px solid white', fontSize: '0.85rem' }} onClick={handleClickEdit}><i class="fas fa-edit"></i></button>
                                                </>)
                                                :
                                                (<>
                                                    {userProfile.user_name.split('@')[0]} <button className='btn text-light' data-bs-toggle="tooltip" data-bs-placement="right" title="Edit your name" style={{ padding: 0, borderRadius: 50, border: '0px solid white', fontSize: '0.85rem' }} onClick={handleClickEdit}><i class="fas fa-edit"></i></button>
                                                </>))
                                                :
                                                'None User')}</h6>

                                        <p>Classic Tier</p>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-8" style={{ backgroundColor: '#221f1e' }}>
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600" style={{ marginTop: 40 }}>Profile</h6>
                                        <div className="row">
                                            <div className="col-8">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{userProfile ? userProfile.user_name : 'None Email'}</h6>
                                            </div>
                                            <div className="col-4">
                                                <p className="m-b-10 f-w-600">Type</p>
                                                <h6 className="text-muted f-w-400">{userProfile ? userProfile.type : 'None Type'}</h6>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Histories</h6>
                                        <div className="row">
                                            <div className="col-8">
                                                <p className="m-b-10 f-w-600">Create at</p>
                                                <h6 className="text-muted f-w-400">{userProfile ? userProfile.created_at.substring(0, 10) : 'No time'}</h6>
                                            </div>
                                            <div className="col-4">
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