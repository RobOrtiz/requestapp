import React from 'react';
import './style.css'

function DjEvent(props) {
    return (
        <div className="event-card">
            <div className="event-img-container">
                <img alt="event logo" src={props.eventImage} />
            </div>
            <div className="event-content">
                <ul>
                    <li>
                        <strong>Event Name: </strong> {props.eventName}
                    </li>
                    <li>
                        <strong>Event Type: </strong> {props.eventType}
                    </li>
                    <li>
                        <strong>Event Date: </strong> {props.eventDate}
                    </li>
                    <li>
                        <strong>Time: </strong> {props.startTime} to: {props.endTime}
                    </li>
                    <li>
                        <strong>Venue Name: </strong> {props.venueName}
                    </li>
                    <li>
                        <strong>Venue Address</strong> {props.venueAddress}
                    </li>
                    <li>
                        <strong>Genre: </strong> {props.genre}
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default DjEvent;



