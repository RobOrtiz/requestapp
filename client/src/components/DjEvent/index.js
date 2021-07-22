import React, { useState, useEffect, useRef } from "react";
import { InputText, InputTime, FormBtn, Switch, Input } from "../Form";
import API from "../../utils/API";
import "./style.css";

function DjEvent(props) {
  const monthNumber = props.eventDate.slice(5, 7);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][monthNumber - 1];

  let dateDay;
  if (props.eventDate.slice(8, 9) === "0") {
    dateDay = parseInt(props.eventDate.slice(9, 10));
  } else {
    dateDay = parseInt(props.eventDate.slice(8, 10));
  }

  const year = props.eventDate.slice(0, 4);

  let dateEnd = "";
  if (dateDay === 1 || dateDay === 21 || dateDay === 31) {
    dateEnd = "st";
  } else if (dateDay === 2 || dateDay === 22) {
    dateEnd = "nd";
  } else if (dateDay === 3 || dateDay === 23) {
    dateEnd = "rd";
  } else {
    dateEnd = "th";
  }

  // For length-issue, not passing in full ID into elements
  let newId = "";
  if (props._id) {
    newId = props._id.slice(0, 6);
  }

  // For Ended Event Stats
  let generalReqMade = 0;
  let playNowReqMade = 0;
  let tipsTotal = 0;
  let noTipTotal = 0;
  props.requestList.forEach((song) => {
    if (song.generalRequest) {
      generalReqMade++;
    } else {
      playNowReqMade++;
    }

    if (song.songStatus === "played") {
      tipsTotal += song.tip;
    } else {
      noTipTotal += song.tip;
    }
  });

  // EDIT EVENT SECTION
  const [formObject, setFormObject] = useState({});

  // save to state hours, minutes and am/pm separately
  const [starttime, setStartTime] = useState({
    hour: "",
    minute: "",
    ampm: "",
  });
  const [endtime, setEndTime] = useState({ hour: "", minute: "", ampm: "" });

  // save to state hours, minutes and am/pm separately
  function handleInputTimeChange(event) {
    const { name, value } = event.target;
    setStartTime({ ...starttime, [name]: value });
  }

  function handleInputEndTimeChange(event) {
    const { name, value } = event.target;
    setEndTime({ ...endtime, [name]: value });
  }

  // join in to a string
  let totalStartTime = "";
  totalStartTime = starttime.hour
    .concat(":", starttime.minute)
    .concat(" ", starttime.ampm);

  let totalEndTime = "";
  totalEndTime = endtime.hour
    .concat(":", endtime.minute)
    .concat(" ", endtime.ampm);

  // add start time and end time to formObject
  useEffect(() => {
    setFormObject({
      ...formObject,
      eventTimeStart: totalStartTime,
      eventTimeEnd: totalEndTime,
    });
  }, [starttime, endtime]);

  // destructuring formObj
  const { eventLocation, eventName, eventType, genre, venueName } = formObject;

  // error massages
  const cleanErrors = {
    errEventLocation: "",
    errEventName: "",
    errEventType: "",
    errGenre: "",
    errVenueName: "",
  };

  //  error message state and condition for submitting the form
  const [error, setError] = useState({ ...cleanErrors });
  const [valid, setValid] = useState({ set: true });

  // save user's input to state
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // regex only allows letters A-Z, a-z, 0-9
  const eventValidator = /^\w+( \w+)*$/;

  const addressValidator = /^[a-zA-Z0-9 .,-]+$/;

  // validation function
  function validateTextField(field, errMsg) {
    if (field && (field.length > 30 || !eventValidator.test(field.trim()))) {
      console.log(error);
      return errMsg;
    } else {
      return "";
    }
  }

  function validateTextFieldAddress(field, errMsg) {
    if (field && (field.length > 100 || !addressValidator.test(field.trim()))) {
      console.log(error);
      return errMsg;
    } else {
      return "";
    }
  }

  // validate input, add/remove error on change, set submission condition to true
  useEffect(() => {
    let errEventLocation = validateTextFieldAddress(
      eventLocation,
      "Location can only include letters, numbers, special characters [ , . - ], and cannot be longer than 100 characters"
    );
    let errEventName = validateTextField(
      eventName,
      "Event name can only include letters and numbers, and cannot be longer than 30 characters"
    );
    let errEventType = validateTextField(
      eventType,
      "Event type can only include letters and numbers, and cannot be longer than 30 characters"
    );
    let errGenre = validateTextField(
      genre,
      "Genre can only include letters and numbers, and cannot be longer than 30 characters"
    );
    let errVenueName = validateTextField(
      venueName,
      "Event venue name can only include letters and numbers, and cannot be longer than 30 characters"
    );

    if (
      errEventType === "" &&
      errEventName === "" &&
      errGenre === "" &&
      errEventLocation === "" &&
      errVenueName === ""
    ) {
      setValid({ set: true });
    } else {
      setValid({ set: false });
    }

    // set error messages to validation function outputs
    setError({
      errEventLocation,
      errEventName,
      errEventType,
      errGenre,
      errVenueName,
    });
  }, [formObject]);

  // save user's previous event info to state before editing,
  // so that they dont need to refill all event data
  function initialFormValues(props) {
    setFormObject({
      eventName: props.eventName,
      genre: props.genre,
      eventDate: props.eventDate,
      eventTimeStart: props.startTime,
      eventTimeEnd: props.endTime,
      eventType: props.eventType,
      venueName: props.venueName,
      eventLocation: props.venueAddress,
      generalRequestTipMin: props.generalRequestTipMin,
      playNowTipMin: props.playNowTipMin,
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // check validation is set to true
    if (valid.set === true) {
      API.updateEvent({
        eventSubIdToChange: props.subIdForEventStatusChange,
        genre: formObject.genre,
        eventDate: formObject.eventDate,
        startTime: formObject.eventTimeStart,
        endTime: formObject.eventTimeEnd,
        eventName: formObject.eventName,
        eventType: formObject.eventType,
        venueName: formObject.venueName,
        venueAddress: formObject.eventLocation,
        generalRequestTipMin: formObject.generalRequestTipMin,
        playNowTipMin: formObject.playNowTipMin,
      })
        .then(() => window.location.replace("/dj/dashboard"))
        .catch((err) => console.log(err));
    } else {
      alert("Something went wrong with the form. Please check for errors and try again.");
    }
  }

  return (
    // EVENT CARD
    <div className="event-card">
      <div className="event-img-container">
        <img alt="event logo" src={props.eventImage} />
      </div>
      <div className="event-content">
        <ul className="text-center pl-0">
          <li className="mt-2">
            <h3>
              <strong className="event-title">{props.eventName}</strong>
            </h3>
          </li>
          {props.eventStatus === "end" && (
            <li className="mb-2">
              <strong style={{ color: "red" }}>ENDED</strong>
            </li>
          )}
          <li className="font-italic">
            {`${month} ${dateDay}${dateEnd}, ${year}`}
          </li>
          <li className="font-italic">
            {props.startTime} - {props.endTime}
          </li>
          <li className="font-italic">
            General Request: {props.generalRequestTipMin} - Play Now:{" "}
            {props.playNowTipMin}
          </li>
          {/* Buttons when inactive */}
          {props.eventStatus !== "end" ? (
            <li>
              <button
                type="button"
                className="btn btn-dark mt-3"
                id={`details-${newId}`}
                data-toggle="modal"
                data-target={`#modal-${newId}`}
              >
                Details
              </button>
              <button
                type="button"
                style={{ marginLeft: "15%" }}
                className="btn btn-dark mt-3"
                onClick={() => initialFormValues(props)}
                id={`edit-${newId}`}
                data-toggle="modal"
                data-target={`#modal-edit-${newId}`}
              >
                Edit
              </button>
            </li>
          ) : (
            <li>
              <button
                type="button"
                className="btn btn-dark mt-3"
                id={`stats-${newId}`}
                data-toggle="modal"
                data-target={`#stats-modal-${newId}`}
              >
                Event Stats
              </button>
            </li>
          )}
          {/* Details Modal */}
          <div
            className="modal fade"
            id={`modal-${newId}`}
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <h5 className="text-uppercase mb-3">{props.eventName}</h5>
                  <p className="modal-text">
                    <b>Date:</b> {`${month} ${dateDay}${dateEnd}, ${year}`}
                  </p>
                  <p className="modal-text">
                    <b>Time:</b> {props.startTime} - {props.endTime}
                  </p>
                  <p className="modal-text">
                    <b>Type:</b> {props.eventType} &#183; {props.genre}
                  </p>
                  <p className="modal-text">
                    <b>Venue:</b> <br />
                    {props.venueName} <br />
                    {props.venueAddress}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Edit Modal */}
          <div
            className="modal fade"
            id={`modal-edit-${newId}`}
            role="dialog"
            tabIndex="-1"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <form>
                    <InputText
                      onChange={handleInputChange}
                      type="text"
                      id="eventName"
                      name="eventName"
                      defaultValue={props.eventName}
                      label="Event Name"
                      className="form-control"
                      message={error.errEventName}
                      
                    //   ref={focusDiv}
                    />
                    <InputText
                      onChange={handleInputChange}
                      type="text"
                      id="venueName"
                      name="venueName"
                      defaultValue={props.venueName}
                      label="Venue Name"
                      className="form-control"
                      message={error.errVenueName}
                    />
                    <InputText
                      onChange={handleInputChange}
                      type="text"
                      id="eventType"
                      name="eventType"
                      defaultValue={props.eventType}
                      label="What type of event is it?"
                      className="form-control"
                      message={error.errEventType}
                    />
                    <InputText
                      onChange={handleInputChange}
                      type="text"
                      id="eventLocation"
                      name="eventLocation"
                      defaultValue={props.venueAddress}
                      label="What's the address for the event?"
                      className="form-control"
                      message={error.errEventLocation}
                    />
                    <InputText
                      onChange={handleInputChange}
                      type="text"
                      id="genre"
                      name="genre"
                      defaultValue={props.genre}
                      label="What type of music will be played?"
                      className="form-control"
                      message={error.errGenre}
                    />
                    <InputText
                      onChange={handleInputChange}
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      label="Event Date"
                      defaultValue={props.eventDate.slice(0, 10)}
                      className="form-control"
                    />
                    {/* start time component */}
                    <InputTime
                      onChange={handleInputTimeChange}
                      type="text"
                      id="eventTimeStart"
                      nameH="hour"
                      nameM="minute"
                      nameA="ampm"
                      label="What time does the event start?"
                      className="form-control"
                      eventTime={props.startTime}
                      defaultValue={props.startTime}
                    />
                    {/* end time component */}
                    <InputTime
                      onChange={handleInputEndTimeChange}
                      type="text"
                      id="eventTimeEnd"
                      nameHH="hour"
                      nameMM="minute"
                      nameAA="ampm"
                      start="true"
                      label="What time does the event end?"
                      className="form-control"
                      eventTime={props.endTime}
                      defaultValue={props.endTime}
                      
                    />
                    <InputText
                      onChange={handleInputChange}
                      type="number"
                      id="generalRequestTipMin"
                      name="generalRequestTipMin"
                      min={0}
                      defaultValue={props.generalRequestTipMin}
                      label="Enter minimum amount for general requests"
                      className="form-control"
                    />
                    <InputText
                      onChange={handleInputChange}
                      type="number"
                      id="playNowTipMin"
                      name="playNowTipMin"
                      min={0}
                      defaultValue={props.playNowTipMin}
                      label="Enter minimum amount for play now requests"
                      className="form-control"
                    />
                    <FormBtn
                      className="btn btn-dark formBtn"
                      onClick={handleFormSubmit}
                    >
                      Save Changes
                    </FormBtn>
                    <FormBtn
                      className="btn btn-dark formBtn"
                      data-dismiss="modal"
                    >
                      Cancel Creating Event
                    </FormBtn>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Event Stats Modal */}
          <div
            className="modal fade event-stats-modal"
            id={`stats-modal-${newId}`}
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-body">
                  <h5 className="text-uppercase mb-3">
                    {props.eventName} - ENDED
                  </h5>
                  <p className="modal-text">
                    {`${month} ${dateDay}${dateEnd}, ${year}`} &#183;{" "}
                    {props.startTime} - {props.endTime} &#183; {props.eventType}{" "}
                    &#183; {props.genre}
                  </p>
                  <p className="modal-text">
                    {props.venueName} {props.venueAddress}
                  </p>
                  <p className="mb-1">
                    <strong>Total Play Now Requests Made:</strong>{" "}
                    {playNowReqMade}
                  </p>
                  <p className="mb-1">
                    <strong>Total General Requests Made:</strong>{" "}
                    {generalReqMade}
                  </p>
                  <p className="mb-1">
                    <strong>Total Tips Made:</strong> ${tipsTotal}
                  </p>
                  <p>
                    <strong>Total Tips Declined:</strong> ${noTipTotal}
                  </p>
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
                      {props.requestList.map((song) => {
                        return (
                          <tr key={song._id}>
                            <td>
                              {song.title} &#183; {song.artist}
                            </td>
                            <td>
                              {song.generalRequest ? "General" : "Play Now"}
                            </td>
                            <td>${song.tip}</td>
                            <td>
                              {song.songStatus === "played" ? (
                                <span className="text-success">Played</span>
                              ) : (
                                <span className="text-danger">
                                  Did Not Play
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Buttons when active */}
          {props.eventStatus !== "end" && (
            <div>
              <Switch
                id={`activate-${newId}`}
                switchTitle={
                  props.eventStatus === "activated" ? "Active" : "Inactive"
                }
                change={props.handleSwitch}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormBtn
                  className="btn btn-danger border border-dark mt-3 end-hidden"
                  onClick={props.handleEnd}
                  id={`end-${newId}`}
                >
                  End Event
                </FormBtn>
                <button
                  type="button"
                  style={{ marginLeft: "15%" }}
                  className="btn btn-dark mt-3 edit-active-hidden"
                  onClick={() => initialFormValues(props)}
                  id={`edit-active-${newId}`}
                  data-toggle="modal"
                  data-target={`#modal-edit-${newId}`}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DjEvent;
