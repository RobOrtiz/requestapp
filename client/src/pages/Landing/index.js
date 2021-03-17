import React, { useEffect } from "react";
import { Container, Row, Col } from "../../components/Grid";
import './styles.css'
import LoginButton from "../../components/LoginButton"
import SignUpButton from "../../components/SignUpButton"
import { useAuth0 } from "@auth0/auth0-react";

function Landing() {
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        document.querySelector(".landing-logo").addEventListener('animationend', () => {
            document.querySelector(".landing-page").classList.remove("hide-overflow");
        })
    }, []);

    
    return (
        isAuthenticated && (
            window.location.replace("/dj/dashboard")
        ),
        !isAuthenticated && (
        <div className="landing-page hide-overflow">
            
            <img src="https://i.ibb.co/bdJNc5g/Noi-Logo-200x200.png" alt="Noi-Logo" border="0" width="200" height="200" className="d-block mx-auto landing-logo" />
            <div className="landing-content">
                <Container classes="text-center landing-top">
                    <Row>
                        <Col>
                            <h1 className="text-center mt-5 landing-text">WELCOME</h1>
                            <h2 className="text-center mt-5 landing-text">BRIDGING THE GAP BETWEEN THE DJ AND THE DANCE FLOOR!</h2>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <h2 className="text-center mt-3 landing-text">CREATE YOUR <span className="logo-text">NOI</span> DJ ACCOUNT TO BEGIN RECEIVING REQUESTS!</h2>
                            <div className="text-center login-button">
                                <LoginButton />
                                <SignUpButton />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className="text-center landing-text customer-text">Are you a customer making a request? Head over <a href="/request" className="landing-link">here!</a></h3>
                        </Col>
                    </Row>
                
                </Container>
            </div>
        </div>
        )
    )
}

export default Landing;