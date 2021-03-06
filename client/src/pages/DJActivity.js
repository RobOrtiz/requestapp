import React, { useState } from "react";
import { Container, Row, Col } from "../components/Grid";
import ActivityRow from "../components/ActivityRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DJActivity() {
    const [ activity, setActivity ] = useState([]);


    // API get request for Activity


    return(
        <div>
            <Header title="ACTIVITY"/>
            <Container classes="top-container bottom-container text-center">
                <Row classes="pt-0 mt-0 activity-header-bottom">
                    <Col size="4"><h5>SONG</h5></Col>
                    <Col size="4"><h5>TIP AMOUNT</h5></Col>
                    <Col size="4"><h5>GUEST NAME</h5><p>(REQUEST TYPE)</p></Col>
                    <Col size="4"><h5>DATE / TIME</h5></Col>
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