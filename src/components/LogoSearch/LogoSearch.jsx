import { UilSearch } from "@iconscout/react-unicons";
import React from "react";
import "./LogoSearch.css";
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src="https://i.ibb.co/vkg8Hyq/unnamed.png" width="30%" alt="" />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
