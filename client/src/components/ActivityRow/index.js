import React from 'react';
import { Row, Col } from '../Grid';

function ActivityRow(props) {

    // Determine song type - playNow or generalRequest
    if (props.playNow===true) {
        var requestType = "Play Now"
    }
    else {
        var requestType = "General"
    }

    return (
        <Row classes="h-100 pt-2 activity-bottom">
            <Col size="2" classes="my-auto">
                <h4 className="font-weight-bold">{props.title}</h4>
                <p>{props.artist}</p>
            </Col>
            <Col size="2" classes="my-auto">
                <p>{props.songStatus}</p>
            </Col>
            <Col size="2" classes="my-auto">
                <h5>${props.tip}</h5>
            </Col>
            <Col size="2" classes="my-auto">
                <h5>{props.customerName}</h5>
                <p>{requestType}</p>
            </Col>
            <Col size="2" classes="my-auto">
                <p>{props.date} <br /> {props.time}</p>
            </Col>
        </Row>
    )
}

export default ActivityRow;