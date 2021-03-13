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
    const [requestList, setRequestList] = useState([]);


    // const [queueList, setQueue] = useState([]);
    // const [playNowList, setPlayNow] = useState([]);
    // const [generalList, setGeneralRequests] = useState([]);

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

    // Use the activatedDjId to access the associated events document in the Dj Document.
    // The API.getActivatedEvent call will use the activatedDjId to get the one and only activated
    // event._id in the Dj's event list. Once the res is returned we can set the requestList to the 
    // requestList (an array of songs with their statuses) in the event document.
    // Once the intial load is done it will call the loadRequests function.
    // This will be accessed on the initial load and any time there after when the requestList changes.
    // Once the intial load is done it will call the loadRequests function.
    function loadActivatedEventRequests(djId) {
        API.getActivatedEvent(djId)
            .then(res => {
                console.log("This is the requestList array for activated event: ")
                console.log(res.data.events[0].requestList)
                // Set djActivatedEvent to the Event._id for the one and only activated event in the Dj document.
                // A Dj can only have one activated event at a time.
                setRequestList(res.data.events[0].requestList);

            })
            // .then(() => { loadRequests() })
            .catch(err => console.log(err));
    }

    // Function to get move requestList songs to their appropriate arrays as we can set the states to them later.
    // This is done on the first load and everytime there is a change to the various requestList states.
    // Should there be a conditional in here if on initial load requestList is null - which it will be 
    // for all future events. For test purposes there will be seed data!
    // function loadRequests() {
    //     // Perform the Javascript logic in here to set the playNowQueue, generalRequestQueue, and queue states.
    //     // Declare consts to hold the various songStatuses.
    //     var generalRequestList = [];
    //     var playNowRequestList = [];
    //     var queueList = [];

    //     requestList.map(request => {
    //         switch (request.songStatus) {
    //             case "generalRequestQueue":
    //                 generalRequestList.push(request);
    //             case "playNowQueue":
    //                 playNowRequestList.push(request);
    //             case "queue":
    //                 queueList.push(request);
    //             default:
    //                 break;
    //         }
    //     })
    //     setGeneralRequests(generalRequestList);
    //     setPlayNow(playNowRequestList);
    //     setQueue(queueList);
    //     console.log("This is the generalRequestList array for activated event: ")
    //     console.log(generalRequestList)
    //     console.log("This is the playNowRequestList array for activated event: ")
    //     console.log(playNowRequestList)
    //     console.log("This is the queueList array for activated event: ")
    //     console.log(queueList)
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
                        {requestList
                            .filter(request => request.songStatus === "queue")
                            .map(songs => (
                                <SongReq
                                    key={songs.customerName}
                                    albumCover={songs.albumCover}
                                    title={songs.title}
                                    artist={songs.artist}
                                    tip={songs.tip}
                                    btn1="ACCEPT"
                                    btn2="DECLINE"
                               />
                            ))}
                    </Row>
                </ScrollContainer>
            </Container>
            {/* Play Now */}
            <Container classes="mt-5 mb-5">
                <Row>
                    <h1>PLAY NOW</h1>
                </Row>
                <ScrollContainer className="scroll-container">
                    <Row classesrequestList="flex-nowrap" >
                        {requestList
                            .filter(request => request.songStatus === "playNowQueue")
                            .map(songs => (
                                <SongReq
                                    key={songs.customerName}
                                    {...songs}
                                    btn1="ACCEPT"
                                    btn2="DECLINE"
                                />
                            ))}
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
                        {requestList
                            .filter(request => request.songStatus === "generalRequestQueue")
                            .map(songs => (
                                <SongReq
                                    key={songs.customerName}
                                    {...songs}
                                    btn1="ACCEPT"
                                    btn2="DECLINE"
                                />
                            ))}
                    </Row>
                </ScrollContainer>
            </Container>
            <Footer current="request" />
        </div>
    )
}

export default DJRequests;