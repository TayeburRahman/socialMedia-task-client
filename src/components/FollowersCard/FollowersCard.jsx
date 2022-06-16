import React, { useEffect, useState } from "react";
import useAuth from "../../Firebase/useAuth";
import "./FollowersCard.css";

const FollowersCard = () => {
  const { user } = useAuth();
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:4000/api/v2/allUsers")
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 401) {
        }
      })
      .then((data) => setAllUser(data));
  }, [user]);

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {allUser?.map((follower, id) => {
        return (
          <div className="follower">
            <div>
              <img src={follower.photo} alt="" className="followerImage" />
              <div className="name">
                <span>{follower.displayName}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="button fc-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
