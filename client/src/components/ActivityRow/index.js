import React from 'react';
import { Row, Col } from '../Grid';

function ActivityRow(props) {

    // Determine song type - playNow or generalRequest
    if (props.playNow === true) {
        var requestType = "Play Now Song Request"
    }
    else {
        var requestType = "General Song Request"
    }

    // Determine text to display for song status
    switch (props.songStatus) {
        case "queue":
            var textSongStatus = "In the Queue";
            break;
        case "declined":
            var textSongStatus = "Declined";
            break;
        case "played":
            var textSongStatus = "Played";
            break;
        case "removed":
            var textSongStatus = "Removed";
            break;
        case "playNowQueue":
            var textSongStatus = "In the Play Now Queue";
            break;
        case "generalRequestQueue":
            var textSongStatus = "In the General Request Queue";
            break;
        default:
            console.log("It didn't work. Fix it!")
            break;
    }

    // Convert dates into readable time format
    var convertRequestedTime = new Date(props.requestedTime);
    convertRequestedTime.getUTCHours();
    console.log("This is the hour:");
    console.log(convertRequestedTime);

    return (
        <Row classes="h-100 pt-2 activity-bottom">
            <Col size="3" classes="my-auto">
                <h4 className="font-weight-bold">{props.title}</h4>
                <p>{props.artist}</p>
            </Col>
            <Col size="2" classes="my-auto">
                <p>{textSongStatus}</p>
            </Col>
            <Col size="1" classes="my-auto">
                <h5>${props.tip}</h5>
            </Col>
            <Col size="2" classes="my-auto">
                <h5>{props.customerName}</h5>
                <p>{requestType}</p>
            </Col>
            <Col size="4" classes="my-auto">
                <p>Request Submitted at: {props.requestedTime} <br /> Request Updated At: {props.timeUpdatedAt}</p>
            </Col>
        </Row>
    )
}

export default ActivityRow;