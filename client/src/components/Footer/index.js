import React from 'react';
import './style.css'

function Footer(props) {
    return (
        <div>
            <nav className="navbar fixed-bottom navbar-light bg-light pb-3">
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "home" ? "fas fa-home fa-2x current-link": "fas fa-home fa-2x"}></i>
                    <h3 className={props.current === "home" ? "current-link" : ""}>Home</h3>
                </a>
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "request" ? "fas fa-music fa-2x current-link": "fas fa-music fa-2x"}></i>
                    <h3 className={props.current === "request" ? "current-link" : ""}>Requests</h3>
                </a>
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "events" ? "fas fa-calendar-check fa-2x current-link": "fas fa-calendar-check fa-2x"}></i>
                    <h3 className={props.current === "events" ? "current-link" : ""}>Events</h3>
                </a>
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "profile" ? "fas fa-user fa-2x current-link": "fas fa-user fa-2x"}></i>
                    <h3 className={props.current === "profile" ? "current-link" : ""}>Profile</h3>
                </a>    
            </nav>
        </div>
    )
}

export default Footer; 