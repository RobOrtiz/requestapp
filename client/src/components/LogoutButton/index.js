import React from "react"
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
    <button className="btn btn-dark mt-5 mb-5 gold-animated-btn" onClick={() => logout()}>
      Logout
    </button>
    )
  )
}

export default LogoutButton;