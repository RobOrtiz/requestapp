import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
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

    // Set state djActivatedDjId to the logged in Dj's ObjectId
    const [activatedDjId, setActivatedDjId] = useState("");

    // Set state activatedEventId to the activated event._id
    // This will be sent to the PUT API call to update requestList for song that was moved.
    const [activatedEventId, setActivatedEventId] = useState([]);

    // Set state of requestList to the requestList array of song request objects attached to the activated event.
    const [requestList, setRequestList] = useState([]);

    // Set state setSongId to hold song request ObjectId that needs to be updated. 
    // This will be sent to the PUT API call to update requestList.
    const [songId, setSongId] = useState("");



    // useEffect to check if logged in Dj via AuthO already has an Dj profile for Noi.
    // If they don't redirect them (via checkIfProfileExists) to the setup profile page.
    // Otherwise find their ObjectId for their Dj account and stay on the Dj dashboard page.
    useEffect(() => {
        checkIfProfileExists(user.sub);
        // If the Dj has a profile already (they exist) this loads dj profile and active event for the queue
        loadProfile(user.sub);
    }, [user.sub])

    // Function firstUpdate1 is to prevent the loadActivatedEventRequests() function from running twice on initial load.
    // It is designed to run after initial load whenever the songId changes - based on the buttons the used clicks on song req component.
    const firstUpdate1 = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate1.current) {
            firstUpdate1.current = false;
        } else {
            loadActivatedEventRequests(activatedDjId)
        }
    }, [songId])

    // Get the Dj profile
    // Send their djId to loadActivatedEvent to get the activated event._id
    // Technically this only has to be done on load, as the event._id is attached to the Dj already/
    // function loadProfile(id) {
    const loadProfile = id => {
        API.getDj(id)
            .then(res => {
                console.log("I'm in the loadProfile function. This is the Dj's ObjectId via res.data[0]._id:");
                console.log(res.data[0]._id);
                setActivatedDjId(res.data[0]._id)
                console.log("******************************************************");
                console.log(activatedDjId);
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

                // Set setActivatedEventId to the Event._id for the one and only activated event in the Dj document.
                setActivatedEventId(res.data.events[0]._id);
                // A Dj can only have one activated event at a time.
                setRequestList(res.data.events[0].requestList);

            })
            // .then(() => { loadRequests() })
            .catch(err => console.log(err));
    }



    // This function is executed when the user clicks on the ACCEPT button on the song request on the request page.
    // Thus moving it to the queue.
    async function handleQueueMovement(event) {

        event.preventDefault();

          // setSongId to the ObjectId of the requested song that was clicked on - to move it to the queue.
            // By setting it here, it will refresh the request page based on the state changing - using the
            // firstUpdate1 function above with the useRef and useLayoutEffect hooks.
            setSongId(event.target.id);

        // Declare requestButtonType to the textContent of the ACCEPT button on the song req component. 
        const requestButtonType = event.target.textContent;

        // Determine which button on the song req component was clicked so we can update the songStatus accordingly.
        // This switch select the new songStatus based on the button clicked. 
        switch (requestButtonType) {
            case "ACCEPT":
                var requestSongStatusChangeTo = "queue";
                break;
            case "DECLINE":
                var requestSongStatusChangeTo = "declined";
                break;
            case "PLAYED":
                var requestSongStatusChangeTo = "played";
                break;
            case "REMOVED":
                var requestSongStatusChangeTo = "removed";
                break;
            default:
                console.log("It didn't work. Fix it!")
                break;
        }

        // Delcare the songData to pass to the PUT API route. 
        // songId is the ObjectId of the requested song that was clicked - to move to the queue.
        // newSongStatus lets us know what to change the new songStatus to based on the requestButtonType switch type. 
        const songData = {
            "songId": event.target.id,
            "newSongStatus": requestSongStatusChangeTo
        };

        console.log("*****obj", songData);

        console.log("*****", songId);

        // PUT API route to update songStatus based on the songData
       await API.updateRequest(songData)
            .then(res => {
                console.log("catfood:",res);
            })
            .catch(err => console.log(err))
            
  
    }

    function handleDeclineRequest(event) {
        event.preventDefault();
        alert("Remove me from the queue!");
    }

    return (
        <div>
            <Header title="REQUESTS" />
            {/* Queue */}
            <Container classes="top-container">
                <Row>
                    <h1>Queue</h1>
                </Row>
                <ScrollContainer className="scroll-container">
                    <Row classes="flex-nowrap">
                        {requestList
                            .filter(request => request.songStatus === "queue")
                            .map(songs => (
                                <SongReq
                                    key={songs._id}
                                    {...songs}
                                    btn1="PLAYED"
                                    button01onClick={handleQueueMovement}
                                    btn2="REMOVED"
                                    button02onClick={handleQueueMovement}
                                />
                            ))}
                    </Row>
                </ScrollContainer>
            </Container>
            {/* Play Now */}
            <Container classes="mt-5 mb-5">
                <Row>
                    <h1>Play Now</h1>
                </Row>
                <ScrollContainer className="scroll-container">
                    <Row classes="flex-nowrap" >
                        {requestList
                            .filter(request => request.songStatus === "playNowQueue")
                            .map(songs => (
                                <SongReq
                                    key={songs._id}
                                    {...songs}
                                    btn1="ACCEPT"
                                    button01onClick={handleQueueMovement}
                                    btn2="DECLINE"
                                    button02onClick={handleQueueMovement}
                                />
                            ))}
                    </Row>
                </ScrollContainer>
            </Container>
            {/* General Requests */}
            <Container classes="bottom-container">
                <Row>
                    <h1>General Requests</h1>
                </Row>
                <ScrollContainer className="scroll-container">
                    <Row classes="flex-nowrap">
                        {requestList
                            .filter(request => request.songStatus === "generalRequestQueue")
                            .map(songs => (
                                <SongReq
                                    key={songs._id}
                                    {...songs}
                                    btn1="ACCEPT"
                                    button01onClick={handleQueueMovement}
                                    btn2="DECLINE"
                                    button02onClick={handleQueueMovement}
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
