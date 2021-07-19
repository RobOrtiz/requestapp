import React from 'react';
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

    // For Ended Event Stats
    let generalReqMade = 0;
    let playNowReqMade = 0;
    let tipsTotal = 0;
    let noTipTotal = 0;
    props.requestList.forEach(song => {
        if(song.generalRequest){
            generalReqMade++; 
        } else {
            playNowReqMade++; 
        }

        if(song.songStatus === "played"){
            tipsTotal += song.tip;
        } else {
            noTipTotal += song.tip;
        }
    })

    return (
        // EVENT CARD
        <div className="event-card">
            <div className="event-img-container">
                <img alt="event logo" src={props.eventImage} />
            </div>
            <div className="event-content">
                <ul className="text-center pl-0">
                    <li className="mt-2">
                        <h3><strong className="event-title">{props.eventName}</strong></h3>
                    </li>
                    {props.eventStatus === "end" && (
                        <li className="mb-2">
                            <strong style={{color: "red"}}>ENDED</strong>
                        </li>
                    )}
                    <li className="font-italic">
                        {`${month} ${dateDay}${dateEnd}, ${year}`}
                    </li>
                    <li className="font-italic">
                        {props.startTime} - {props.endTime}
                    </li>
                    <li className="font-italic">
                        General Request: {props.generalRequestTipMin} -
                        Play Now: {props.playNowTipMin}
                    </li>
                    {props.eventStatus !== "end" ? (
                        <li>
                            <button type="button" className="btn btn-dark mt-3" id={`details-${newId}`} data-toggle="modal" data-target={`#modal-${newId}`}>
                                Details
                            </button>
                            <button type="button" style={{marginLeft: "15%"}} className="btn btn-dark mt-3" id={`edit-${newId}`} data-toggle="modal" data-target={`#modal-${newId}`}>
                                Edit
                            </button>
                        </li>
                    ) : (
                        <li>
                            <button type="button" className="btn btn-dark mt-3" id={`stats-${newId}`} data-toggle="modal" data-target={`#stats-modal-${newId}`}>
                                Event Stats
                            </button>
                        </li>
                    )}
                    {/* Details Modal */}
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
                    {/* Event Stats Modal */}
                    <div className="modal fade event-stats-modal" id={`stats-modal-${newId}`} tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                <h5 className="text-uppercase mb-3">{props.eventName} - ENDED</h5>
                                <p className="modal-text">{`${month} ${dateDay}${dateEnd}, ${year}`} &#183; {props.startTime} - {props.endTime} &#183; {props.eventType} &#183; {props.genre}</p>
                                <p className="modal-text">{props.venueName} {props.venueAddress}</p>
                                <p className="mb-1"><strong>Total Play Now Requests Made:</strong> {playNowReqMade}</p>
                                <p className="mb-1"><strong>Total General Requests Made:</strong> {generalReqMade}</p>
                                <p className="mb-1"><strong>Total Tips Made:</strong> ${tipsTotal}</p>
                                <p><strong>Total Tips Declined:</strong> ${noTipTotal}</p>
                                <table className="table text-white">
                                <thead>
                                    <tr>
                                        <th scope="col">All Songs Requested</th>
                                        <th scope="col">Request Type</th>
                                        <th scope="col">Tip</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.requestList.map(song => {
                                        return (
                                        <tr key={song._id}>
                                            <td>{song.title} &#183; {song.artist}</td>
                                            <td>{song.generalRequest ? "General" : "Play Now"}</td>
                                            <td>${song.tip}</td>
                                            <td>{song.songStatus === "played" ? <span className="text-success">Played</span> : <span className="text-danger">Did Not Play</span>}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    {props.eventStatus !== "end" && (
                        <div>
                            <Switch 
                                id={`activate-${newId}`}
                                switchTitle={props.eventStatus === "activated" ? "Active" : "Inactive"}
                                change={props.handleSwitch}
                            />
                            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <FormBtn className="btn btn-danger border border-dark mt-3 end-hidden" onClick={props.handleEnd} id={`end-${newId}`}>End Event</FormBtn>
                            <button type="button" style={{marginLeft: "15%"}} className="btn btn-dark mt-3 edit-active-hidden" id={`edit-active-${newId}`} data-toggle="modal" data-target={`#modal-${newId}`}>
                                Edit
                            </button>
                            </div>
                            </div>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default DjEvent;



