import React, { useEffect } from "react";
import { Container, Row, Col } from "../components/Grid";
import ActivityRow from "../components/ActivityRow";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import checkIfProfileExists from "../utils/checkProfileCreated"

function DJActivity() {
    const { user } = useAuth0();
    // const [ activity, setActivity ] = useState([]);


    
    useEffect(() => {
        checkIfProfileExists(user.sub);
      }, [])

    return(
        <div>
            <Header title="ACTIVITY"/>
            <Container classes="top-container bottom-container text-center">
                <Row classes="pt-0 mt-0 activity-header-bottom">
                    <Col size="3"><h5 className="text-warning">SONG</h5></Col>
                    <Col size="3"><h5 className="text-warning">TIPPED</h5></Col>
                    <Col size="3"><h5 className="text-warning">GUEST</h5><p className="text-warning">(REQUEST TYPE)</p></Col>
                    <Col size="3"><h5 className="text-warning">DATE / TIME</h5></Col>
                </Row>
                {/* .map to activity list */}
                {/* props: key, id, title, artist, tip, guestName, timeStamp*/}
                <ActivityRow 
                    key="1"
                    id="1"
                    title="Party Up"
                    artist="DMX"
                    tip="$100"
                    guestName="Christina Shiroma"
                    type="Played"
                    date="March 4, 2021"
                    time="12:01am"
                />
                <ActivityRow 
                    key="2"
                    id="2"
                    title="Sexyback"
                    artist="Justin Timberlake"
                    tip="$10"
                    guestName="Charles Robinson"
                    type="Accepted"
                    date="March 3, 2021"
                    time="11:59pm"
                />
            </Container>
            <Footer current="activity"/>
        </div>
    )
}

export default DJActivity;