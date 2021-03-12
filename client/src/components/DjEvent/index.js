import React, { useState } from 'react';
import { FormBtn, Switch } from "../Form";
import './style.css'

function DjEvent(props) {
    const [endButton, setEndButton] = useState();

    const date = new Date(props.eventDate);
    const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][date.getMonth()];
    const dateDay = date.getDate() + 1;
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

    // For safetly, not passing in full ID into elements
    let newId = ""
    if(props._id){
        newId = props._id.slice(0,6)
    }


    function handleSwitch() {
        if(document.getElementById(`activate-${newId}`).checked) {
            setEndButton(true);
        } else {
            setEndButton(false);
        }
        console.log("Changed");
        // PUT REQUEST TO UPDATE DATABASE
    }

    function handleEnd() {
        console.log("Ended");
        // PUT REQUEST TO UPDATE DATABASE
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
                    <li>
                        {`${month} ${dateDay}${dateEnd}, ${date.getFullYear()}`}
                    </li>
                    <li>
                        {props.startTime} - {props.endTime}
                    </li>
                    <li>
                        <button type="button" className="btn btn-dark mt-3" data-toggle="modal" data-target={`#modal-${newId}`}>
                            Details
                        </button>
                    </li>
                    {/* Modal */}
                    <div className="modal fade" id={`modal-${newId}`} tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{props.eventName}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="modal-text">{`${month} ${dateDay}${dateEnd}, ${date.getFullYear()}`} &#183; {props.startTime} - {props.endTime}</p>
                                <p className="modal-text">{props.eventType} &#183; &#183; {props.genre}</p>
                                <p className="modal-text">
                                    Venue: <br />
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
                        switchTitle="Activate"
                        change={handleSwitch}
                    />
                    {endButton && <FormBtn className="btn btn-dark mt-3" onClick={handleEnd}>End Event</FormBtn>}
                </ul>
            </div>
        </div>
    )
}

export default DjEvent;



