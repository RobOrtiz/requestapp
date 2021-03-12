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

    function handleSwitch() {
        if(document.getElementById(`${props._id}`).checked) {
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
                <ul className="text-center">
                    <li>
                        <strong>{props.eventName}</strong>
                    </li>
                    <li>
                        {`${month} ${dateDay}${dateEnd}, ${date.getFullYear()}`}
                    </li>
                    <li>
                        {props.startTime} - {props.endTime}
                    </li>
                    <li>
                        {props.eventType}
                    </li>
                    <li>
                        {props.genre}
                    </li>
                    <li>Venue:</li>
                    <li>
                        {props.venueName}
                    </li>
                    <li>
                        {props.venueAddress}
                    </li>
                    <Switch 
                        id={props._id}
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



