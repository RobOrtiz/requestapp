import React from 'react';
import { Col } from '../Grid';
import './styles.css'

function SongReq(props) {
    return(
        <Col classes="d-flex">
            <div className="card song-card">
                <img src={props.albumCover} alt={props.title} className="card-img-top album-cover"/>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text font-italic">{props.artist}</p>
                    <p className="card-text">Tipped: <span className="font-weight-bold">${props.tip}</span></p>
                    <button className={`btn btn-dark mr-2 ${props.btn1}`} id={props._id} onClick={props.button01onClick}>{props.btn1}</button>
                    <button className={`btn btn-dark ${props.btn2}`}  id={props._id} onClick={props.button02onClick}>{props.btn2}</button>
                </div>
            </div>
        </Col>
    )
}

export default SongReq;