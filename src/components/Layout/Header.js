/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../css/Header.css'
import { Link } from "react-router-dom";
import logo from '../../asset/logo.svg'

export default function Header() {
    const clickView = () => {
        window.scrollTo({
            top: 0, behavior:
                'smooth'
        });
    }


    return (
        <>
            <nav className="navbar-main fixed-top cl-effect-17">
                <a href="#" style={{ marginLeft: 70 }}><img src={logo} width={85}></img></a>
                <a href="#" style={{ marginLeft: 50 }} data-hover="Home">Home</a>
                <a href="#" style={{ marginLeft: 40 }} data-hover="Project">Project</a>
                <a href="#" style={{ marginLeft: 40 }} data-hover="Event">Event</a>
                <a href="#" style={{ marginLeft: 40 }} data-hover="About">About</a>
                <a href="#" style={{ marginLeft: 40 }} data-hover="Download">Download</a>

                <span style={{ marginLeft: 40 }} className="dropdown">
                    <span style={{ color: 'white' }}>ENG</span>
                    <div className="dropdown-content">
                        <button className='btn' style={{ width: 60, fontSize: 13 }}>VIE</button><br></br>
                        <button className='btn' style={{ width: 60, fontSize: 13 }}>ENG</button>
                    </div>
                </span>

                <span className="box-3 position-absolute top-50 end-0 translate-middle"><span className="btn btn-three"><span>&#160;&#160;SIGN IN&#160;&#160;<i class="fas fa-user-alt"></i></span></span></span>
            </nav>
            <br /> <br /> <br />
        </>
    )
}