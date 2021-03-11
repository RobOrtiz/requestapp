import React, { useState } from "react";
import { Container, Col } from "../components/Grid";
import { InputText, InputCheckbox, FormBtn } from "../components/Form";
import API from "../utils/API";
import Header from "../components/Header";
import UploadImage from "../components/UploadImage";
import { useAuth0 } from "@auth0/auth0-react";
import Helpers from "../utils/Helpers";

function DJSignUp() {
  const { user } = useAuth0();
  
  const [formObject, setFormObject] = useState({
    fullName: "",
    djName: "",
    hometown: "",
    djStyle: "",
    email: "",
    password: "",
    instagram: ""
  });

  // Set loading and selectedFile states for the upload profile image feature.
  // Loading is set to false and made true once the uploading starts (thus showing "Loading ..." text), and made
  // false again once the uploading is completed and the image URL is returned from the Cloudinary API.
  // The selectedFile state is defined when the user chooses a file via the select a file to upload input via. 
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  // Set image to default 150px x 150px placeholder URL. 
  const [image, setImage] = useState("https://via.placeholder.com/150");

  const [signUp, setSignUp] = useState({
    signup: false,
  });

  function handleFormChange() {
    if (signUp.signup === false) {
      setSignUp({
        signup: true,
      });
    } else {
      setSignUp({
        signup: false,
      });
    }
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.createDj({
      fullName: formObject.fullName,
      djName: formObject.djName,
      hometown: formObject.hometown,
      djStyle: formObject.djStyle,
      username: formObject.email,
      password: formObject.password,
      instagram: formObject.instagram,
      profileImage: image,
      userSub: user.sub
    })
      // .then((res) => console.log(res))
      .then(function(res) {
        // If they create a profile, send to dashboard
        if (res.data !== null) {
          console.log(res)
          window.location.replace("/dj/dashboard")
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Header title="Sign In or Sign Up" />
      <Container classes="top-container bottom-container">
        <Col size="12">
            <div>
              <h1 className="mb-3">Sign Up</h1>
              <form style={{ width: "400px" }}>
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="FULL NAME"
                  label="What's your real name?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="djName"
                  name="djName"
                  placeholder="DJ NAME"
                  label="What's your DJ name?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="hometown"
                  name="hometown"
                  placeholder="HOMETOWN"
                  label="Where are you from?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="djStyle"
                  name="djStyle"
                  placeholder="DJ STYLE"
                  label="What type of music do you play?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="EMAIL"
                  label="What's your email?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="PASSWORD"
                  label="Please enter in a password:"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="instagram"
                  name="instagram"
                  placeholder="@INSTAGRAM"
                  label="What's your Instagram handle?"
                  className="form-control"
                />
                <UploadImage
                    selectImage = {(event)=>Helpers.selectImage(event, setSelectedFile)}
                    uploadImage = {(event)=>Helpers.uploadImage(event, selectedFile, setLoading, setImage)}
                    loading={loading}
                    image={image}
                    altTag="dj head shot"
                    imageDescription = "profile"
                />
                <InputCheckbox
                  type="checkbox"
                  id="terms"
                  label="I agree to the NOI Terms and Conditions"
                  className="form-check-input"
                />
                <FormBtn onClick={handleFormSubmit} className="btn btn-dark formBtn mt-5">Sign Up</FormBtn>
                <FormBtn onClick={handleFormChange} className="btn btn-dark formBtn mt-3">Or Sign In Here!</FormBtn>
              </form>
            </div>
        </Col>
      </Container>
    </div>
  );
}

export default DJSignUp;
