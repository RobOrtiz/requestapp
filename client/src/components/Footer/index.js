import React from 'react';
import './style.css'

function Footer(props) {
    return (
        <div>
            <nav className="navbar fixed-bottom navbar-light bg-dark pb-3">
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "home" ? "fas fa-home fa-2x current-link": "fas fa-home fa-2x"}></i>
                    <h6 className={props.current === "home" ? "current-link" : ""}>Home</h6>
                </a>
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "request" ? "fas fa-music fa-2x current-link": "fas fa-music fa-2x"}></i>
                    <h6 className={props.current === "request" ? "current-link" : ""}>Requests</h6>
                </a>
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "events" ? "fas fa-calendar-check fa-2x current-link": "fas fa-calendar-check fa-2x"}></i>
                    <h6 className={props.current === "events" ? "current-link" : ""}>Events</h6>
                </a>
                <a className="navbar-brand col text-center" href="#">
                    <i className={props.current === "profile" ? "fas fa-user fa-2x current-link": "fas fa-user fa-2x"}></i>
                    <h6 className={props.current === "profile" ? "current-link" : ""}>Profile</h6>
                </a>    
            </nav>
        </div>
    )
}

export default Footer; 