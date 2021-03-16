import { PromiseProvider } from "mongoose";
import React from "react";

function RequestModalWarning(props) {
  return (
    <>
      

      <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{props.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p className="modal-text">{props.message}</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default RequestModalWarning;