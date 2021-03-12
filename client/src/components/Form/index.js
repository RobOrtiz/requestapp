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
            <label forhtml={props.id}>{props.label}</label>
            <input {...props}/>
        </div>
    )
}

export function InputCheckbox(props) {
    return (
        <div className="form-check">
            <input type={props.type} id={props.id} className={props.className}/>
            <label forhtml={props.id} className="form-check-label" data-toggle="tooltip" title={props.tooltipTitle}>{props.label} <i className="fas fa-info-circle"></i></label>
        </div>
    )
}

// Note: React gives a warning for using "for" but bootstrap requires it to stay "for" instead of "forhtml" in order to work
export function Switch(props) {
    return (
      <div className="custom-control custom-switch mt-3">
        <input type="checkbox" className="custom-control-input" id={props.id} onChange={props.change} />
        <label className="custom-control-label" for={props.id}>{props.switchTitle}</label>
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
