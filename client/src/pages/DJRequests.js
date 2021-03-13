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

    // Set state of djActivatedEvent
    const [activatedDjId, setActivatedDjId] = useState("");

    // Set state of requestList to one song to show on load. Until I get it to work!
    const [requestList, setRequestList] = useState([
        {
            "albumCover": "https://res.cloudinary.com/noimgmt/image/upload/v1615592288/noireqapp/eklx5ftujcwbrddrovyi.jpg",
            "title": "Ants Marching",
            "artist": "DMB",
            "tip": "100",
            "requestType": "playNowRequest",
            "songStatus": "playNowQueue",
            "customerName": "Charles Robinson"
        },]);


    // const [queue, setQueue] = useState([]);
    // const [playNow, setPlayNow] = useState([]);
    // const [generalRequests, setGeneralRequests] = useState([]);

    // useEffect to check if logged in Dj via AuthO already has an Dj profile for Noi.
    // If they don't redirect them (via checkIfProfileExists) to the setup profile page.
    // Otherwise find their ObjectId for their Dj account and stay on the Dj dashboard page.
    useEffect(() => {
        checkIfProfileExists(user.sub);
        // If the Dj has a profile already (they exist) this loads dj profile and active event for the queue
        loadProfile(user.sub)
    }, [user.sub])

    // This useEffect updates the updated requestList as changes are made (POST via customer or PUT via Dj).
    // Where is the fingers crosses emoji for Visual Studio Code. :)
    // useEffect(() => {
    //     loadRequests()
    //     // In the [] below enter in here the states that will effect this when changed...// 
    // }, [])

    // Get the Dj profile
    // Send their djId to loadActivatedEvent to get the activated event._id
    // Technically this only has to be done on load, as the event._id is attached to the Dj already/
    function loadProfile(id) {
        API.getDj(id)
            .then(res => {
                console.log("This is the Dj's ObjectId: ");
                console.log(res.data[0]._id);
                setActivatedDjId(res.data[0]._id)
                loadActivatedEventRequests(res.data[0]._id)
            })
            .catch(err => console.log(err))
    }

    // Return active event from that Dj as well as the requestList for the Dj
    function loadActivatedEventRequests(djId) {
        API.getActivatedEvent(djId)
            .then(res => {
                console.log("This is the requestList array for activated event: ")
                console.log(res.data.events[0].requestList)
                // Set djActivatedEvent to the Event._id for the one and only activated event in the Dj document.
                // A Dj can only have one activated event at a time.
                setRequestList(res.data.events[0].requestList);
                
            })
            .catch(err => console.log(err));
    }

    // Function to get requestList whether at the first load or changes throught the event. 
    // Should there be a conditional in here if on initial load requestList is null - which it will be 
    // for all future events. For test purposes there will be seed data!
    // function loadRequests() {
    //     API.getRequestList(activatedEvent)
    //         .then(res => {
    //             console.log("This is the requestList array for activated event: ")
    //             console.log(res.data.events[0].requestList)
    //             // Set requestList to the activated events requestList.
    //             // Initially (at start of an activated event) it will be null - however for development purposes there is data in the DB to populate the request page.
    //             setActivatedEvent(res.data.events[0]);
    //         })
    //         .catch(err => console.log(err));
    // }

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