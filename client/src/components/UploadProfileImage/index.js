import React, { useState } from "react";

// import './style.css'

function UploadProfileImage() {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    function changeHandlerImage(event) {
        setSelectedFile(event.target.files[0]);
		setIsSelected(true);
    }

    function handleImageUpload(event) {
      event.preventDefault();
      alert("Somebody uploaded their profile image!")
    }

    return (
        <div>
        <input type="file" name="file" onChange={changeHandlerImage} />
        {isSelected ? (
            <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
            </div>
        ) : (
            <p>Select a file to show details</p>
        )}
        <div>
            <button onClick={handleImageUpload}>Submit</button>
        </div>
    </div>
    )
}

export default UploadProfileImage;