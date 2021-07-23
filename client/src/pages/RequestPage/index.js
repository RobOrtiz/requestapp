import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Container, Row, Col } from "../../components/Grid";
import { InputText, InputTextOneLine, FormBtn, InputCheckbox } from "../../components/Form";
import lastFMAPI from "../../utils/lastFMAPI";
import Header from "../../components/Header";
import googleBadge from "../../images/googleplaybadge.png";
import appleBadge from "../../images/badge-download-on-the-app-store.svg";
import StripeAPI from "../../utils/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, Elements, CardElement} from '@stripe/react-stripe-js';
// import EventPic from '../../images/st pattys day.jpg'
import "./styles.css";
import RequestModalWarning from "../../components/RequestModalWarning";
import API from "../../utils/API";
import stripe from "../../utils/stripe";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_PK);

function RequestPage() {
  // For form
  const [formObject, setFormObject] = useState({
    fullName: "",
    title: "",
    artist: "",
    tip: 0,
    email: "",
  });

  // For radio buttons
  const [general, setGeneral] = useState(false);
  const [playNow, setPlayNow] = useState(false);

  // For djId
  const [djId, setDjId] = useState("");

  // For AlbumCover
  const [albumCover, setAlbumCover] = useState("");

  // For Stripe
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "Song Request",
    albumCover: "",
    tip: 0,
    fullName: "",
    title: "",
    artist: "",
    generalRequest: false,
    playNow: false,
    songStatus: "",
    requestedTime: new Date(),
    _id: "",
  });
  const [tip, setTip] = useState(false);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [stripeCard, setStripeCard] = useState({});

  // Setting our event's initial state
  const [event, setEvent] = useState({});
  const [djName, setDjName] = useState("");

  // Load event
  useEffect(() => {
    loadEvent();
  }, []);

  function loadEvent() {
    // API.getActivatedEvent("60513fbaae45c04174566ec2")
    // Get the dj id and search db for their profile and active event info

    API.getActivatedEvent(getDJId())
      .then((res) => {
        // If page can't find dj's active event, redirect
        if (!res.data.events[0]) {
          noEventWarning();
        } else {
        setEvent(res.data.events[0]);
        setDjName(res.data.djName);
        }
      })
      .catch((err) => console.log(err));
  }
  function noEventWarning() {
    alert("Whoops, looks like this dj doesn't have an active event. Check to make sure you're on the right dj's event, or notify your dj to activate the event.")
    window.location.replace("/request")
  }

  // When page is opened for first time, will do nothing.  After, when general/playNow are changed, Stripe Checkout will be triggered (this is only changed when the user submits the form).
  const firstUpdate1 = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate1.current) {
      getDJId();
      firstUpdate1.current = false;
    } else {
      switch (general) {
        case true:
          var requestSongStatus = "generalRequestQueue";
          break;
        case false:
          requestSongStatus = "playNowQueue";
          break;
        default:
          console.log("It didn't work. Fix it!");
          break;
      }

      setProduct({
        name: formObject.title + ", " + formObject.artist,
        price: formObject.tip * 100,
        albumCover: albumCover,
        tip: parseInt(formObject.tip),
        fullName: formObject.fullName,
        title: formObject.title,
        artist: formObject.artist,
        generalRequest: general,
        playNow: playNow,
        songStatus: requestSongStatus,
        requestedTime: new Date(),
        _id: djId,
      });
    }
  }, [general, playNow]);

  const firstUpdate2 = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
    } else if (product.tip === 0) {
        API.createRequest({
          albumCover: product.albumCover,
          tip: product.tip,
          fullName: product.fullName,
          title: product.title,
          artist: product.artist,
          generalRequest: product.generalRequest,
          playNow: product.playNow,
          songStatus: product.songStatus,
          requestedTime: new Date(),
          _id: product._id
        })
        .then(res => window.location.replace(`/request/success/${product._id}`))
        .catch(err => console.log(err))
    } else {
      handleStripe();
    }
  }, [product]);

  // Parse URL for djId
  function getDJId() {
    const url = window.location.href;
    var djId = url.substring(url.lastIndexOf("/") + 1);
    setDjId(djId);
    return djId;
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    
    if (parseInt(document.getElementById('tip').value) > 0){
      setTip(true);
    } else if (parseInt(document.getElementById('tip').value) === 0) {
      setTip(false);
    }
  }

  // When user clicks on "Pay Now"
  function handleFormSubmit(e) {
    e.preventDefault();

    // This checks if the request form has blank values
    // for text fields and buttons
    checkIfFormUnfilled(formObject, "radio");

    function checkIfFormUnfilled(obj, buttonType) {
      let formFilledOutRight = true;
      // Check buttons
      var inputs = document.getElementsByTagName("input");
      // buttonsBoolean is for selection validation
      // buttonSelected is for tip value validation
      let buttonsBoolean = [];
      let buttonSelected = [];
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type.toLowerCase() === buttonType) {
          buttonsBoolean.push(inputs[i].checked);
          if (inputs[i].checked === true) {
            buttonSelected.push(inputs[i]);
          }
        }
      }

      // if none are clicked, show modal
      if (!buttonsBoolean.includes(true)) {
        document.getElementById("warning-radio-button-button").click();
        formFilledOutRight = false;
      }
      
      // checks tip value against minimum of selected button
      if (buttonSelected[0].id === "generalRequest") {
        if (formObject.tip < event.generalRequestTipMin) {
          document.getElementById("warning-minimum-tip-button").click();
          formFilledOutRight = false;
        }
      } else {
        console.log("here", event.generalRequestTipMin)
        if (formObject.tip < event.playNowTipMin) {
          document.getElementById("warning-minimum-tip-button").click();
          formFilledOutRight = false;
        }
      }
      
      // Check form fields
      for (var key in obj) {
        // if one is blank, show modal
        if (obj[key] === null || obj[key] === "") {
          document.getElementById("warning-form-button").click();
          formFilledOutRight = false;
        }
      }

      // To album cover function
      if (formFilledOutRight) {
        //Disable Submit Button
        let targetButton = document.querySelector(".no-tip-button");
        targetButton.innerHTML = "Loading..."
        targetButton.disabled = true;
        targetButton.classList.remove("gold-animated-btn");

        getAlbumCover(formObject.title, formObject.artist);
      }
    }
  }

  // Saves album cover, then changes general or playNow state
  function getAlbumCover(title, artist) {
    lastFMAPI.findAlbumCover(title, artist).then((res) => {
      if (document.getElementById("generalRequest").checked === true) {
        if (res.data.message !== "Track not found" && res.data.track.album) {
          let image = res.data.track.album.image[2]["#text"];
          if (image === "") { image =  "https://res.cloudinary.com/noimgmt/image/upload/v1615592263/noireqapp/njitt7mzvpuidhjila9m.jpg"}
          setAlbumCover(image);
        } else if (albumCover === "") {
          setAlbumCover(
            "https://res.cloudinary.com/noimgmt/image/upload/v1615592263/noireqapp/njitt7mzvpuidhjila9m.jpg"
          );
        }
        setGeneral(true);
      } else {
        if (res.data.message !== "Track not found" && res.data.track.album) {
          let image = res.data.track.album.image[2]["#text"];
          if (image === "") { image =  "https://res.cloudinary.com/noimgmt/image/upload/v1615592263/noireqapp/njitt7mzvpuidhjila9m.jpg"}
          setAlbumCover(image);
        } else if (albumCover === "") {
          setAlbumCover(
            "https://res.cloudinary.com/noimgmt/image/upload/v1615592288/noireqapp/eklx5ftujcwbrddrovyi.jpg"
          );
        }
        setPlayNow(true);
      }
    });
  }


  function handleFormSubmit2(card, email) {
    // This checks if the request form has blank values
    // for text fields and buttons
    checkIfFormUnfilled(formObject, "radio");

    function checkIfFormUnfilled(obj, buttonType) {
      let formFilledOutRight = true;
      // Check buttons
      var inputs = document.getElementsByTagName("input");
      // buttonsBoolean is for selection validation
      // buttonSelected is for tip value validation
      let buttonsBoolean = [];
      let buttonSelected = [];
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type.toLowerCase() === buttonType) {
          buttonsBoolean.push(inputs[i].checked);
          if (inputs[i].checked === true) {
            buttonSelected.push(inputs[i]);
          }
        }
      }

      // if none are clicked, show modal
      if (!buttonsBoolean.includes(true)) {
        document.getElementById("warning-radio-button-button").click();
        formFilledOutRight = false;
      }
      
      // checks tip value against minimum of selected button
      if (buttonSelected[0].id === "generalRequest") {
        if (formObject.tip < event.generalRequestTipMin) {
          document.getElementById("warning-minimum-tip-button").click();
          formFilledOutRight = false;
        }
      } else {
        if (formObject.tip < event.playNowTipMin) {
          document.getElementById("warning-minimum-tip-button").click();
          formFilledOutRight = false;
        }
      }
      
      // Check form fields
      for (var key in obj) {
        // if one is blank, show modal
        if (obj[key] === null || obj[key] === "") {
          document.getElementById("warning-form-button").click();
          formFilledOutRight = false;
        }
      }

      // To album cover function
      if (formFilledOutRight) {
        setStripeCard(card)
        getAlbumCover(formObject.title, formObject.artist);
      }
    }
  }

  const handleStripe = async () => {
    const stripe = await stripePromise;

    // This creates the payment intent
    const response = await StripeAPI.checkout(product);

    // This adds the card payment to the payment intent
    const result = await stripe.confirmCardPayment(response.data.client_secret, {
      payment_method: {
        card: stripeCard,
        billing_details: {
          name: product.fullName,
          email: formObject.email
        }
      }
    });


    if(result.error) {
      alert("There was an issue processing your request.  No charge was made.  The page will now reload.  Please try again.");
      window.location.reload();
    } else {
      if (result.paymentIntent.status === 'requires_capture') {
        console.log("Payment intent created")
  
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        
        API.createRequest({
          albumCover: product.albumCover,
          tip: product.tip,
          fullName: product.fullName,
          title: product.title,
          artist: product.artist,
          generalRequest: product.generalRequest,
          playNow: product.playNow,
          songStatus: product.songStatus,
          requestedTime: new Date(),
          _id: product._id
        })
        .then(res => {
          API.createCharge({
            djId: product._id,
            songId: res.data.requestList[res.data.requestList.length -1]._id,
            paymentIntentId: result.paymentIntent.id,
            paymentStatus: "authorized",
          })
          .then(res => window.location.replace(`/request/success/${product._id}`))
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))  
      } else {
        alert("There was an issue processing your request.  Please try again")
      }
    }



    // OLD

    // const result = await stripe.redirectToCheckout({
    //   sessionId: response.data.id,
    // });

    // if (result.error) {
    //   console.err(result.error.message);
    // }
  };

  // Date config for event details
  let month, dateDay, year, dateEnd;
  if (event.eventDate) {
    const monthNumber = event.eventDate.slice(5,7)
    month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][monthNumber - 1];

    if (event.eventDate.slice(8,9) === "0") {
        dateDay = parseInt(event.eventDate.slice(9,10))
    } else {
        dateDay = parseInt(event.eventDate.slice(8,10))
    }

    year = event.eventDate.slice(0,4);

    if (dateDay === 1 || dateDay === 21 || dateDay === 31) {
        dateEnd = "st";
    } else if (dateDay === 2 || dateDay === 22) {
        dateEnd = "nd"
    } else if (dateDay === 3 || dateDay === 23) {
        dateEnd = "rd"
    } else {
        dateEnd = "th"
    }
  }
  
  return (
    <div className="request-page">
      <Header title="welcome customer" />
      {event.eventName && (
      <Container classes="top-container">
        <Row>
          <Col size="4">
            <img
                src={event.eventImage}
                alt={"Event"}
                className="eventPic"
              />
          </Col>
          <Col size="8" classes="d-flex flex-column justify-content-center">
            <h1 className="request-title">SONG REQUEST to {djName}
              {/* event modal button */}
              <i 
              style={{fontSize: "1rem"}}
              className="fas fa-info-circle ml-2"
              type="button"
              data-toggle="modal"
              data-target="#modal-event-info"
              ></i>
            </h1> 
            <p className="h6 ml-3 mb-3">
              Not your DJ? Click <a href="/request" style={{color: "lightblue"}}>here</a>!
            </p>
          </Col>
        </Row>
        {/* event modal top */}
        <div
          className="modal fade"
          id="modal-event-info"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{event.eventName}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-text">
                  {`${month} ${dateDay}${dateEnd}, ${year}`}{" "}
                  &#183; {event.startTime} - {event.endTime}
                </p>
                <p className="modal-text">
                  {event.eventType} &#183; &#183; {event.genre}
                </p>
                <p className="modal-text">
                  Venue: <br />
                  {event.venueName} <br />
                  {event.venueAddress}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* event modal bottom */}
        {/* page info */}
        <form>
          <Row>
            <Col>
              <InputTextOneLine
                onChange={handleInputChange}
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your name here"
                label="Name:"
                className="form-control"
              />
              <InputTextOneLine
                onChange={handleInputChange}
                type="text"
                id="email"
                name="email"
                placeholder="Your email here"
                label="Email:"
                className="form-control"
              />
              <InputTextOneLine
                onChange={handleInputChange}
                type="text"
                id="title"
                name="title"
                placeholder="Song title"
                label="Title:"
                className="form-control"
              />
              <InputTextOneLine
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
          <Row>
            <Col size="12">
            <p id="request-type-label">Request Type<i data-toggle="modal" data-target={`#modal-request-type`} className="fas fa-info-circle ml-2"></i></p>
            <div className="modal fade" id={`modal-request-type`} tabIndex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <p className="request-type-modal-content">
                      <u>General Request</u> * : A request will be sent to the DJ.  The DJ will review these after the Play Now requests. This request may be played at any point throughout the event.
                      <br/><br/>
                      <u>Play Now Request</u> * : The DJ will see these requests immediately, and may play this within 2-3 songs.
                      <br/><br/>
                      <span className="h6">* Please note that your song is not guaranteed to be played.  If your song is not played, the DJ will refund your charge.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex flex-row">
                <InputCheckbox
                  onChange={handleInputChange}
                  type="radio"
                  name="requestType"
                  value="2"
                  id="generalRequest"
                  label="General (Min. tip):"
                  className="form-check-input"
                />
                <p className="ml-2" style={{color: "gold"}}>${event.generalRequestTipMin}</p>
              </div>
              </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex flex-row">
                <InputCheckbox
                  onChange={handleInputChange}
                  type="radio"
                  name="requestType"
                  value="100"
                  id="playNow"
                  label="Play Now (Min. tip):"
                  className="form-check-input"
                />
                <p className="ml-2" style={{color: "gold"}}>${event.playNowTipMin}</p>
              </div>
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
          {tip ? (
            <Elements stripe={stripePromise}>
              <Checkout formObject={formObject} handleFormSubmit2={handleFormSubmit2}/>
            </Elements>
          ) : (
            <>
              <Row>
                <p className="h6 ml-3 text-center">By clicking the below Send button, I agree to all Terms and Conditions of Noi Live, Inc.</p>
              </Row>
              <FormBtn
              className="btn btn-dark btn-lg mt-2 mb-3 gold-animated-btn no-tip-button"
              onClick={handleFormSubmit}
              >
                Send Request!
              </FormBtn>
            </>
          )}

        </form>
        {/* <div className="hidden"></div>
        <div className="text-center">
          <img src={appleBadge} alt={"appleBadge"} className="mr-3 mt-2"></img>
          <img
            src={googleBadge}
            alt={"googleBadge"}
            style={{ width: "" }}
            className="mt-2"
          ></img>
        </div> */}
      </Container>
      )}
      <button
        id={"warning-form-button"}
        style={{ display: "none" }}
        type="button"
        className="btn btn-dark mt-3"
        data-toggle="modal"
        data-target={`#modal-warning-form`}
      >
        Details
      </button>
      <button
        id={"warning-radio-button-button"}
        style={{ display: "none" }}
        type="button"
        className="btn btn-dark mt-3"
        data-toggle="modal"
        data-target={`#modal-warning-radio-button`}
      >
        Details
      </button>
      <button
        id={"warning-minimum-tip-button"}
        style={{ display: "none" }}
        type="button"
        className="btn btn-dark mt-3"
        data-toggle="modal"
        data-target={`#modal-warning-tip-minimum`}
      >
        Details
      </button>
      <RequestModalWarning
        id={"modal-warning-form"}
        name={"Form error"}
        message={"Please fill out the entire form."}
      />
      <RequestModalWarning
        id={"modal-warning-radio-button"}
        name={"Request type error"}
        message={"Please select your request type: 'General' or 'Play Now'"}
      />
      <RequestModalWarning
        id={"modal-warning-tip-minimum"}
        name={"Tip minimum"}
        message={"Tip must be minimum value specified"}
      />
    </div>
  );
}

function Checkout(props) {
  //const stripe = await stripePromise;
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add loading class
    let targetButton = document.querySelector(".tip-button");
    targetButton.innerHTML = "Loading..."
    targetButton.disabled = true;
    targetButton.classList.remove("gold-animated-btn");

    const card = await elements.getElement(CardElement)

    props.handleFormSubmit2(card);
    // const response = await StripeAPI.checkout(props.formObject);
    // console.log(response);
    // console.log(response.data.client_secret)

    // // const result = await stripe.confirmCardPayment(response.data.client_secret, {
    // //   payment_method: {
    // //     card: card,
    // //     billing_details: {
          
    // //     }
    // //   }
    // // })
  }

  // Stripe
  const CARD_ELEMENT_OPTIONS = {
    classes: {
      base: "StripeElement form-control",
    },
    style: {
      base: {
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#000",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  
  return (
    <div>
      <h4>Enter Card Information</h4>
      <h6 className="text-white">*Your card will only be authorized at this time.  It will only be charged once the song is played.</h6>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <Row>
          <p className="h6 mt-2 ml-3 text-center">By clicking the below Send button, I agree to all Terms and Conditions of Noi Live, Inc.</p>
        </Row>
      <FormBtn
      className="btn btn-dark btn-lg mt-2 mb-3 gold-animated-btn tip-button"
      onClick={handleSubmit}
      >
        Charge and Send!
      </FormBtn>

    </div>
  )
}

export default RequestPage;
