import React from "react";
import QRCode from "qrcode.react";

function QR(props) {
  let baseUrl = window.location.origin;
  return (
    <div>
       <QRCode value={`${baseUrl}/request/${props.djCode}`}/>
       
    </div>
  )
}

export default QR;
