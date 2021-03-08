import React, { useState } from "react";
import { Container, Row, Col } from "../components/Grid";
import { InputText, InputCheckbox, Input, FormBtn } from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Import uuid to create a random _id for a newly created Event. 
// I did it this way because of the way we seeded the DB. We couldn't create random ObjectIds for the Events in a way
// that would link them to the Dj events array in the Dj document. So we hard coded the _id with a string versus an ObjectId.
// I had to also change the events assoiciation type from type: Schema.Types.ObjectId to type: String for it to work this way.
// This is mostly for test purposes. 
// When working correctly without seed data the ObjectId is fine.
import uuid from "react-uuid";
import API from "../utils/API";


function DJHome() {

    const [formObject, setFormObject] = useState({
    });

    const [addEvent, setAddEvent] = useState({
        add: false,
    });

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

    function handleFormSubmit(event) {
        event.preventDefault();
        // Create random uuid for the event. Had to import uuid to do it this way, because of the way the DB is seeded.
        // See details above in require uuid.
        const randomEventId = uuid();
        API.createEvent({
            _id: randomEventId,
            genre: formObject.genre,
            eventDate: formObject.eventDate,
            startTime: formObject.eventTimeStart,
            endTime: formObject.eventTimeEnd,
            eventName: formObject.eventName,
            eventType: formObject.eventType,
            venueName: formObject.venueName,
            venueAddress: formObject.eventLocation
        })
            .then((res) => window.location.replace("/dj/dashboard"))
            .catch(err => console.log(err));
    }

    // API get request to get upcoming events

    return (
        <div>
            <Header title="HOME" />
            {/* Will need to add if statement for if there are upcoming events */}
            <Container classes="top-container">
                <h1>UPCOMING EVENTS</h1>
                <Row>
                    {/* For each upcoming event, add to the row*/}
                    <Col></Col>
                </Row>
            </Container>
            <Container classes="mt-5 mb-5">
                {!addEvent.add ? (
                    <form>
                        <FormBtn className="btn btn-dark btn-lg btn-block" onClick={handleFormChange}>
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
                            <InputText
                                onChange={handleInputChange}
                                type="text"
                                id="eventTimeStart"
                                name="eventTimeStart"
                                placeholder="6:00pm"
                                label="What time does the event start?"
                                className="form-control"
                            />
                            <InputText
                                onChange={handleInputChange}
                                type="text"
                                id="eventTimeEnd"
                                name="eventTimeEnd"
                                placeholder="9:00pm"
                                label="What time does the event end?"
                                className="form-control"
                            />
                            <FormBtn className="btn btn-dark formBtn" onClick={handleFormSubmit} >Save Event</FormBtn>
                            <FormBtn className="btn btn-dark formBtn" onClick={handleFormChange}>Cancel Creating Event</FormBtn>
                        </form>
                    </div>
                )}
            </Container>
            {/* Will need to add if statement for if there are any requests */}
            <Container classes="bottom-container">
                <h1>RECENT REQUESTS</h1>
                <Row>
                    {/* For each new requests, add to the row*/}
                    <Col></Col>
                </Row>
            </Container>

            <Footer current="home" />
        </div>
    )
}

export default DJHome;