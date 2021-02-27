import React, { useState } from "react";
import { Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

function DJSignUp() {

    const [formObject, setformObject] = useState({
        signup: false
    })

    function handleFormChange() {
        if(formObject.signup === false){
            setformObject({
                signup: true
            })
        } else {
            setformObject({
                signup: false
            })
        }
    }

    return (
        <Container>
            {!formObject.signup ? (
                <div>
                    <h1>Sign In</h1>
                    <form>
                        <label for="email">Username:</label>
                        <Input 
                            type="text"
                            id="email"
                            name="email"
                            placeholder="EMAIL"
                        />
                        <label for="password">Password:</label>
                        <Input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="PASSWORD"
                        />
                        <FormBtn>
                            Sign In
                        </FormBtn>
                    </form>
                    <input type="button" onClick={handleFormChange} value="Or Sign Up Here!" />
                </div>
            ) : (
                <div>
                    <h1>Sign Up</h1>
                    <form>
                        <label for="full-name">What's your real name?</label>
                        <Input 
                            type="text"
                            id="full-name"
                            name="full-name"
                            placeholder="FULL NAME"
                        />
                        <label for="dj-name">What's your DJ name?</label>
                        <Input 
                            type="text"
                            id="dj-name"
                            name="dj-name"
                            placeholder="DJ NAME"
                        />
                        <label for="hometown">Where are you from?</label>
                        <Input 
                            type="text"
                            id="hometown"
                            name="hometown"
                            placeholder="HOMETOWN"
                        />
                        <label for="genre">What type of music do you play?</label>
                        <Input 
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder="GENRE"
                        />
                        <label for="email">What's your email?</label>
                        <Input 
                            type="text"
                            id="email"
                            name="email"
                            placeholder="EMAIL"
                        />
                        <label for="password">Please enter in a password:</label>
                        <Input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="PASSWORD"
                        />
                        <Input type="checkbox" id="terms"/>
                        <label for="terms">I agree to the NOI Terms and Conditions</label>
                        <FormBtn>
                            Sign Up
                        </FormBtn>
                    </form>
                    <input type="button" onClick={handleFormChange} value="Or Sign In Here!" />
                </div>
            )}
        </Container>
    )


}

export default DJSignUp;