import React from 'react';
import { Row, Col } from '../Grid';

function ActivityRow(props) {
    return(
        <Row classes="h-100 pt-2 activity-bottom">
            <Col size="4" classes="my-auto">
                <h4 className="font-weight-bold">{props.title}</h4>
                <p>{props.artist}</p>
            </Col>
            <Col size="4" classes="my-auto">
                <h5>{props.tip}</h5>
            </Col>
            <Col size="4" classes="my-auto">
                <h5>{props.guestName}</h5>
                <p>({props.type} Song)</p>
            </Col>
            <Col size="4" classes="my-auto">
                <p>{props.date} <br/> {props.time}</p>
            </Col>
        </Row>
    )
}

export default ActivityRow;