import React, { useState } from "react";
import Modal from "react-modal";
import RequestModalWarning from "../RequestModalWarning";

function RequestModalFunctional() {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
      setModalIsOpen(false)
  }

  return (
    <>
    <button type="button" className="btn btn-dark mt-3" data-toggle="modal" data-target={`#modal-warning`}>
                            Details
                        </button>

    <Modal isOpen={modalIsOpen}>
      <button onClick={setModalIsOpenToFalse}>close</button>
      <RequestModalWarning />
    </Modal>
    
    </>
  );
}

export default RequestModalFunctional;
