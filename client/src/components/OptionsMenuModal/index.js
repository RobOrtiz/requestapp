import React from "react";
import LogoutButton from "../LogoutButton";
import { Link } from "react-router-dom";
import TermsModal from '../TermsModal';

function OptionsMenuModal() {
  return (
    <>
      <div className="modal fade" id="options-menu-modal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Options Menu</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body d-flex flex-column">
                {/* Had to make a regular button link for now because mondal remains open on redirect */}
                {/* <Link to="/dj/editprofile" className="btn btn-dark gold-animated-btn">Update Profile</Link> */}
                <button className="btn btn-dark gold-animated-btn" onClick={() => window.location.replace('/dj/editprofile')}>Update Profile</button>
                <Link to="/" className="btn btn-dark gold-animated-btn">Payment Options <span className="text-muted font-italic">(coming soon)</span></Link>
                <Link to="/" className="btn btn-dark gold-animated-btn">Share Noi <span className="text-muted font-italic">(coming soon)</span></Link>
                <Link to="/" className="btn btn-dark gold-animated-btn">Send Feedback <span className="text-muted font-italic">(coming soon)</span></Link>
                <Link to="/" className="btn btn-dark gold-animated-btn">Privacy Policy <span className="text-muted font-italic">(coming soon)</span></Link>
                <button className="btn btn-dark gold-animated-btn" data-toggle="modal" data-target="#modal-terms-and-conditions">Terms and Conditions</button>
                <TermsModal />
                <Link to="/" className="btn btn-dark gold-animated-btn">Licenses <span className="text-muted font-italic">(coming soon)</span></Link>
                
                <LogoutButton />
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

export default OptionsMenuModal;