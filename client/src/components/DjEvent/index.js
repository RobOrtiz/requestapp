import React, { useState, useEffect } from 'react';
import { FormBtn, Switch } from "../Form";
import './style.css'

function DjEvent(props) {
    const monthNumber = props.eventDate.slice(5,7)
    const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][monthNumber - 1];

    let dateDay;
    if (props.eventDate.slice(8,9) === "0") {
        dateDay = parseInt(props.eventDate.slice(9,10))
    } else {
        dateDay = parseInt(props.eventDate.slice(8,10))
    }

    const year = props.eventDate.slice(0,4);

    let dateEnd = "";
    if (dateDay === 1 || dateDay === 21 || dateDay === 31) {
        dateEnd = "st";
    } else if (dateDay === 2 || dateDay === 22) {
        dateEnd = "nd"
    } else if (dateDay === 3 || dateDay === 23) {
        dateEnd = "rd"
    } else {
        dateEnd = "th"
    }

    // For length-issue, not passing in full ID into elements
    let newId = ""
    if(props._id){
        newId = props._id.slice(0,6)
    }


    return (
        <div className="event-card">
            <div className="event-img-container">
                <img alt="event logo" src={props.eventImage} />
            </div>
            <div className="event-content">
                <ul className="text-center pl-0">
                    <li className="mt-2">
                        <h3><strong className="event-title">{props.eventName}</strong></h3>
                    </li>
                    <li className="font-italic">
                        {`${month} ${dateDay}${dateEnd}, ${year}`}
                    </li>
                    <li className="font-italic">
                        {props.startTime} - {props.endTime}
                    </li>
                    <li>
                        <button type="button" className="btn btn-dark mt-3" id={`details-${newId}`} data-toggle="modal" data-target={`#modal-${newId}`}>
                            Details
                        </button>
                    </li>
                    {/* Modal */}
                    <div className="modal fade" id={`modal-${newId}`} tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                <h5 className="text-uppercase mb-3">{props.eventName}</h5>
                                <p className="modal-text"><b>Date:</b> {`${month} ${dateDay}${dateEnd}, ${year}`}</p>
                                <p className="modal-text"><b>Time:</b> {props.startTime} - {props.endTime}</p>
                                <p className="modal-text"><b>Type:</b> {props.eventType} &#183; {props.genre}</p>
                                <p className="modal-text">
                                    <b>Venue:</b> <br />
                                    {props.venueName} <br />
                                    {props.venueAddress}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <Switch 
                        id={`activate-${newId}`}
                        switchTitle={props.eventStatus === "activated" ? "Active" : "Inactive"}
                        change={props.handleSwitch}
                    />
                    <FormBtn className="btn btn-dark mt-3 end-hidden" onClick={props.handleEnd} id={`end-${newId}`}>End Event</FormBtn>
                </ul>
            </div>
        </div>
    )
}

export default DjEvent;



