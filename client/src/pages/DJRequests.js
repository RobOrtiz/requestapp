import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Container, Row } from "../components/Grid";
// import { Input, FormBtn } from "../components/Form";
import SongReq from "../components/SongReq";
import QueueModal from "../components/QueueModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated";
import ScrollContainer from 'react-indiana-drag-scroll';
import API from "../utils/API";


function DJRequests() {
    const { user } = useAuth0();

    // Global variable to send newly acquired activated eventId (via the getActivatedEvent API) to the 
    // getSongStatusCount API function (it follows the getActivatedEvent API in the loadActivatedEventRequests function).
    // Have to do it this way because of the way seting a state works in the loadActivatedEventRequests function.
    // We set the activatedEventId in the loadActivatedEventRequests function via the getActivatedEvent API but it isn't 
    // immediately available for the getSongStatusCount API function.
    // Working around until a better way is figured out.
    var eventIdForSongCount;

    // Set state djActivatedDjId to the logged in Dj's ObjectId
    const [activatedDjId, setActivatedDjId] = useState("");

    // Set state activatedEventId to the activated event._id
    // This will be sent to the PUT API call to update requestList for song that was moved.
    //const [activatedEventId, setActivatedEventId] = useState([]);

    // Set state of requestList to the requestList array of song request objects attached to the activated event.
    const [requestList, setRequestList] = useState([]);
    const [queueList, setQueueList] = useState([]);

    // Set state setSongId to hold song request ObjectId that needs to be updated. 
    // This will be sent to the PUT API call to update requestList.
    const [songId, setSongId] = useState("");

    // Set states for the numbers of song requests on the request page for the queue, playNowQueue, and the generalRequestQueue.
    const [queueCount, setQueueCount] = useState("0");
    const [playNowQueueCount, setPlayNowQueueCount] = useState("0");
    const [generalRequestCount, setGeneralRequestQueueCount] = useState("0");

    // useEffect to check if logged in Dj via AuthO already has an Dj profile for Noi.
    // If they don't redirect them (via checkIfProfileExists) to the setup profile page.
    // Otherwise find their ObjectId for their Dj account and stay on the Dj dashboard page.
    useEffect(() => {
        checkIfProfileExists(user.sub);
        // If the Dj has a profile already (they exist) this loads dj profile and active event for the queue
        loadProfile(user.sub);
    }, [user.sub])

    useEffect(() => {
        let orderedList = queueList.sort((a,b) => (a.queueOrderNumber - b.queueOrderNumber));
        for (let i = 0; i < orderedList.length; i++){
            if(orderedList[i].queueOrderNumber !== i + 1){
                orderedList[i].queueOrderNumber = i + 1;
                let queueNum = {
                    newQueueNumber: orderedList[i].queueOrderNumber
                }
                API.updateSongQueueNumber(orderedList[i]._id, queueNum)
                .catch(err => console.log(err));
            }
        }
        setQueueList(orderedList)
    }, [queueList])

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
    async function loadActivatedEventRequests(djId) {
        await API.getActivatedEvent(djId)
            .then(res => {

                console.log("Here we go again.");
                console.log(res.data.events[0].requestList)

                // Set setActivatedEventId to the Event._id for the one and only activated event in the Dj document.
                //setActivatedEventId(res.data.events[0]._id);
                // A Dj can only have one activated event at a time.
                setRequestList(res.data.events[0].requestList);
                setQueueList(res.data.events[0].requestList.filter(request => request.songStatus === "queue").sort((a,b) => (a.queueOrderNumber - b.queueOrderNumber)))
                // eventIdForSongCount is assign the activated eventId so it can access it immediately below in getSongStatusCount API.
                eventIdForSongCount = res.data.events[0]._id;
                // Reset songId back to empty after each load to cause state change for when a user clicks the same song req twice in a row.
                // As in they click ACCCEPT to add to queue and then they click PLAYED right after.
                // Because the songId doesn't change - it doesn't "react"/"refresh" to remove the PLAYED song off of the request page.
                // This fixes that!
                setSongId("");
                
                var queueCounter = 0;
                var playNowQueueCounter = 0;
                var generalRequestQueueCounter = 0;

                // Go through the array of songStatuses and increased appropriate counter.
                for (var i = 0; i < res.data.events[0].requestList.length; i++) {
                    if (res.data.events[0].requestList[i].songStatus === "queue") {
                        queueCounter = queueCounter + 1;
                    }
                    else if (res.data.events[0].requestList[i].songStatus === "playNowQueue") {
                        playNowQueueCounter = playNowQueueCounter + 1;
                    }
                    else if (res.data.events[0].requestList[i].songStatus === "generalRequestQueue") {
                        generalRequestQueueCounter = generalRequestQueueCounter + 1;
                    }
                }

                setQueueCount(queueCounter)
                setPlayNowQueueCount(playNowQueueCounter)
                setGeneralRequestQueueCount(generalRequestQueueCounter)

            })
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
        let requestSongStatusChangeTo = "";
        switch (requestButtonType) {
            case "ACCEPT":
                requestSongStatusChangeTo = "queue";
                break;
            case "DECLINE":
                requestSongStatusChangeTo = "declined";
                break;
            case "PLAYED":
                requestSongStatusChangeTo = "played";
                break;
            case "REMOVED":
                requestSongStatusChangeTo = "removed";
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
            "newSongStatus": requestSongStatusChangeTo,
            "addQueueNumber": 100
        };

        console.log("*****obj", songData);

        console.log("*****", songId);

        // PUT API route to update songStatus based on the songData
        await API.updateRequest(songData)
            .then(res => {
                console.log("catfood:", res);
            })
            .catch(err => console.log(err))


    }

    // function handleDeclineRequest(event) {
    //     event.preventDefault();
    //     alert("Remove me from the queue!");
    // }

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(queueList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        for (let i = 0; i < items.length; i++){
            if(items[i].queueOrderNumber !== i + 1){
                items[i].queueOrderNumber = i + 1;
                let queueNum = {
                    newQueueNumber: items[i].queueOrderNumber
                }
                API.updateSongQueueNumber(items[i]._id, queueNum)
                .catch(err => console.log(err));
            }
        }

        setQueueList(items);
    }

    return (
        <div>
            <Header title="REQUESTS" />
            {/* Queue */}
            <Container classes="top-container">
                <Row>
                    <h1>Queue <span className="badge badge-dark"> {queueCount}</span></h1>
                    <a href="#queueModal" className="ml-auto mr-3 mt-1" data-toggle="modal" data-target="#queueModal" style={{color: "gold"}}>SEE ALL QUEUE SONGS</a>
                </Row>
                {queueList && <QueueModal 
                    songs={queueList}
                    handleOnDragEnd={handleOnDragEnd}
                />}
                <ScrollContainer className="scroll-container">
                    <Row classes="flex-nowrap">
                        {queueList
                            .map((songs, index) => (
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
                    <h1>Play Now <span className="badge badge-dark"> {playNowQueueCount}</span></h1>
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
                    <h1>General Requests <span className="badge badge-dark"> {generalRequestCount}</span></h1>
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
