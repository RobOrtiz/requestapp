import React, { useState } from "react";
import { Container, Row, Col } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
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
    console.log(123);
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    }

    // API get request to get upcoming events

    return (
        <div>
            <Header title="HOME"/>
            {/* Will need to add if statement for if there are upcoming events */}
            <Container>
                <h1>UPCOMING EVENTS</h1>
                <Row>
                    {/* For each upcoming event, add to the row*/}
                    <Col></Col>
                </Row>
            </Container>
            <Container>
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
                        <label forhtml="eventName">What's the event name?</label>
                        <Input
                        onChange={handleInputChange}
                        type="text"
                        id="eventName"
                        name="eventName"
                        placeholder="EVENT NAME"
                        />
                        <label forhtml="eventLocation">Where's the event located?</label>
                        <Input
                        onChange={handleInputChange}
                        type="text"
                        id="eventLocation"
                        name="eventLocation"
                        placeholder="LOCATION"
                        />
                        <label forhtml="eventDate">What date is the event on?</label>
                        <Input
                        onChange={handleInputChange}
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        />
                        <label forhtml="eventTimeStart">What time does the event start?</label>
                        <Input
                        onChange={handleInputChange}
                        type="text"
                        id="eventTimeStart"
                        name="eventTimeStart"
                        placeholder="6:00pm"
                        />
                        <label forhtml="eventTimeEnd">What time does the event end?</label>
                        <Input
                        onChange={handleInputChange}
                        type="text"
                        id="eventTimeEnd"
                        name="eventTimeEnd"
                        placeholder="9:00pm"
                        />
                        <FormBtn>Save Event</FormBtn>
                    </form>
                    <input
                        type="button"
                        onClick={handleFormChange}
                        value="Cancel Creating Event"
                    />
                    </div>
                )}
            </Container>
            {/* Will need to add if statement for if there are any requests */}
            <Container>
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