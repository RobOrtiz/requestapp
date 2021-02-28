import React from 'react';

export function Input(props) {
    return (
        <div>
            <input {...props}/>
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
