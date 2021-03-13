import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Container, Row, Col } from "../../components/Grid";
import { InputText, FormBtn, InputCheckbox } from "../../components/Form";
import API from "../../utils/API";
import Header from "../../components/Header";
import googleBadge from "../../images/googleplaybadge.png";
import appleBadge from "../../images/badge-download-on-the-app-store.svg";
import StripeCheckout from 'react-stripe-checkout';
import Stripe from '../../utils/stripe';
import EventPic from '../../images/st pattys day.jpg'
import './styles.css'
import { Link } from 'react-router-dom';

function RequestPage() {
  const [formObject, setFormObject] = useState({
    fullName: "",
    title: "",
    artist: ""
  });
  
  const [ general, setGeneral ] = useState(false)
  const [ playNow, setPlayNow ] = useState(false)

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "Song Request"
  });

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  var djId = 'ObjectId("604d0c075d26ca3f74fe8549")';
 
  function handleFormSubmit(event) {
    
    event.preventDefault();
    setProduct({
      name: formObject.title + ", " + formObject.artist,
      price: formObject.tip
    });

    if (document.getElementById("generalRequest").checked === true) {
      setGeneral(true)
    } else {
      setPlayNow(true)
    }
  }

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      addToDatabase()
    }
  }, [general, playNow])

  function addToDatabase() {
    API.createRequest({
      tip: formObject.tip,
      fullName: formObject.fullName,
      title: formObject.title,
      artist: formObject.artist,
      generalRequest: general,
      playNow: playNow,
      _id: djId
    }).then(res => {
        document.querySelector(".StripeCheckout").click();
      })
      .catch(err => console.log(err))
  }

  async function handleToken(token, addresses) {
    const response = await Stripe.checkout(token, product);
    const { status } = response.data
    if (status === 'success') {
      console.log("worked")
      window.location.replace("/request/confirmation")
    }
  }

  return (
    <div className="request-page">
      <Header title="welcome customer" />
      <Container classes="top-container">
        <h1 className="request-title">SEND A REQUEST</h1>
        <form>
          <Row>
            <Col>
            <img src={EventPic} alt={"appleBadge"} className="eventPic"></img>
              {/* <i className="far fa-image fa-10x" stlye={{color: "white", backgroundColor: "white"}}></i> */}
            </Col>
            <Col>
              <InputText
                onChange={handleInputChange}
                type="text"
                id="fullName"
                name="fullName"
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
          </Row>
          <br />
          <Row>
            <Col size="md-3 sm-12">
            <InputCheckbox
              onChange={handleInputChange}
              type="radio"
              name="requestType"
              value="2"
              id="generalRequest" 
              label="General"
              className="form-check-input"
              tooltipTitle="A request will be sent to the DJ.  The DJ will review these after the Play Now requests."
              />
            </Col>
            <Col size="md-9 sm-12">
              <p className="ml-3">Minimum tip: $2</p>
            </Col>
          </Row>
          <Row>
            <Col size="md-3 sm-12">
            <InputCheckbox
              onChange={handleInputChange}
              type="radio"
              name="requestType"
              value="100"
              id="playNow" 
              label="Play Now"
              className="form-check-input"
              tooltipTitle="The DJ will see these requests immediately."
              />
            </Col>
            <Col size="md-9 sm-12">
              <p className="ml-3">Minimum tip: $100</p>
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
            <FormBtn className="btn btn-dark btn-lg mb-3" onClick={handleFormSubmit}>
              Pay Now!
            </FormBtn>
        </form>
        <div className="hidden">
          <StripeCheckout 
              stripeKey="pk_test_51IUJhcHM5nnUsQBqrf1yVa2R6C7BhNjV6uLVJVkJUmZyYDkaOv5RAAq7N7JwmZr9cmwpwBbRF0achPVIO8lybn8p002lQBMQ2L"
              token={handleToken}
              billingAddress
              shippingAddress
              amount={product.price * 100}
              name={product.name}
          />
        </div>
        <div className="text-center">
          <img src={appleBadge} alt={"appleBadge"} className="mr-3 mt-2"></img>
          <img src={googleBadge} alt={"googleBadge"} style={{width: ""}} className="mt-2"></img>
        </div>
      </Container>
    </div>
  );
}

export default RequestPage;
