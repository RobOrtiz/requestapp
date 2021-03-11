import React from "react"
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
    <button className="btn btn-dark btn-outline-warning" onClick={() => loginWithRedirect()}>
      Login
    </button>
    )
  )
}

export default LoginButton;