import React from 'react';
import { Row, Col } from '../Grid';
const moment = require('moment')



function ActivityRow(props) {

    // Determine song type - playNow or generalRequest
    let requestType = ""
    if (props.playNow === true) {
        requestType = "Play Now Request"
    }
    else {
        requestType = "General Request"
    }

    // Determine text to display for song status and tip status
    let textSongStatus = "";
    let tipStatus = "";
    switch (props.songStatus) {
        case "queue":
            textSongStatus = "Added to Queue at:";
            tipStatus = "Pending..."
            break;
        case "declined":
            textSongStatus = "Declined at:";
            tipStatus = "--0--"
            break;
        case "played":
            textSongStatus = "Played at:";
            tipStatus = "Earned"
            break;
        case "removed":
            textSongStatus = "Removed at:";
            tipStatus = "--0--"
            break;
        case "playNowQueue":
            textSongStatus = "Play Now Queue at:";
            tipStatus = "Pending..."
            break;
        case "generalRequestQueue":
            textSongStatus = "General Request Queue at:";
            tipStatus = "Pending..."
            break;
        default:
            console.log("It didn't work. Fix it!")
            break;
    }

    // Convert dates into readable time format using Moment.Js package
    var updatedTimeDateConvertedToTime = moment(props.timeUpdatedAt).format('LT');
    var requestSubmittedDateConvertedToTime = moment(props.requestedTime).format('LT');

    return (
        <Row classes="h-100 pt-2 activity-bottom">
            <Col size="3" classes="my-auto">
                <h4 className="font-weight-bold">{props.title}</h4>
                <p>{props.artist}</p>
            </Col>
            <Col size="3" classes="my-auto">
                <h5>{textSongStatus}</h5>
                <p>{updatedTimeDateConvertedToTime}</p>
                <p>Submitted at: {requestSubmittedDateConvertedToTime}</p>
            </Col>
            <Col size="3" classes="my-auto">
                <h5>${props.tip}</h5>
                <p>{tipStatus}</p>
            </Col>
            <Col size="3" classes="my-auto">
                <h5>{props.customerName}</h5>
                <p>{requestType}</p>
            </Col>
            {/* <Col size="3" classes="my-auto">
                <p>Submitted at: {requestSubmittedDateConvertedToTime} <br />Updated At: {updatedTimeDateConvertedToTime}</p>
            </Col> */}
        </Row>
    )
}

export default ActivityRow;