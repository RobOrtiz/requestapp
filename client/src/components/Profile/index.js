import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./style.css"
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user)

  return (
    <div className="white">
      <img src={user.picture}/>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {/* {JSON.stringify(user, null, 2)} */}
      
      <LoginButton/><LogoutButton/>
    </div>
    
  )
}

export default Profile;