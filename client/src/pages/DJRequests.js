import React, { useEffect, useState } from "react";
import { Container, Row } from "../components/Grid";
// import { Input, FormBtn } from "../components/Form";
import SongReq from "../components/SongReq";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated";
import ScrollContainer from 'react-indiana-drag-scroll';
import API from "../utils/API";

function DJRequests() {
    const { user } = useAuth0();
    // const [queue, setQueue] = useState([]);
    // const [playNow, setPlayNow] = useState([]);
    // const [generalRequests, setGeneralRequests] = useState([]);
    const [ userId, setUserId ] = useState("");

    useEffect(() => {
        checkIfProfileExists(user.sub);
        loadProfile(user.sub);
        loadRequest();
    }, [])
      
      // API get request for user informatoin
    function loadProfile(id) {
        API.getDj(id)
        .then(res => setUserId(res.data[0]._id))
        .catch(err => console.log(err))
    }

    function loadRequest() {
        console.log("hello"+userId);

        API.getRequests(userId)
            .then(res => {
                // setEvents(res.data[0].events)
                console.log(res)
            }
            )
            .catch(err => console.log(err));
    };
    // API put requests (for handling buttons) to update the lists
    // Queue - if played/remove, update database and remove;
    // PlayNow/GenReq - if accept, update database and move to queue; if declined, update database and remove

    // Possible api for getting song information from spotify

    return (
        <div>
            <Header title="REQUESTS" />
            {/* Queue */}
            <Container classes="top-container">
                <Row>
                    <h1>QUEUE</h1>
                </Row>
                <ScrollContainer className="scroll-container">
                    <Row classes="flex-nowrap">
                        {/* {events.map(djEvent => (
                            <Col key={djEvent.eventDate}>
                                <DjEvent {...djEvent} />
                            </Col>
                        ))} */}
                        <SongReq
                            key="1"
                            id="1"
                            img="https://img.discogs.com/NAj18_fF1LYnyQ0NDCRPdpamdX8=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1291724-1509461282-7177.jpeg.jpg"
                            title="Laffy Taffy"
                            artist="D4L"
                            tip="$100"
                            btn1="PLAYED"
                            btn2="REMOVE"
                        />
                    </Row>
                </ScrollContainer>
            </Container>
            {/* Play Now */}
            <Container classes="mt-5 mb-5">
                <Row>
                    <h1>PLAY NOW</h1>
                </Row>
                <ScrollContainer className="scroll-container">
                    <Row classes="flex-nowrap">
                        {/* {events.map(djEvent => (
                            <Col key={djEvent.eventDate}>
                                <DjEvent {...djEvent} />
                            </Col>
                        ))} */}
                        <SongReq
                            key="1"
                            id="1"
                            img="https://upload.wikimedia.org/wikipedia/en/thumb/6/64/SystemofaDownToxicityalbumcover.jpg/220px-SystemofaDownToxicityalbumcover.jpg"
                            title="Chop Suey"
                            artist="System of a Down"
                            tip="$80"
                            btn1="ACCEPT"
                            btn2="DECLINE"
                        />
                    </Row>
                </ScrollContainer>
            </Container>
            {/* General Requests */}
            <Container classes="bottom-container">
                <Row>
                    <h1>GENERAL REQUESTS</h1>
                </Row>
                <ScrollContainer className="scroll-container">
                    <Row classes="flex-nowrap">
                        {/* {events.map(djEvent => (
                            <Col key={djEvent.eventDate}>
                                <DjEvent {...djEvent} />
                            </Col>
                        ))} */}
                        <SongReq
                            key="1"
                            id="1"
                            img="https://m.media-amazon.com/images/I/91UEL9iy26L._SS500_.jpg"
                            title="Peachs & Cream"
                            tip="$50"
                            btn1="ACCEPT"
                            btn2="DECLINE"
                        />
                    </Row>
                </ScrollContainer>
            </Container>
            <Footer current="request" />
        </div>
    )
}

export default DJRequests;