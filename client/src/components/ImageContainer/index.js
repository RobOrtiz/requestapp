import React, { useState } from "react";

// import './style.css'

function UpLoadProfileImage(props) {

    return (
        <div className="App">
            {
                props.loading ? (
                    <h3>Loading ...</h3>
                ) : (
                    <img src={props.image} alt={props.altTag} style={{ width: '150px', color:'white'}} />
                )
            }
        </div>
    );
}

export default UpLoadProfileImage;
