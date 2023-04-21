import '../../styles/css/Footer.css';
import logo from '../../asset/images/icon.svg';

export default function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container" style={{ textAlign: 'center', paddingTop: 40 }}>
                    <div className="row">
                        <div className="row">
                            <div className='col-3'>
                                <hr/> <br/>
                                <img src={logo} width={40} /> &#160; NGT Studio
                            </div>
                            <div className="col-3">
                                <hr />
                                <ul className="list-unstyled">
                                    <li><a href="" style={{fontWeight: 'bold'}}>Production</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>Benefits</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>Partners</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>Team</a></li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <hr />
                                <ul className="list-unstyled">
                                    <li><a href="" style={{fontWeight: 'bold'}}>Documentation</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>Support</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>Legal Terms</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>About</a></li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <hr />
                                <ul className="list-unstyled">
                                    <li><a href="" style={{fontWeight: 'bold'}}>Future</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>Support</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>Legal Terms</a></li>
                                    <li><a href="" style={{fontSize: '.9rem'}}>About</a></li>
                                </ul>
                            </div>
                        </div>
                        <ul className="nav">
                            <li className="nav-item"><a href="" className="nav-link pl-0"><i className="fa fa-facebook fa-lg"></i></a></li>
                            <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-twitter fa-lg"></i></a></li>
                            <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-github fa-lg"></i></a></li>
                            <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-instagram fa-lg"></i></a></li>
                        </ul>
                        <br />
                    </div>
                </div>
            </footer>
        </div>
    );
};