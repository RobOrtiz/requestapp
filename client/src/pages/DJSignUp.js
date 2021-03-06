import React, { useState } from "react";
import { Container, Col } from "../components/Grid";
import { InputText, InputCheckbox, Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import Header from "../components/Header";
import UserContext from "../utils/userContext";

function DJSignUp() {
  const [formObject, setFormObject] = useState({
    fullName: "",
    djName: "",
    hometown: "",
    djStyle: "",
    email: "",
    password: "",
    instagram: ""
  });

  const [ user, setUser ] = useState({
    user: ""
  });

  React.useEffect(() => {
    console.log(user)
  })

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
      instagram: formObject.instagram
    })
      .then((res) => window.location.replace("/dj/dashboard"))
      .catch(err => console.log(err));
  }

  function handleLogin(event) {
    event.preventDefault();
    API.login({
      username: formObject.email,
      password: formObject.password
    })
    .then((res) => {
      setUser({user: res});
      // window.location.replace("/dj/dashboard")
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Header title="Sign In or Sign Up" />
      <Container classes="top-container bottom-container">
        <Col size="12">
          {!signUp.signup ? (
            <div>
              <h1 className="mb-3">Sign In</h1>
              <form style={{width: "400px"}}>
                <InputText 
                onChange={handleInputChange}
                type="text" 
                id="email" 
                name="email" 
                placeholder="EMAIL"
                label="Username:"
                className="form-control"/>
                <InputText
                  onChange={handleInputChange}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="PASSWORD"
                  label="Password:"
                  className="form-control"
                />
                <FormBtn onClick={handleLogin} className="btn btn-dark formBtn mt-3">Sign In</FormBtn>

                <FormBtn onClick={handleFormChange} className="btn btn-dark formBtn mt-3">Or Sign Up Here!</FormBtn>
              </form>
            </div>
          ) : (
              <div>
                <h1 className="mb-3">Sign Up</h1>
                <form style={{width: "400px"}}>
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
            )}
          </Col>
      </Container>
    </div>
  );
}

export default DJSignUp;
