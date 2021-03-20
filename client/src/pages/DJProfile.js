import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "../components/Grid";
import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated"
import API from "../utils/API";
import OptionsMenuButton from "../components/OptionsMenuButton";
import OptionsMenuModal from "../components/OptionsMenuModal";

function DJProfile() {
    const { user } = useAuth0();
    // User profile info
    const [ userProfile, setUserProfile ] = useState([]);

    
    useEffect(() => {
        checkIfProfileExists(user.sub);
        loadProfile(user.sub);
      }, [])

    // API get request for user informatoin
    function loadProfile(id) {
        API.getDj(id)
        .then(res => setUserProfile(res.data[0]))
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
                <Row>
                    <Col>
                        <OptionsMenuButton />
                        <OptionsMenuModal />
                    </Col>
                </Row>
                
            </Container>
            <Footer current="profile"/>
        </div>
    )
}

export default DJProfile;