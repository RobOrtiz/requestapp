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
            <input {...props}/>
            <label forhtml={props.id} className="form-check-label">{props.label} <i className="fas fa-info-circle"></i></label>
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
