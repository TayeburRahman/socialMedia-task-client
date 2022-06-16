import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import React, { useEffect, useState } from "react";
import useAuth from "../../Firebase/useAuth";
import Comment from "../../img/comment.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Share from "../../img/share.png";
import BlockButton from "./BlockButton";
import "./Post.css";

const Post = ({ data, loves, likes }) => {
  const [isLikeEmail, setOnLikeEmail] = useState(null);
  const [isLoveEmail, setOnLoveEmail] = useState(null);
  const [clickLike, setClickLike] = useState(false);

  const { user } = useAuth();
  const id = data._id;

  // checked database user
  useEffect(
    (data) => {
      likes.map((data) => {
        if (user?.email === data?.email) {
          setOnLikeEmail(data.email);
        } else {
          setOnLikeEmail(null);
        }
      });

      loves.map((data) => {
        if (user.email === data?.email) {
          setOnLoveEmail(data.email);
        } else {
          setOnLoveEmail(null);
        }
      });
    },
    [clickLike, data]
  );

  // Likes OnClick handel
  const handelLike = (email) => {
    setClickLike((prevCheck) => !prevCheck);
    if (isLikeEmail) {
      console.log("hendel on click Like == isLikeEmail-T");
      fetch(`http://localhost:4000/api/v1/post/likeDelete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((result) => {});
    } else {
      console.log("hendel on click Like == isLikeEmail-F");
      fetch(`http://localhost:4000/api/v1/post/likeUpdate/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((result) => {});
    }

    setClickLike((prevCheck) => !prevCheck);
    console.log("hendel on click Like == isLoveEmail-T");
    fetch(`http://localhost:4000/api/v1/post/loveDelete/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((result) => {});
  };

  // Loves OnClick handel
  const handelLoves = (email) => {
    if (isLoveEmail) {
      console.log("hendel on click love == isLoveEmail-T");
      fetch(`http://localhost:4000/api/v1/post/loveDelete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((result) => {
          setClickLike(true);
        });
    } else {
      console.log("hendel on click love == isLoveEmail-F");
      fetch(`http://localhost:4000/api/v1/post/loveUpdate/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((result) => {
          setClickLike(false);
        });
    }

    fetch(`http://localhost:4000/api/v1/post/likeDelete/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((result) => {
        setClickLike(true);
      });
  };

  return (
    <div className="Post">
      <div className="row-flex">
        <div className=" ">
          <h4>{data.userName}</h4>
          <h6 style={{ fontWeight: "400" }}>{data.text}</h6>
        </div>
        <div className=" ">
          <BlockButton />
        </div>
      </div>
      <img src={data.image} alt="" />
      <div className="postReact">
        <button
          onClick={() => handelLike(user.email)}
          className="button__react"
        >
          {isLikeEmail ? (
            <ThumbUpAltIcon
              className="styleIcon"
              style={{ fontSize: "30px" }}
            />
          ) : (
            <ThumbUpOffAltIcon style={{ fontSize: "30px" }} />
          )}
        </button>
        <button
          onClick={() => handelLoves(user.email)}
          className="button__react"
        >
          {" "}
          <img src={isLoveEmail ? Heart : NotLike} alt="" />
        </button>
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <div className="d-flex gap-3">
        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {data?.like?.length} likes
        </span>

        <span
          style={{ color: "var(--gray)", fontSize: "12px", marginLeft: "25px" }}
        >
          {data?.love?.length} loves
        </span>
      </div>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
