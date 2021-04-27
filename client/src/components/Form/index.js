import React from "react";
import "./style.css";

export function Input(props) {
  return (
    <div>
      <input {...props} />
    </div>
  );
}

export function InputText(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      {props.time ? (
        <div className="input-group mb-3">
          <select  {...props} className="custom-select" id="inputGroupSelect02">
            {/* <option >Choose...</option> */}
            <option defaultValue="12">12</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
          <select  {...props}  className="custom-select" id="inputGroupSelect02">
            {/* <option >Choose...</option> */}
            <option defaultValue="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
          <select  {...props}  className="custom-select" id="inputGroupSelect02">
            {/* <option >Choose...</option> */}
            <option defaultValue="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <div className="input-group-append">
            <label className="input-group-text" for="inputGroupSelect02">
              Choose
            </label>
          </div>
        </div>
      ) : (
        <input {...props} />
      )}
    </div>
  );
}

export function InputCheckbox(props) {
  return (
    <div className="form-check">
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        id={props.id}
        className={props.className}
      />
      <label htmlFor={props.id} className="form-check-label text-left">
        {props.label}{" "}
        {props.tooltip === "true" && (
          <i
            data-toggle="modal"
            data-target={`#modal-${props.tooltipId}`}
            className="fas fa-info-circle ml-2"
          ></i>
        )}
      </label>
    </div>
  );
}

export function Switch(props) {
  return (
    <div className="custom-control custom-switch mt-3">
      <input
        type="checkbox"
        className="custom-control-input"
        id={props.id}
        onChange={props.change}
      />
      <label className="custom-control-label" htmlFor={props.id}>
        {props.switchTitle}
      </label>
    </div>
  );
}

export function Dropdown(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <select className="form-control" id={props.id}>
        {props.children}
      </select>
    </div>
  );
}

export function FormBtn(props) {
  return (
    <div>
      <button {...props}>{props.children}</button>
    </div>
  );
}
