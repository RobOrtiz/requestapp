import React, { useState } from "react";

// import './style.css'

function UpLoadProfileImage() {

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [image, setImage] = useState("https://via.placeholder.com/150");
  
  
    const selectImage = async event => {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true)
    }
  
    const uploadImage = async event => {
      setLoading(true);
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('upload_preset', 'bxqprejb')
      setLoading(true);
  
      const res = await fetch("https://api.cloudinary.com/v1_1/noimgmt/image/upload",
        {
          method: 'POST',
          body: data
        })
      const file = await res.json();
      console.log(file);
      setImage(file.secure_url);
      setLoading(false);
    }
  
    return (
      <div className="App">
        <h1>Upload Profile Image to Cloudinary</h1>
        <input type="file" name="file" placeholder="Upload an Image"
          onChange={selectImage} />
        <div>
          <button onClick={uploadImage}>Submit</button>
        </div>
        {
          loading ? (
            <h3>Loading ...</h3>
          ) : (
            <img src={image} alt="profile head shot" style={{ width: '150px', height:'150' }} />
          )
        }
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
      </div>
    );
  }
  
  export default UpLoadProfileImage;
  