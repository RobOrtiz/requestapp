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
  console.log(user);

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

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if(document.querySelector('#terms').checked === false){
      document.querySelector('#terms').style.outline = "3px solid red"
    } else {
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

  }

  return (
    <div className="signup">
      <Header title="SIGNUP" />
      <Container classes="top-container">
        <Col size="12">
            <div>
              <h1 className="mb-3">CREATE YOUR NOI PROFILE</h1>
              <form style={{ width: "300px" }}>
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
                  className="form-check-input"
                  id="terms"
                  label="I agree to the NOI Terms and Conditions"
                  tooltip="true"
                  tooltipId="terms-and-conditions"
                />
                <div className="modal fade" id={`modal-terms-and-conditions`} tabIndex="-1" role="dialog" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content" style={{maxHeight: "80vh"}}>
                      <div className="modal-body">
                        <p>
                          <u>Terms & Conditions</u>:  <br/><br/>
                          Please read these terms and conditions ("terms and conditions", "terms") carefully before using
                          Noi website (“website”, "service") operated by R Entertainment LLC ("us", 'we", "our").<br/><br/>
                          Conditions of use <br/>
                          By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly. R Entertainment LLC only grants use and access of this website, its products, and its services to those who have accepted its terms.<br/><br/>
                          Privacy policy<br/>
                          Before you continue using our website, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.<br/><br/>
                          Age restriction<br/>
                          You must be at least 18 (eighteen) years of age before you can use this website. By using this
                          website, you warrant that you are at least 18 years of age and you may legally adhere to this
                          Agreement. R Entertainment LLC assumes no responsibility for liabilities related to age misrepresentation.<br/><br/>
                          Intellectual property<br/>
                          You agree that all materials, products, and services provided on this website are the property of R Entertainment LLC, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all
                          copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree
                          that you will not reproduce or redistribute the R Entertainment LLC’s intellectual property in any way, including electronic, digital, or new trademark registrations.  You grant R Entertainment LLC a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.<br/><br/>
                          User accounts<br/>
                          As a user of this website, you may be asked to register with us and provide private information.  You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password. If you think there are any possible issues regarding the security of your account on the website,
                          inform us immediately so we may address it accordingly.<br/><br/>
                          We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.<br/><br/>
                          Applicable law <br/>
                          By visiting this website, you agree that the laws of the United States, without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between R Entertainment LLC and you, or its business partners and associates.<br/><br/>
                          Disputes<br/>
                          Any dispute related in any way to your visit to this website or to products you purchase from us
                          shall be arbitrated by state or federal court and you consent to exclusive jurisdiction and venue of such courts.<br/><br/>
                          Indemnification<br/>
                          You agree to indemnify R Entertainment LLC and its affiliates and hold R Entertainment LLC harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel.<br/><br/>
                          Limitation on liability<br/>
                          R Entertainment LLC is not liable for any damages that may occur to you as a result of your misuse of our website.<br/><br/>
                          R Entertainment LLC reserves the right to edit, modify, and change this Agreement any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between R Entertainment LLC and the user, and this supersedes and replaces all prior agreements regarding the use of this website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <FormBtn onClick={handleFormSubmit} className="btn btn-dark formBtn mt-5">Create NOI Profile</FormBtn>
              </form>
            </div>
        </Col>
      </Container>
    </div>
  );
}

export default DJSignUp;
