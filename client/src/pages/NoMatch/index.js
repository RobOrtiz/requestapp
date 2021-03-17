import React from 'react';
import { Container, Row, Col } from '../../components/Grid';
import { Link } from "react-router-dom"; 
import "./styles.css";

function NoMatch() {

    return (
        <div className="nomatch-page">
            <Container classes="mt-5">
                <Row classes="p-5">
                    <Col size="12" classes="text-center">
                        <h1 className="mb-3 display-1">Error: 404</h1>
                        <h1><i class="fas fa-exclamation-triangle"></i></h1>
                        <h1 className="mb-5">Page Not Found</h1>
                        <p>Whoops! These things do happen.</p>
                        <p>If you're a DJ, click <Link to="/" className="nomatch-link">here</Link>!</p>
                        <p>If you're a customer making a request, click <Link to="/request" className="nomatch-link">here</Link>!</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NoMatch;