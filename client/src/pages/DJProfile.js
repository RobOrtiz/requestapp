import React, { useEffect, useState } from "react";
import { Container } from "../components/Grid";
import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated"
import API from "../utils/API";
import LogoutButton from "../components/LogoutButton";
import QR from "../components/QRCode/QRCode";

function DJProfile() {
    const { user } = useAuth0();
    // User profile info
    const [ userProfile, setUserProfile ] = useState([]);
    // User Id for qr code
    const [ userId, setUserId ] = useState("");

    
    useEffect(() => {
        checkIfProfileExists(user.sub);
        loadProfile(user.sub);
      }, [])

    // API get request for user informatoin
    function loadProfile(id) {
        API.getDj(id)
        .then(res => { setUserProfile(res.data[0]); setUserId(res.data[0]._id) })
        .catch(err => console.log(err))
    }
    
    // Handle logout button
    return(
        <div>
            <Header title="PROFILE"/>
            <Container classes="top-container text-center">
                <UserProfile {...userProfile} />
            </Container>
            <Container classes="bottom-container text-center mt-3">
                {/* <FormBtn className="btn btn-dark mt-5">Logout</FormBtn> */}
                <LogoutButton />
                <p>Here is your QR code <a href={"http://localhost:3000/request/" + userId}>link</a></p>
                <QR djCode={userId}/>
            </Container>
            <Footer current="profile"/>
        </div>
    )
}

export default DJProfile;