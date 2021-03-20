import React, { useState, useEffect } from "react";
import { Container, Col } from "../components/Grid";
import { InputText, FormBtn } from "../components/Form";
import API from "../utils/API";
import Header from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated"

function EditProfile() {
  const { user } = useAuth0();
  // User profile info
  const [ userProfile, setUserProfile ] = useState([]);

  
  useEffect(() => {
      checkIfProfileExists(user.sub);
      loadProfile(user.sub);
    }, [user.sub])

    useEffect(() => {
      // Preset the form fields with the profile data
      setFormObject({
        fullName: userProfile.fullName,
        djName: userProfile.djName,
        hometown: userProfile.hometown,
        djStyle: userProfile.djStyle,
        email: userProfile.email,
        instagram: userProfile.instagram
    })
    },[userProfile])

    // Get the dj profile data
  function loadProfile(id) {
    API.getDj(id)
    .then(res => setUserProfile(res.data[0]))
    .catch(err => console.log(err))
  }

  const [formObject, setFormObject] = useState(userProfile || '');

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
    API.updateDj({
      _id: userProfile._id,
      fullName: formObject.fullName,
      djName: formObject.djName,
      hometown: formObject.hometown,
      djStyle: formObject.djStyle,
      email: formObject.email,
      instagram: formObject.instagram
    })
      // .then((res) => console.log(res))
      .then(function(res) {
        // Return to profile
        if (res.data !== null) {
          window.location.replace("/dj/profile")
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="signup">
      <Header title="SIGNUP" />
      <Container classes="top-container">
        <Col size="12">
            <div>
              <h1 className="mb-3">UPDATE YOUR NOI PROFILE</h1>
              <form style={{ width: "300px" }}>
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formObject.fullName || ""}
                  // placeholder={userProfile.fullName}
                  label="What's your real name?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="djName"
                  name="djName"
                  value={formObject.djName || ""}
                  label="What's your DJ name?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="hometown"
                  name="hometown"
                  value={formObject.hometown || ""}
                  label="Where are you from?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="djStyle"
                  name="djStyle"
                  value={formObject.djStyle || ""}
                  label="What type of music do you play?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="email"
                  name="email"
                  value={formObject.email || ""}
                  label="What's your email?"
                  className="form-control"
                />
                <InputText
                  onChange={handleInputChange}
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formObject.instagram || ""}
                  label="What's your Instagram handle?"
                  className="form-control"
                />
                <FormBtn onClick={handleFormSubmit} className="btn btn-dark formBtn mt-5">Update NOI Profile</FormBtn>
              </form>
            </div>
        </Col>
      </Container>
    </div>
  );
}

export default EditProfile;
