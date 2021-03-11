import React from 'react';
import './style.css'
// import LoginButton from "../LoginButton";
// import LogoutButton from "../LogoutButton";

function Header(props) {
    return (
        <div>
            <nav className="navbar fixed-top">
                <a className="navbar-brand" href="/dj/dashboard">
                <img src="https://i.ibb.co/bdJNc5g/Noi-Logo-200x200.png" alt="Noi-Logo-200x200" border="0" width="60" height="60" className="d-inline-block align-top" />
                </a>
                {/* <LoginButton/><LogoutButton/> */}
                <h1 className="text-center mr-2">{props.title}</h1>
            </nav>
        </div>
    )
}

export default Header;