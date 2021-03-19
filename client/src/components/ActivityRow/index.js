import React from 'react';
import { Row, Col } from '../Grid';
const moment = require('moment')



function ActivityRow(props) {

    // Determine song type - playNow or generalRequest
    if (props.playNow === true) {
        var requestType = "Play Now Song Request"
    }
    else {
        var requestType = "General Song Request"
    }

    // Determine text to display for song status and tip status
    switch (props.songStatus) {
        case "queue":
            var textSongStatus = "Added to Queue at:";
              var tipStatus = "Pending..."
            break;
        case "declined":
            var textSongStatus = "Declined at:";
            var tipStatus = "--0--"
            break;
        case "played":
            var textSongStatus = "Played at:";
            var tipStatus = "Earned"
            break;
        case "removed":
            var textSongStatus = "Removed at:";
            var tipStatus = "--0--"
            break;
        case "playNowQueue":
            var textSongStatus = "Play Now Queue at:";
            var tipStatus = "Pending..."
            break;
        case "generalRequestQueue":
            var textSongStatus = "General Request Queue at:";
            var tipStatus = "Pending..."
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
            <Col size="4" classes="my-auto">
                <h4 className="font-weight-bold">{props.title}</h4>
                <p>{props.artist}</p>
            </Col>
            <Col size="3" classes="my-auto">
                <h5>{textSongStatus}</h5>
                <p>{updatedTimeDateConvertedToTime}</p>
                <p>Submitted at: {requestSubmittedDateConvertedToTime}</p>
            </Col>
            <Col size="2" classes="my-auto">
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