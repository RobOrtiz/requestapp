import React from 'react';
import { Row, Col } from '../Grid';
import QRModal from "../QRModal";

import './styles.css'

function UserProfile(props) {
    let defaultImage = require(`../../images/default-profile-cover.jpg`)

    return(
        <Row>
            <Col size="12" classes="mt-3">
                <img className="profile-image" src={props.profileImage !== "https://via.placeholder.com/150" ? `${props.profileImage}` : `${defaultImage}`} alt={props.djName} />
                <Row classes="mt-5 user-headers">
                    <Col size="12">
                        <Row classes="mt-4">
                            <Col size="md-6">
                            <h4>DJ NAME</h4>
                            </Col>
                            <Col size="md-6" classes="user-info">
                                <h4>{props.djName}</h4>
                            </Col>
                        </Row>
                        <Row classes="mt-4">
                            <Col size="md-6">
                                <h4>HOMETOWN</h4>
                            </Col>
                            <Col size="md-6" classes="user-info">
                                <h4>{props.hometown}</h4>
                            </Col>
                        </Row>
                        <Row classes="mt-4">
                            <Col size="md-6">
                                <h4>GENRE</h4>
                            </Col>
                            <Col size="md-6" classes="user-info">
                                <h4>{props.djStyle}</h4>
                            </Col>
                        </Row>
                        <Row classes="mt-4">
                            <Col size="md-6">
                                <h4>INSTAGRAM</h4>
                            </Col>
                            <Col size="md-6" classes="user-info">
                                <h4>{props.instagram}</h4>
                            </Col>
                        </Row>
                        <Row classes="mt-4">
                            <Col size="md-6">
                                <h4>EMAIL</h4>
                            </Col>
                            <Col size="md-6" classes="user-info">
                                <h4>{props.email}</h4>
                            </Col>
                        </Row>
                        <Row classes="mt-4">
                            <Col size="md-6">
                                <h4>PERSONAL QR CODE</h4>
                            </Col>
                            <Col size="md-6" classes="user-info">
                                <button type="button" className="btn btn-sm btn-dark mt-2" data-toggle="modal" data-target="#qr-code-modal">
                                    VIEW QR CODE
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <QRModal djCode={props._id} djName={props.djName} />
        </Row>
    )
}


export default UserProfile;
