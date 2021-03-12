import React from "react";
import QRCode from "qrcode.react";

function QR(djCode) {
  return (
    <div>
       <QRCode value={"http://localhost:3000/request/" + djCode}/>
       
    </div>
  )
}

export default QR;