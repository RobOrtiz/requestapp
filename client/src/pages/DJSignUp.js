import React, { useState } from "react";
import { Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";

function DJSignUp() {
  const [formObject, setFormObject] = useState({});

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
    console.log(123);
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(123);
    API.createDJ({
      fullName: formObject.fullName,
      djName: formObject.djName,
      hometown: formObject.hometown,
      djStyle: formObject.djStyle,
      email: formObject.email,
      password: formObject.password,
      instagram: formObject.instagram,
    })
      // .then(res => loadBooks())
      .then((res) => console.log(res));
    // .catch(err => console.log(err));
  }

  return (
    <Container>
      {!signUp.signup ? (
        <div>
          <h1>Sign In</h1>
          <form>
            <label for="email">Username:</label>
            <Input type="text" id="email" name="email" placeholder="EMAIL" />
            <label for="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
            />
            <FormBtn>Sign In</FormBtn>
          </form>
          <input
            type="button"
            onClick={handleFormChange}
            value="Or Sign Up Here!"
          />
        </div>
      ) : (
        <div>
          <h1>Sign Up</h1>
          <form>
            <label for="fullName">What's your real name?</label>
            <Input
              onChange={handleInputChange}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="FULL NAME"
            />
            <label for="djName">What's your DJ name?</label>
            <Input
              onChange={handleInputChange}
              type="text"
              id="djName"
              name="djName"
              placeholder="DJ NAME"
            />
            <label for="hometown">Where are you from?</label>
            <Input
              onChange={handleInputChange}
              type="text"
              id="hometown"
              name="hometown"
              placeholder="HOMETOWN"
            />
            <label for="djStyle">What type of music do you play?</label>
            <Input
              onChange={handleInputChange}
              type="text"
              id="djStyle"
              name="djStyle"
              placeholder="DJ STYLE"
            />
            <label for="email">What's your email?</label>
            <Input
              onChange={handleInputChange}
              type="text"
              id="email"
              name="email"
              placeholder="EMAIL"
            />
            <label for="password">Please enter in a password:</label>
            <Input
              onChange={handleInputChange}
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
            />
            <label for="instagram">What's your Instagram handle?</label>
            <Input
              onChange={handleInputChange}
              type="text"
              id="instagram"
              name="instagram"
              placeholder="@INSTAGRAM"
            />
            <Input type="checkbox" id="terms" />
            <label for="terms">I agree to the NOI Terms and Conditions</label>
            <FormBtn onClick={handleFormSubmit}>Sign Up</FormBtn>
          </form>
          <input
            type="button"
            onClick={handleFormChange}
            value="Or Sign In Here!"
          />
        </div>
      )}
    </Container>
  );
}

export default DJSignUp;
