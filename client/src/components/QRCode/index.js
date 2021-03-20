import React from "react";
import QRCode from "qrcode.react";

function QR(props) {
  return (
    <div>
       <QRCode value={"https://noi-request-app.herokuapp.com/request/" + props.djCode}/>
       
    </div>
  )
}

export default QR;
