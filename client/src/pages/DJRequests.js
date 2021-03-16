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

    // Set state of djActivatedEvent --- this is the Dj's ObjectId
    const [activatedDjId, setActivatedDjId] = useState("Hello");

    // Set state of requestList --- this holds the requestList for the event._id.
    const [requestList, setRequestList] = useState([]);

    // Set state to hold song request that needs to be updated. 
    // This will be sent to the PUT API call to update requestList.
    const [requestUpdate, setRequestUpdate] = useState([]);

    // Set state to activated event._id
    // This will be sent to the PUT API call to update requestList for song that was moved.
    const [activatedEventId, setActivatedEventId] = useState([]);

    // useEffect to check if logged in Dj via AuthO already has an Dj profile for Noi.
    // If they don't redirect them (via checkIfProfileExists) to the setup profile page.
    // Otherwise find their ObjectId for their Dj account and stay on the Dj dashboard page.
    useEffect(() => {
        checkIfProfileExists(user.sub);
        // If the Dj has a profile already (they exist) this loads dj profile and active event for the queue
        loadProfile(user.sub)
    }, [user.sub])

    // This useEffect is just to show console.logs of states as states change throughout the process. 
    // It calls the showStatesWithConsoleLogs function below on initial page load and everytime a state changes.
    useEffect(() => {
        showStatesWithConsoleLogs()
    }, [])

    function showStatesWithConsoleLogs() {
        console.log("I'm in the showStatesWithConsoleLogs function!")
        console.log("This will only show on initial load of Request page and when states change on the Request page.")
        console.log("This is the setActivatedDjId: ")
        console.log(activatedDjId)
        console.log("Still inside the showStatesWithConsoleLogs. This is the setActivatedEventId: ")
        console.log(activatedEventId)
        console.log("Still inside the showStatesWithConsoleLogs. This is the setRequestList: ")
        console.log(requestList)
        console.log("I'm leaving the showStatesWithConsoleLogs. See you on the next state change!")
    }

    // Get the Dj profile
    // Send their djId to loadActivatedEvent to get the activated event._id
    // Technically this only has to be done on load, as the event._id is attached to the Dj already/
    function loadProfile(id) {
        API.getDj(id)
            .then(res => {
                console.log("I'm in the loadProfile function. This is the Dj's ObjectId via res.data[0]._id:");
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
                console.log("I'm inside the loadActivatedEventRequests function. This is the requestList array for activated event derived from res.data.events[0].requestList : ")
                console.log(res.data.events[0].requestList)
                console.log("I'm still inside the loadActivatedEventRequests function. This is the activated event._id for the activated event derived from res.data.events[0]._id: ")
                console.log(res.data.events[0]._id)
                console.log("I'm still inside the loadActivatedEventRequests function. This is the Dj Object_id STATE. Why is it the initial state and not the Dj Object._id???")
                console.log(activatedDjId)

                // Set setActivatedEventId to the Event._id for the one and only activated event in the Dj document.
                setActivatedEventId(res.data.events[0]._id);
                // A Dj can only have one activated event at a time.
                setRequestList(res.data.events[0].requestList);

            })
            // .then(() => { loadRequests() })
            .catch(err => console.log(err));
    }

    // This function is executed when the user click on the accept button on the song request on the request page.
    function handleSaveToQueue(event) {

        console.log("I'm in the handleSaveToQueue function!")
        console.log("This is the setActivatedEventId: ")
        console.log(activatedEventId)
        console.log("I'm still in the handleSaveToQueue function! For shits and giggles! This is the setActivatedDjId: ")
        console.log(activatedDjId)

        event.preventDefault();
        alert("Add me to the Queue!");
        console.log("This is the event")
        console.log(event.target)
        // const songId = "604fc1504c10105a54ae2a78";

        API.updateRequest(activatedEventId)
            .then(res => {
                "WTF@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
                console.log(res);
                loadActivatedEventRequests(activatedDjId);
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
                                    // button01onClick={handleSaveToQueue}
                                    btn2="REMOVE"
                                    // button02onClick={handleDeclineRequest}
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
                                    button01onClick={handleSaveToQueue}
                                    btn2="DECLINE"
                                    button02onClick={handleDeclineRequest}
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
                                    button01onClick={handleSaveToQueue}
                                    btn2="DECLINE"
                                    button02onClick={handleDeclineRequest}
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
