import React from 'react';
import './style.css'
// import LoginButton from "../LoginButton";
// import LogoutButton from "../LogoutButton";

function Header(props) {
    return (
        <div>
            <nav className="navbar fixed-top">
                <img src="https://i.ibb.co/bdJNc5g/Noi-Logo-200x200.png" alt="Noi-Logo-200x200" border="0" width="95" height="95" className="navbar-brand d-inline-block align-top" />
                {/* <LoginButton/><LogoutButton/> */}
                {props.title === 'welcome customer' ? (
                    <h1 className="text-center mr-3 text-white">WELCOME TO <span className="gold-color">NOI</span></h1>
                ) : (
                    <h1 className="text-center mr-3">{props.title}</h1>
                )}

            </nav>
        </div>
    )
}

export default Header;