import React, { useEffect, useRef } from 'react';
import './style.css'

export function Input(props) {
    return (
        <div>
            <input {...props}/>
        </div>
    )
}

export function InputText(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            {props.message && <label className={"text-danger ml-3"}>{props.message}</label>}
            <input {...props} onClick={(e) => e.target.focus()}/>
        </div>
    )
}

export function InputTime(props) {
  // for time wheels
  const amPmArray = ["Choose...", "AM", "PM"];
  const hoursArray = ["Choose...", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  const minuteArray = ["Choose...", "00", "15", "30", "45"];

  // for parsing out start/end time on previously created events
  let defaultHour = "";
  let defaultMinute = "";
  let defaultAmPm = "";
  let eventTime = props.eventTime;
  if (eventTime) {
    defaultAmPm = eventTime.substring(eventTime.length - 2);
    // if event time has single digit hour (ex. 5pm)
    eventTime.length === 7 ? defaultHour = eventTime.slice(0, 1) : defaultHour = eventTime.slice(0, 2);
    eventTime.length === 7 ? defaultMinute = eventTime.slice(2, 4) : defaultMinute = eventTime.slice(3, 5);
  }
  
    return (
      <div className="form-group">
        <label htmlFor={props.id}>{props.label}</label>
        <div className="input-group mb-3">
          <select
            onChange={(e) => props.onChange(e)}
            type={props.type}
            name={ props.start ? props.nameHH : props.nameH}
            className="custom-select"
            id="inputGroupSelect02"
            onClick={(e) => e.target.focus()}
          >
            {hoursArray.map(ele => (
              (ele === defaultHour ? <option selected value={ele}>{ele}</option> : <option value={ele}>{ele}</option>)
              )
            )}
          </select>
          <select
            onChange={(e) => props.onChange(e)}
            type={props.type}
            name={ props.start ? props.nameMM : props.nameM}
            className="custom-select"
            id="inputGroupSelect03"
            onClick={(e) => e.target.focus()}
          >
            {minuteArray.map(ele => (
              (ele === defaultMinute ? <option style={{backgroundColor: "red"}} selected value={ele}>{ele}</option> : <option value={ele}>{ele}</option>)
              )
            )}
          </select>
          <select
            onChange={(e) => props.onChange(e)}
            type={props.type}
            name={ props.start ? props.nameAA : props.nameA}
            className="custom-select"
            id="inputGroupSelect04"
            onClick={(e) => e.target.focus()}
          >
            {amPmArray.map(ele => (
              (ele === defaultAmPm ? <option selected value={ele}>{ele}</option> : <option value={ele}>{ele}</option>)
              )
            )}
          </select>
        </div>
      </div>
    );
  }
  
export function InputCheckbox(props) {
    return (
        <div className="form-check">
            <input type={props.type} name={props.name} value={props.value} id={props.id} className={props.className}/>
            <label htmlFor={props.id} className="form-check-label text-left">{props.label} {props.tooltip === "true" && 
            <i data-toggle="modal" data-target={`#modal-${props.tooltipId}`} className="fas fa-info-circle ml-2"></i>
            }</label>
        </div>
    )
}

export function Switch(props) {
    return (
      <div className="custom-control custom-switch mt-3">
        <input type="checkbox" className="custom-control-input" id={props.id} onChange={props.change} />
        <label className="custom-control-label" htmlFor={props.id}>{props.switchTitle}</label>
      </div> 
    )
}

export function Dropdown(props) {
    return (
    <div className="form-group">
        <label htmlFor={props.id}>{props.label}</label>
        <select className="form-control" id={props.id}>
            {props.children}
        </select>
    </div>
    )
}

export function FormBtn(props) {
    return (
        <div>
            <button {...props}>
                {props.children}
            </button>
        </div>
    )
}
