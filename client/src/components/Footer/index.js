import React from 'react';
import './style.css'

function Footer(props) {
    return (
        <div>
            <nav className="navbar fixed-bottom navbar-light bg-dark mb-0">
                <a className={props.current === "home" ? "navbar-brand col text-center current-link": "navbar-brand col text-center not-current"} href="/dj/dashboard">
                    <i className="fas fa-home fa-2x"></i>
                    <h3>Home</h3>
                </a>
                <a className={props.current === "request" ? "navbar-brand col text-center current-link": "navbar-brand col text-center not-current"} href="/dj/requests">
                    <i className="fas fa-music fa-2x"></i>
                    <h3>Requests</h3>
                </a>
                <a className={props.current === "activity" ? "navbar-brand col text-center current-link": "navbar-brand col text-center not-current"} href="/dj/activity">
                    <i className="fas fa-sliders-h fa-2x"></i>
                    <h3>Activity</h3>
                </a>
                <a className={props.current === "profile" ? "navbar-brand col text-center current-link": "navbar-brand col text-center not-current"} href="/dj/profile">
                    <i className="fas fa-user fa-2x"></i>
                    <h3>Profile</h3>
                </a>    
            </nav>
        </div>
    )
}

export default Footer; 