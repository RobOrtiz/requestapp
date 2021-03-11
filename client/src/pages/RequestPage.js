import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "../components/Grid";
import { InputText, FormBtn, InputCheckbox } from "../components/Form";
import API from "../utils/API";
import Header from "../components/Header";
import googleBadge from "../images/googleplaybadge.png";
import appleBadge from "../images/badge-download-on-the-app-store.svg";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated"

function RequestPage() {
  const { user } = useAuth0();
  const [formObject, setFormObject] = useState({
    fullName: "",
    title: "",
    artist: "",
  });

  useEffect(() => {
    checkIfProfileExists(user.sub);
  }, [])

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.createDj({
      fullName: formObject.fullName,
      title: formObject.djName,
      artist: formObject.hometown,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header title="Request Page" />
      <Container>
        <h1>Request Page</h1>
        <form>
          <Row>
            <Col>
            {/* This label is here because it creates margin */}
            <label forhtml="name">Your Name</label>
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
            <i class="far fa-image fa-10x" stlye={{color: "white", backgroundColor: "white"}}></i>
            </Col>
          </Row>
          <Row>
            <Col size="4">
            <InputCheckbox
              type="checkbox"
              id="generalRequest" 
              label="General Request"
              classname="for-check-input"/>
            </Col>
            <Col size="4">
              <p>minimum tip: $2</p>
            </Col>
          </Row>
          <Row>
            <Col size="4">
            <InputCheckbox
              type="checkbox"
              id="playNow" 
              label="Play Now"
              classname="for-check-input"/>
            </Col>
            <Col size="4">
              <p>minimum tip: $100</p>
            </Col>
          </Row>
          <Row>
            <Col>
          <InputText
            onChange={handleInputChange}
            type="text"
            id="tip"
            name="tip"
            placeholder="Tip Amount"
            className="form-control"
          />
          </Col>
          </Row>
          <FormBtn onClick={handleFormSubmit}>Submit</FormBtn>
        </form>
        <img src={appleBadge} alt={"appleBadge"}></img><img src={googleBadge} alt={"googleBadge"} style={{width: ""}}></img>
      </Container>
    </div>
  );
}

export default RequestPage;
