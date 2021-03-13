import React from 'react';
import { Col } from '../Grid';
import './styles.css'

function SongReq(props) {
    return(
        <div>
            <Col>
                <div className="card">
                    <img src={props.albumCover} alt={props.title} className="card-img-top album-cover"/>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.artist}</p>
                        <p className="card-text">${props.tip}</p>
                        <button className={props.btn1} onClick={props.button01onClick}>{props.btn1}</button>
                        <button className={props.btn2} onClick={props.button02onClick}>{props.btn2}</button>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default SongReq;