import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Container } from "../../components/Grid";
import './styles.css'
import StripeAPI from '../../utils/stripe';
import API from "../../utils/API";

function Confirmation() {

    const [sessionId, setSessionId] = useState();

    const [songData, setSongData] = useState({
        albumCover: "",
        tip: 0,
        fullName: "",
        title: "",
        artist: "",
        generalRequest: false,
        playNow: false,
        songStatus: "",
        _id: ""
    });

    useEffect(() => {
        getSessionId();
    }, [])

    const firstUpdate1 = useRef(true);
    useLayoutEffect(() => {
      if (firstUpdate1.current) {
        // getDJId();
        firstUpdate1.current = false;
      } else {
        retrieveInformation();
      }
    }, [sessionId])

    const firstUpdate2 = useRef(true);
    useLayoutEffect(() => {
      if (firstUpdate2.current) {
        // getDJId();
        firstUpdate2.current = false;
      } else {
        addToDatabase();
      }
    }, [songData])


    // Parse URL for djId
    function getSessionId() {
        const url = window.location.href;
        var sessionId = url.substring(url.lastIndexOf("=") + 1)
        setSessionId(sessionId);
    }

    const retrieveInformation = async () => {
        const data = await StripeAPI.successData(sessionId);

        //Need to set strings to booleans for database
        let genReq = (data.data.generalRequest === "true");
        let plyNow = (data.data.playNow === "true");

        setSongData({
            albumCover: data.data.albumCover,
            tip: parseInt(data.data.tip),
            fullName: data.data.fullName,
            title: data.data.title,
            artist: data.data.artist,
            generalRequest: genReq,
            playNow: plyNow,
            songStatus: data.data.songStatus,
            _id: data.data._id
        })
    }

    function addToDatabase() {
        API.createRequest({
        albumCover: songData.albumCover,
        tip: songData.tip,
        fullName: songData.fullName,
        title: songData.title,
        artist: songData.artist,
        generalRequest: songData.generalRequest,
        playNow: songData.playNow,
        songStatus: songData.songStatus,
        _id: songData._id
        })
        .then(res => window.location.replace(`/request/success/${songData._id}`))
        .catch(err => console.log(err))
    }

    return (
        <div className="confirmation-page">
            <img src="https://i.ibb.co/bdJNc5g/Noi-Logo-200x200.png" alt="Noi-Logo" border="0" width="200" height="200" className="d-block mx-auto" />
            <Container classes="text-center confirmation-top" />
        </div>
    )
}

export default Confirmation;