import React from "react";
import styleCss from "../StyleCss.css";
const Profile = ({ setUserState, username }) => {
  return (
    <div className="profile">
      <h1 style={{ color: "black" }}>Welcome {username} !!</h1>
      <button
        className={styleCss.button_common}
        onClick={() => setUserState({})}
      >
        Logout
      </button>
    </div>
  );
};
export default Profile;