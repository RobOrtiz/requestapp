import React,{ useState, useEffect } from 'react';
import { InputText, InputTime, FormBtn, Switch } from "../Form";
import UploadImage from "../UploadImage"
import Helpers from "../../utils/Helpers";


import './style.css'
import { set } from 'mongoose';

function DjEvent(props) {

    //edit modal state 
    const [editButton, setEditButton] = useState(false);
    const [updateDetails, setUpdateDetails] = useState({...props, eventDate:props.eventDate.split("T")[0]});

   //useEffect is for the photo prop to load correctly

   useEffect(()=> {
     setImage(props.eventImage);          
   },[])

   
      // save to state hours, minutes and am/pm separately
    const [starttime, setStartTime] = useState({ hour: "", minute: "", ampm: ""});
    const [endtime, setEndTime] = useState({ hour: "", minute: "", ampm: "" });

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
      
        setUpdateDetails({
          ...updateDetails,
          startHour: props.startTime.split(":")[0],
          startMinutes: props.startTime[props.startTime.length - 5] + props.startTime[props.startTime.length - 4],
          startAmPm: props.startTime[props.startTime.length - 2] + props.startTime[props.startTime.length - 1],
          endHour: props.endTime.split(":")[0],
          endMinutes: props.endTime[props.endTime.length - 5] + props.endTime[props.endTime.length - 4],
          endAmPm: props.endTime[props.endTime.length - 2] + props.endTime[props.endTime.length - 1]
        })
    }, []);


    //button that shows the edit re-render
    function editButtonClick(e){
      e.preventDefault();
      // console.log(props)
     if(editButton === false){
        setEditButton(true);
    }else{
      setEditButton(false);
      cancelEventUpdate();
    }
    }

        //allows the onChange function for updating details in the input text
       
        function handleDetailChange(e) {
            const {name, value} = e.target;
            setUpdateDetails({ ...updateDetails, [name]: value });
        }

        function focusInput(e) {
          e.target.focus();
        }

        function focusTimeInput(e) {
          console.log(updateDetails)
          if(e.target.id === "startTime-hour" || e.target.id === "startTime-minute" || e.target.id === "startTime-ampm" || e.target.id === "endTime-hour" || e.target.id === "endTime-minute" || e.target.id === "endTime-ampm") {
            document.getElementById(`${e.target.id}`).focus();
            e.target.size = e.target.childNodes.length;
          } else {
            if(e.target.parentNode.parentNode.id === "startTime"){
              document.getElementById(`${e.target.parentNode.id}`).value = e.target.value;
              setUpdateDetails({ ...updateDetails, [e.target.parentNode.name]: e.target.value });
              e.target.parentNode.size = 0;
            } else if(e.target.parentNode.parentNode.id === "endTime") {
              document.getElementById(`${e.target.parentNode.id}`).value = e.target.value;
              setUpdateDetails({ ...updateDetails, [e.target.parentNode.name]: e.target.value });
              e.target.parentNode.size = 0;
            }
          }
        }

      const cancelEventUpdate = (e) => {
        setUpdateDetails({
          ...props,
          eventDate:props.eventDate.split("T")[0],
          startHour: props.startTime.split(":")[0],
          startMinutes: props.startTime[props.startTime.length - 5] + props.startTime[props.startTime.length - 4],
          startAmPm: props.startTime[props.startTime.length - 2] + props.startTime[props.startTime.length - 1],
          endHour: props.endTime.split(":")[0],
          endMinutes: props.endTime[props.endTime.length - 5] + props.endTime[props.endTime.length - 4],
          endAmPm: props.endTime[props.endTime.length - 2] + props.endTime[props.endTime.length - 1]
        })
      }

        const [loading, setLoading] = useState(false);
        const [selectedFile, setSelectedFile] = useState();
        const [invalidImage, setInvalidImage] = useState();
      
        const [image, setImage] = useState("https://via.placeholder.com/150");

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
              className="modal fade m-5"
              id={`modal-${newId}`}
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
              data-keyboard="false"
              data-backdrop="static"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Make button into to handle changes*/}

                    <button onClick={editButtonClick} className="gold-animated-btn">
                      <h5 className="startrcase mb-3">
                        {props.eventName}

                        <i className="fas fa-edit"></i>
                      </h5>
                    </button>
                    {editButton ? (
                       <div className="modal-detail-container">
                          <p className="modal-text mb-0">
                           <b>Date:</b>
                         </p>
                         <InputText
                          type="date"
                          value={updateDetails.eventDate}
                          onChange={handleDetailChange}
                          id="eventDate"
                          name="eventDate"
                          onClick={focusInput}
                         />
                         <p className="modal-text mb-0">
                           <b>Start Time:</b>
                         </p>
                         {/* <InputText
                          type="text"
                          value={updateDetails.startTime}
                          onChange={handleDetailChange}
                          id="startTime"
                          name="startTime"
                          placeholder="6:00PM"
                          onClick={focusInput}
                         />
                          <p className="modal-text mb-0">
                           <b>End Time:</b>
                         </p>
                         <InputText
                          type="text"
                          value={updateDetails.endTime}
                          onChange={handleDetailChange}
                          placeholder="6:00PM"
                          id="endTime"
                          name="endTime"
                          onClick={focusInput}
                         /> */}
                         {/* start time component */}
                        <InputTime
                          type="text"
                          id="startTime"
                          nameH="startHour"
                          nameM="startMinutes"
                          nameA="startAmPm"
                          hour={updateDetails.startHour}
                          minutes={updateDetails.startMinutes}
                          ampm={updateDetails.startAmPm}
                          onClick={focusTimeInput}
                        />
                        {/* end time component */}
                        <InputTime
                          type="text"
                          id="endTime"
                          nameHH="endHour"
                          nameMM="endMinutes"
                          nameAA="endAmPm"
                          start="true"
                          onClick={focusTimeInput}
                          hour={updateDetails.endHour}
                          minutes={updateDetails.endMinutes}
                          ampm={updateDetails.endAmPm}
                        />
                          <p className="modal-text mb-0">
                           <b>Type:</b>
                         </p>
                         <InputText
                          type="text"
                          value={updateDetails.eventType}
                          onChange={handleDetailChange}
                          id="eventType"
                          name="eventType"
                          onClick={focusInput}
                         />
                           <p className="modal-text mb-0">
                           <b>Genre:</b>
                         </p>
                         <InputText
                          type="text"
                          value={updateDetails.genre}
                          onChange={handleDetailChange}
                          id="genre"
                          name="genre"
                          onClick={focusInput}
                         />
                          <p className="modal-text mb-0">
                           <b>Venue Name:</b>
                         </p>
                         <InputText
                          type="text"
                          value={updateDetails.venueName}
                          onChange={handleDetailChange}
                          id="venueName"
                          name="venueName"
                          onClick={focusInput}
                         />
                          <InputText
                          type="text"
                          value={updateDetails.venueAddress}
                          onChange={handleDetailChange}
                          id="venueAddress"
                          name="venueAddress"
                          onClick={focusInput}
                         /> 
                          <UploadImage
                                selectImage = {(event)=>Helpers.selectImage(event, setSelectedFile, setInvalidImage)}
                                uploadImage={(event) => Helpers.uploadImage(event, selectedFile, setLoading, setImage)}
                                invalidImage={invalidImage}
                                loading={loading}
                                image={image}
                                altTag="event logo"
                                imageDescription="event"
                            />                        
                         
                          <button className="btn bg-dark gold-animated-btn" onClick={e => {
                            props.changeEventDetails(e, { ...updateDetails, eventImage: image }, setEditButton)
                            
                          } }>
                            <p className="m-1 mx-3 text-warning">Save Changes<i className="far fa-save text-warning"></i></p>
                          </button>                     
                        </div>                      

                    ):(
                                     
                      <div className="modal-detail-container">
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
                    )}
                    </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-dark gold-animated-btn"
                      data-dismiss="modal"
                      onClick={() => {
                        cancelEventUpdate();
                        setEditButton(false);
                      }}
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
                      {props.startTime} - {props.endTime} &#183;{" "}
                      {props.eventType} &#183; {props.genre}
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
            {props.eventStatus !== "end" && (
              <div>
                <Switch
                  id={`activate-${newId}`}
                  switchTitle={
                    props.eventStatus === "activated" ? "Active" : "Inactive"
                  }
                  change={props.handleSwitch}
                />
                <FormBtn
                  className="btn btn-dark mt-3 end-hidden"
                  onClick={props.handleEnd}
                  id={`end-${newId}`}
                >
                  End Event
                </FormBtn>
              </div>
            )}
          </ul>
        </div>
      </div>
    );
}

export default DjEvent;



