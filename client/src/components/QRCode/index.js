import React from "react";
import QRCode from "qrcode.react";

function QR(djCode) {
  return (
    <div>
       <QRCode value={"https://noi-request-app.herokuapp.com/request/" + djCode}/>
       
    </div>
  )
}

export default QR;
