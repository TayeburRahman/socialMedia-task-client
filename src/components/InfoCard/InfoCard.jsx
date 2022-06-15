import React from "react";
import useAuth from "../../Firebase/useAuth";
import "./InfoCard.css";

const InfoCard = () => {
  const { logOut } = useAuth();
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>in ------</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Multan</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>Full Stack Developer</span>
      </div>

      <button className="button logout-button" onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
