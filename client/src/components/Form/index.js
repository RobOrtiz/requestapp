import React from 'react';
import './style.css'

export function Input(props) {
    return (
        <div className="form">
            <input {...props}/>
        </div>
    )
}

export function FormBtn(props) {
    return (
        <div className="formBtn">
            <button {...props}>
                {props.children}
            </button>
        </div>
    )
}
