import React, { useState } from "react";

// import './style.css'

function UpLoadProfileImage(props) {

    return (
        <div className="App">
                  <p>Select {props.imageDescription} image to upload:</p>
                  <input type="file" name="file" placeholder="Upload an Image"
                    onChange={props.selectImage} />
                  <div>
                    <button onClick={props.uploadImage}>Upload Image</button>
                  </div>
                  
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
