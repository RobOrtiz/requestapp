import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "../../components/Grid";


function Success() {

    const [djUrl, setDjUrl] = useState();

    useEffect(() => {
        getDJId();
    }, [])

  // Parse URL for djId
  function getDJId() {
    const url = window.location.href;
    var djId = url.substring(url.lastIndexOf("/") + 1)
    setDjUrl(djId);
  }

  return (
    <div className="confirmation-page">
        
        <img src="https://i.ibb.co/bdJNc5g/Noi-Logo-200x200.png" alt="Noi-Logo" border="0" width="200" height="200" className="d-block mx-auto" />
        <Container classes="text-center confirmation-top">
            
            <Row>
                <Col>
                    <h1 className="text-center mt-5 confirmation-text thank-you-text display-4">THANK YOU FOR USING <span className="logo-text">NOI</span>!</h1>
                    <h2 className="text-center mt-5 confirmation-text">YOUR REQUEST HAS BEEN SENT!</h2>
                </Col>
            </Row>
        </Container>
        <Container>
            {/* <Row>
                <Col>
                    <h5 className="text-center mt-3 confirmation-text">You will be notified via email when your song is being played.</h5>
                </Col>
            </Row> */}
            <Row>
                <Col>
                    <h2 className="text-center mt-2">Want to make another request?  Just click <a href={`/request/${djUrl}`}className="confirmation-link">here!</a></h2>
                    <h3 className="text-center mt-3 confirmation-text">(Do not use the back button.  This may cause an issue with your request)</h3>
                </Col>
            </Row>
        
        </Container>
    </div>
    );
}

export default Success;