import React from "react"
import { useAuth0 } from "@auth0/auth0-react";

function SignUpButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="btn btn-dark ml-5 gold-animated-btn" onClick={() => loginWithRedirect()}>
      Sign Up
    </button>
  )
}

export default SignUpButton;