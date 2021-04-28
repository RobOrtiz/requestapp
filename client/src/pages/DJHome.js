import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "../components/Grid";
import { InputText, FormBtn, InputTime } from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import Helpers from "../utils/Helpers";
import UploadImage from "../components/UploadImage";
import DjEvent from "../components/DjEvent";
import ScrollContainer from "react-indiana-drag-scroll";

import checkIfProfileExists from "../utils/checkProfileCreated";

// Import uuid to create a random _id for a newly created Event.
// I did it this way because of the way we seeded the DB. We couldn't create random ObjectIds for the Events in a way
// that would link them to the Dj events array in the Dj document. So we hard coded the _id with a string versus an ObjectId.
// I had to also change the events assoiciation type from type: Schema.Types.ObjectId to type: String for it to work this way.
// This is mostly for test purposes.
// When working correctly without seed data the ObjectId is fine.
import uuid from "react-uuid";
import API from "../utils/API";

function DJHome() {
  // Setting our events' initial state
  const [events, setEvents] = useState([]);

  const [runOnce, setRunOnce] = useState(0);

  const [eventIsActive, setEventIsActive] = useState(false);

  const [invalidImage, setInvalidImage] = useState();

  // Load all events and store them with setEvents
  useEffect(() => {
    loadEvents();
  }, []);

  // This should only run once after page is loaded and events are set
  useEffect(() => {
    if (runOnce === 0) {
      setRunOnce(1);
    } else if (runOnce === 1) {
      for (let i = 0; i < events.length; i++) {
        if (events[i].eventStatus === "activated") {
          setEventIsActive(true);
          document.getElementById(
            `activate-${events[i]._id.slice(0, 6)}`
          ).checked = true;
          document
            .getElementById(`end-${events[i]._id.slice(0, 6)}`)
            .classList.remove("end-hidden");
          document
            .getElementById(`details-${events[i]._id.slice(0, 6)}`)
            .classList.add("details-hidden");
        }
      }
      setRunOnce(2);
    }
  }, [events]);

  // Loads all events for the Dj and sets them to events
  // Get the Dj with the user.sub id and populate the event documents to the Dj
  function loadEvents() {
    API.getDj(user.sub)
      .then((res) => {
        setEvents(res.data[0].events);
      })
      .catch((err) => console.log(err));
  }

  const [formObject, setFormObject] = useState({});

  const [addEvent, setAddEvent] = useState({
    add: false,
  });

  // Set loading and selectedFile states for the upload event image feature.
  // Loading is set to false and made true once the uploading starts (thus showing "Loading ..." text), and made
  // false again once the uploading is completed and the image URL is returned from the Cloudinary API.
  // The selectedFile state is defined when the user chooses a file via the select a file to upload input via.
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  // Set image to default 150px x 150px placeholder URL.
  const [image, setImage] = useState("https://via.placeholder.com/150");

  const { user } = useAuth0();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    checkIfProfileExists(user.sub);
    loadProfile(user.sub);
  }, []);

  // API GET request for user informatoin
  function loadProfile(id) {
    API.getDj(id)
      .then((res) => setUserId(res.data[0]._id))
      .catch((err) => console.log(err));
  }

  function handleSwitch(event) {
    var currentEventSubId = event.target.id;
    currentEventSubId = currentEventSubId.substring(
      currentEventSubId.indexOf("-") + 1
    );

    if (
      eventIsActive &&
      document.getElementById(event.target.id).checked === true
    ) {
      document.getElementById(event.target.id).checked = false;
    } else {
      let endId = `end-${event.target.id.slice(9, 16)}`;
      let detailsId = `details-${event.target.id.slice(9, 16)}`;

      if (document.getElementById(event.target.id).checked) {
        document.getElementById(endId).classList.remove("end-hidden");
        document.getElementById(detailsId).classList.add("details-hidden");
        setEventIsActive(true);

        const eventStatus = {
          eventSubIdToChange: currentEventSubId,
          changeStatusTo: "activated",
        };

        // API TO UPDATE EVENT TO SET EVENT AS ACTIVATED
        API.updateEventStatus(eventStatus)
          .then((res) => {
            console.log(res);
            loadEvents();
          })
          .catch((err) => console.log(err));
      } else {
        document.getElementById(endId).classList.add("end-hidden");
        document.getElementById(detailsId).classList.remove("details-hidden");
        setEventIsActive(false);

        const eventStatus = {
          eventSubIdToChange: currentEventSubId,
          changeStatusTo: "deactivated",
        };

        // API TO UPDATE EVENT TO SET EVENT AS DEACTIVATED
        API.updateEventStatus(eventStatus)
          .then((res) => {
            console.log(
              "This is the response after PUT to change to deactivated:"
            );
            console.log(res);
            loadEvents();
          })
          .catch((err) => console.log(err));
      }
    }
  }

  // When an end is over the Dj will "end" it and when the button is clicked the eventStatus is changed to "end"
  // Thus removing it from the event list.
  // It eventually will be added to the event history list.
  function handleEnd(event) {
    var currentEventSubId = event.target.id;
    currentEventSubId = currentEventSubId.substring(
      currentEventSubId.indexOf("-") + 1
    );

    const eventStatus = {
      eventSubIdToChange: currentEventSubId,
      changeStatusTo: "end",
    };

    // API TO UPDATE EVENT TO SET EVENT AS ACTIVATED
    API.updateEventStatus(eventStatus)
      .then((res) => {
        setEventIsActive(false);
        loadEvents();
      })
      .catch((err) => console.log(err));
  }

  function handleFormChange() {
    if (addEvent.add === false) {
      setAddEvent({
        add: true,
      });
    } else {
      setAddEvent({
        add: false,
      });
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
      }

  const [time, setTime] = useState(
    {hour:"",
    minute:"",
    ampm:"",
    // total:""
  }
  )
let totalTime = ""
totalTime = time.hour.concat(":",time.minute).concat(" ",time.ampm)
console.log(totalTime)
  // setTime({total:totalTime})

  // setFormObject({...formObject, eventTimeStart:totalTime  })
  // console.log(formObject)

  function handleInputTimeChange(event) {
    const { name, value  } = event.target;
    setTime({...time, [name]: value });
    // setTime({...time, total:totalTime})
    
    console.log(time);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    // Create random uuid for the event. Had to import uuid to do it this way, because of the way the DB is seeded.
    // See details above in require uuid.
    const randomEventId = uuid();

    // Declare eventImageUpload. If user didn't select an event image, use the default event image.
    // It will either be the image that is set when it is uploaded or the default event image.
    let eventImageUpload = "";
    if (image === "https://via.placeholder.com/150") {
      eventImageUpload =
        "https://res.cloudinary.com/noimgmt/image/upload/v1616029532/sil7xrgk6wg6wktkbrdn.png";
    } else {
      eventImageUpload = image;
    }

    API.createEvent({
      _id: randomEventId,
      subIdForEventStatusChange: randomEventId.slice(0, 6),
      genre: formObject.genre,
      eventDate: formObject.eventDate,
      startTime: formObject.eventTimeStart,
      endTime: formObject.eventTimeEnd,
      eventName: formObject.eventName,
      eventType: formObject.eventType,
      venueName: formObject.venueName,
      venueAddress: formObject.eventLocation,
      generalRequestTipMin: formObject.generalRequestTipMin,
      playNowTipMin: formObject.playNowTipMin,
      eventImage: eventImageUpload,
      djId: userId,
    })
      .then((res) => window.location.replace("/dj/dashboard"))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header title="HOME" />
      {/* Will need to add if statement for if there are upcoming events */}
      <Container classes="top-container">
        <h1>My Events</h1>
        <ScrollContainer className="scroll-container">
          <Row classes="flex-nowrap">
            {events
              .filter((request) => request.eventStatus !== "end")
              .map((djEvent) => (
                <Col classes="d-flex" key={djEvent._id}>
                  <DjEvent
                    {...djEvent}
                    handleSwitch={handleSwitch}
                    handleEnd={handleEnd}
                  />
                </Col>
              ))}
          </Row>
        </ScrollContainer>
      </Container>
      <Container classes="mt-4">
        {!addEvent.add ? (
          <form>
            <FormBtn
              className="btn btn-dark btn-lg btn-block"
              onClick={handleFormChange}
            >
              ADD NEW EVENT +
            </FormBtn>
          </form>
        ) : (
          <div>
            <h1>Create Event</h1>
            <form>
              <InputText
                onChange={handleInputChange}
                type="text"
                id="eventName"
                name="eventName"
                placeholder="EVENT NAME"
                label="What's the event name?"
                className="form-control"
              />
              <InputText
                onChange={handleInputChange}
                type="text"
                id="venueName"
                name="venueName"
                placeholder="VENUE NAME"
                label="What's the name of the venue?"
                className="form-control"
              />
              <InputText
                onChange={handleInputChange}
                type="text"
                id="eventType"
                name="eventType"
                placeholder="EVENT TYPE"
                label="What type of event is it?"
                className="form-control"
              />
              <InputText
                onChange={handleInputChange}
                type="text"
                id="eventLocation"
                name="eventLocation"
                placeholder="VENUE ADDRESS"
                label="What's the address for the event?"
                className="form-control"
              />
              <InputText
                onChange={handleInputChange}
                type="text"
                id="genre"
                name="genre"
                placeholder="GENRE"
                label="What type of music will be played?"
                className="form-control"
              />
              <InputText
                onChange={handleInputChange}
                type="date"
                id="eventDate"
                name="eventDate"
                label="What date is the event on?"
                className="form-control"
              />
              <InputTime
                onChange={handleInputTimeChange}
                type="text"
                id="eventTimeStart"
                // name="eventTimeStart"
                nameH="hour"
                nameM="minute"
                nameA="ampm"
                label="What time does the event start?"
                className="form-control"
              />
              <InputText
                onChange={handleInputTimeChange}
                type="text"
                id="eventTimeEnd"
                name="eventTimeEnd"
                time="true"
                label="What time does the event end?"
                className="form-control"
              />
              {/* <InputText
                                onChange={handleInputChange}
                                type="text"
                                id="eventTimeEnd"
                                name="eventTimeEnd"
                                placeholder="9:00pm"
                                label="What time does the event end?"
                                className="form-control"
                            /> */}
              <InputText
                onChange={handleInputChange}
                type="number"
                id="generalRequestTipMin"
                name="generalRequestTipMin"
                placeholder="example: 0, 2"
                label="Enter minimum amount for general requests"
                className="form-control"
              />
              <InputText
                onChange={handleInputChange}
                type="number"
                id="playNowTipMin"
                name="playNowTipMin"
                placeholder="example: 20, 100"
                label="Enter minimum amount for play now requests"
                className="form-control"
              />
              <UploadImage
                selectImage={(event) =>
                  Helpers.selectImage(event, setSelectedFile, setInvalidImage)
                }
                uploadImage={(event) =>
                  Helpers.uploadImage(event, selectedFile, setLoading, setImage)
                }
                invalidImage={invalidImage}
                loading={loading}
                image={image}
                altTag="event logo"
                imageDescription="event"
              />
              <FormBtn
                className="btn btn-dark formBtn"
                onClick={handleFormSubmit}
              >
                Save Event
              </FormBtn>
              <FormBtn
                className="btn btn-dark formBtn"
                onClick={handleFormChange}
              >
                Cancel Creating Event
              </FormBtn>
            </form>
          </div>
        )}
      </Container>

      {/* This is the event history container if we want to add it.  */}
      <Container classes="mt-4 bottom-container">
        <h1>Event History</h1>
        <ScrollContainer className="scroll-container">
          <Row classes="flex-nowrap">
            {events
              .filter((request) => request.eventStatus === "end")
              .map((djEvent) => (
                <Col classes="d-flex" key={djEvent._id}>
                  <DjEvent
                    {...djEvent}
                    handleSwitch={handleSwitch}
                    handleEnd={handleEnd}
                  />
                </Col>
              ))}
          </Row>
        </ScrollContainer>
      </Container>

      <Footer current="home" />
    </div>
  );
}

export default DJHome;
