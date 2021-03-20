import React from "react";

import './styles.css'

function UpLoadProfileImage(props) {

    return (
        <div className="imageContainer">
            <p>Select {props.imageDescription} image to upload:</p>
            <input className ="selectImageField" type="file" name="file" placeholder="Upload an Image"
                onChange={props.selectImage} />
            {props.invalidImage && <h4 className="error text-danger">{props.invalidImage}</h4>}

            <div>
                <button className="uploadImageBtns" onClick={props.uploadImage}>Upload Image</button>
            </div>

            {
                props.loading ? (
                    <h3>Loading ...</h3>
                ) : (
                    <img className ="imageHolder" src={props.image} alt={props.altTag} style={{ width: '150px', color: 'white' }} />
                )
            }
        </div>
    );
}

export default UpLoadProfileImage;
