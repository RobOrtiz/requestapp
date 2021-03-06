import React, { useState } from "react";
import { Container, Row, Col } from "../components/Grid";
import { InputText, InputCheckbox, Input, FormBtn } from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

    // API get request to get upcoming events

    return (
        <div>
            <Header title="HOME"/>
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
                            <label forhtml="eventName"></label>
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
                            id="eventLocation"
                            name="eventLocation"
                            placeholder="LOCATION"
                            label="Where's the event located?"
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
                            <FormBtn className="btn btn-dark formBtn">Save Event</FormBtn>
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