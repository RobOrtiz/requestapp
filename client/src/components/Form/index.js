import React from 'react';
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
            <input {...props}/>
        </div>
    )
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
