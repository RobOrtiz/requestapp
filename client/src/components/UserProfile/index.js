import React from 'react';
import { Row, Col } from '../Grid';

function UserProfile(props) {
    return(
        <Row>
            <Col size="12">
                <img src={props.profileImg} alt={props.djName} />
                <Row classes="mt-5 pt-3 user-headers">
                    <Col size="6">
                        <h4>DJ Name</h4>
                        <h4>Hometown</h4>
                        <h4>Genre</h4>
                        <h4>Instagram</h4>
                        <h4>Email</h4>
                        <h4>Password</h4>
                        <h4>Stripe Billing Info</h4>
                    </Col>
                    <Col size="6" classes="user-info">
                        <h4>{props.djName}</h4>
                        <h4>{props.hometown}</h4>
                        <h4>{props.genre}</h4>
                        <h4>{props.instagram}</h4>
                        <h4>{props.email}</h4>
                        <h4>{props.password}</h4>
                        <h4>{props.stripe}</h4>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default UserProfile;