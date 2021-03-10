import React, { useState } from "react";
import { Container, Col } from "../components/Grid";
import { InputText, InputCheckbox, Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import Header from "../components/Header";
import ImageContainer from "../components/ImageContainer";
import { useAuth0 } from "@auth0/auth0-react";

function DJSignUp() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user)

  const [formObject, setFormObject] = useState({
    fullName: "",
    djName: "",
    hometown: "",
    djStyle: "",
    email: "",
    password: "",
    instagram: ""
  });

  // Set states for the upload profile image feature.
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  // const [isSelected, setIsSelected] = useState(false);
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

  // Function to change state of selectedFile to the file that the user chooses to upload.
  const selectImage = async event => {
    setSelectedFile(event.target.files[0]);
    // setIsSelected(true)
  }

  // Function to upload the selectedFile to Cloudinary via their API once the user clicks on the upload image button.
  // The Cloudinary API will return a JSON object that contains the profile image URL that we can attach to the the Dj document.
  // The Cloudinary account is currently setup under Charles' information.
  const uploadImage = async event => {
    event.preventDefault();
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
      // userSub: user.sub
    })
      .then((res) => console.log(res))
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
                <div className="App">
                  <p>Select profile image to upload:</p>
                  <input type="file" name="file" placeholder="Upload an Image"
                    onChange={selectImage} />
                  <div>
                    <button onClick={uploadImage}>Upload Image</button>
                  </div>
                  <ImageContainer
                    loading={loading}
                    image={image}
                    altTag="dj head shot"
                  />
                </div>
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
