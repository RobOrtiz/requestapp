import React from 'react';
import { Col } from "../Grid";
import './style.css'

function Footer(props) {
    return (
        <div>
            <nav className="navbar fixed-bottom navbar-light bg-dark mb-0">
                <Col size="3" classes="text-center">
                    <a className={props.current === "home" ? "navbar-brand col text-center current-link mr-0 p-0": "navbar-brand col text-center not-current mr-0 p-0"} href="/dj/dashboard">
                        <i className="fas fa-home fa-2x"></i>
                        <h3>Home</h3>
                    </a>
                </Col>
                <Col size="3" classes="text-center">
                    <a className={props.current === "request" ? "navbar-brand col text-center current-link mr-0 p-0": "navbar-brand col text-center not-current mr-0 p-0"} href="/dj/requests">
                        <i className="fas fa-music fa-2x"></i>
                        <h3>Requests</h3>
                    </a>
                </Col>
                <Col size="3" classes="text-center">
                    <a className={props.current === "activity" ? "navbar-brand col text-center current-link mr-0 p-0": "navbar-brand col text-center not-current mr-0 p-0"} href="/dj/activity">
                        <i className="fas fa-sliders-h fa-2x"></i>
                        <h3>Activity</h3>
                    </a>
                </Col>
                <Col size="3" classes="text-center">
                    <a className={props.current === "profile" ? "navbar-brand col text-center current-link mr-0 p-0": "navbar-brand col text-center not-current mr-0 p-0"} href="/dj/profile">
                        <i className="fas fa-user fa-2x"></i>
                        <h3>Profile</h3>
                    </a> 
                </Col>
            </nav>
        </div>
    )
}

export default Footer; 