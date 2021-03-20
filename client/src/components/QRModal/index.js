import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import QR from "../QRCode";
import { Row, Col } from "../Grid";


function QRModal(props) {
    let baseUrl = window.location.origin;
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    return(
        <div className="modal fade" id="qr-code-modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-body" ref={componentRef}>
                    <div className="conatiner-fluid">
                        <Row classes="justify-content-center mt-5">
                            <img src="https://i.ibb.co/kMDmZfY/Noi-Logo-200x200-black.png" alt="Noi-Logo-200x200" border="0" width="150" height="150" />
                        </Row>
                        <Row classes="justify-content-center">
                            <Col size="12">
                                <h1 className="qr-modal-name mt-5 text-center">{props.djName}</h1>
                            </Col>
                                <h3 className="mt-3">LINK:</h3>
                                <h3 className="qr-modal-link p-3"><a href={`${baseUrl}/request/${props.djCode}`}>{`${baseUrl}/request/${props.djCode}`}</a></h3>
                        </Row>
                        <Row classes="d-flex align-items-center justify-content-center qr-code">
                            <QR djCode={props.djCode} />                            
                        </Row>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary rounded-circle" onClick={handlePrint} style={{fontSize: "1.5rem"}}>&#x1f5b6;</button>
                    <button type="button" className="btn btn-secondary rounded-circle" data-dismiss="modal">&#x2716;</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default QRModal;
