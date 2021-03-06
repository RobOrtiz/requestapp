import React from "react";
import { Container, Row, Col } from "../../components/Grid";
import './styles.css'


function Landing() {

    return (
        <div className="landing-page">
            <img src="https://i.ibb.co/bdJNc5g/Noi-Logo-200x200.png" alt="Noi-Logo" border="0" width="200" height="200" className="d-block mx-auto" alt="" />
            <Container classes="text-center landing-top">
                <Row>
                    <Col>
                        <h1 className="text-center mt-5 landing-text">WELCOME</h1>
                        <h2 className="text-center mt-5 landing-text">BRIDING THE GAP BETWEEN THE DJ AND THE DANCE FLOOR!</h2>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <h2 className="text-center mt-3 landing-text">CREATE YOUR <span className="logo-text">NOI</span> DJ ACCOUNT TO BEGIN RECEIVING REQUESTS!</h2>
                        <h2 className="text-center mt-5"><a href="/dj/signin" className="landing-link">SIGN IN / SIGN UP</a></h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-center mt-5 landing-text">Are you a customer making a request? Head over <a href="/request" className="landing-link">here!</a></h3>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Landing;