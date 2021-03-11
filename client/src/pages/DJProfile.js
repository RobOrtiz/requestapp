import React, { useEffect } from "react";
import { Container } from "../components/Grid";
import UserProfile from "../components/UserProfile";
import { FormBtn } from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated"
import LogoutButton from "../components/LogoutButton";

function DJProfile() {
    const { user } = useAuth0();
    // const [ userProfile, setUserProfile ] = useState([]);

    useEffect(() => {
        checkIfProfileExists(user.sub);
      }, [])

    // API get request for user informatoin

    // Handle logout button
    return(
        <div>
            <Header title="PROFILE"/>
            <Container classes="top-container text-center">
                <UserProfile
                    key="id"
                    id="id"
                    profileImg="https://picsum.photos/200"
                    djName="DJ Mister E"
                    hometown="San Diego, CA"
                    genre="Open Format"
                    instagram="@dj.mister.e"
                    email="mistere@gmail.com"
                    password="*******"
                    stripe="Yes"
                />
            </Container>
            <Container classes="bottom-container text-center mt-3">
                {/* <FormBtn className="btn btn-dark mt-5">Logout</FormBtn> */}
                <LogoutButton />
            </Container>
            <Footer current="profile"/>
        </div>
    )
}

export default DJProfile;