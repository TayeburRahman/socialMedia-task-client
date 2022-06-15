import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShareModal from "../ShareModal/ShareModal";
import TrendCard from "../TrendCard/TrendCard";
import "./RightSide.css";

const RightSide = () => {
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="/">
          <HomeIcon style={{ fontSize: "35px" }} />
        </Link>

        <Link to="/">
          {" "}
          <NotificationsIcon style={{ fontSize: "35px" }} />
        </Link>

        <Link to="/profile">
          {" "}
          <PersonIcon style={{ fontSize: "35px" }} />
        </Link>
      </div>

      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
