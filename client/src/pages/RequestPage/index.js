import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "../../components/Grid";
import { InputText, FormBtn, InputCheckbox } from "../../components/Form";
import API from "../../utils/API";
import Header from "../../components/Header";
import googleBadge from "../../images/googleplaybadge.png";
import appleBadge from "../../images/badge-download-on-the-app-store.svg";
import './styles.css'

function RequestPage() {
  const [formObject, setFormObject] = useState({
    fullName: "",
    title: "",
    artist: "",
  });

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    // API.createDj({
    //   fullName: formObject.fullName,
    //   title: formObject.djName,
    //   artist: formObject.hometown,
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }

  return (
    <div className="request-page">
      <Header title="welcome customer" />
      <Container classes="top-container">
        <h1 className="request-title">SEND A REQUEST</h1>
        <form>
          <Row>
            <Col>
          <InputText
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            placeholder="Your name here"
            label="Your name:"
            className="form-control"
          />
          <InputText
            onChange={handleInputChange}
            type="text"
            id="title"
            name="title"
            placeholder="Song title"
            label="Title:"
            className="form-control"
          />
          <InputText
            onChange={handleInputChange}
            type="text"
            id="artist"
            name="artist"
            placeholder="Artist"
            label="Artist:"
            className="form-control"
          />
            </Col>
            <Col>
            <i className="far fa-image fa-10x" stlye={{color: "white", backgroundColor: "white"}}></i>
            </Col>
          </Row>
          <Row>
            <Col size="4">
            <InputCheckbox
              type="checkbox"
              id="generalRequest" 
              label="General Request"
              classname="form-check-input"
              tooltipTitle="A request will be sent to the DJ.  The DJ will review these after the Play Now requests."
              />
            </Col>
            <Col size="4">
              <p>Minimum tip: $2</p>
            </Col>
          </Row>
          <Row>
            <Col size="4">
            <InputCheckbox
              type="checkbox"
              id="playNow" 
              label="Play Now"
              classname="form-check-input"
              tooltipTitle="The DJ will see these requests immediately."
              />
            </Col>
            <Col size="4">
              <p>Minimum tip: $100</p>
            </Col>
          </Row>
          <Row>
            <Col>
          <InputText
            onChange={handleInputChange}
            type="number"
            id="tip"
            name="tip"
            placeholder="Tip Amount in $"
            className="form-control"
          />
          </Col>
          </Row>
          <FormBtn className="btn btn-dark btn-lg mb-3" onClick={handleFormSubmit}>Submit</FormBtn>
        </form>
        <div className="text-center">
          <img src={appleBadge} alt={"appleBadge"} className="mr-3"></img>
          <img src={googleBadge} alt={"googleBadge"} style={{width: ""}}></img>
        </div>
      </Container>
    </div>
  );
}

export default RequestPage;
