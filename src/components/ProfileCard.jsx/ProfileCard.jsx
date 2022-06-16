import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Firebase/useAuth";
import Cover from "../../img/cover.jpg";
import "./ProfileCard.css";

const ProfileCard = () => {
  const ProfilePage = true;
  const { user } = useAuth();
  const [isUser, setUser] = useState({});
  const navigate = useNavigate();

  const [isPost, setUserPost] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/v2/post/${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 401) {
        }
      })
      .then((data) => setUserPost(data?.post));
  }, [isPost]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/users/${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((res) => {
        if (res.status == 201) {
          return res.json();
        } else if (res.status === 401) {
          navigate("/sign-in");
        }
      })
      .then((data) => setUser(data));
  }, [user]);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={isUser.photo} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.displayName}</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>0000</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>0</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{isPost?.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
