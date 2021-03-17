import React from "react"
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
    <button className="btn btn-dark gold-animated-btn" onClick={() => loginWithRedirect()}>
      Login
    </button>
    )
  )
}

export default LoginButton;