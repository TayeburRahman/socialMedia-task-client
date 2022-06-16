import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../Firebase/useAuth";
import Post from "../Post/Post";
import "./Posts.css";

const Posts = () => {
  const { user } = useAuth();
  const [isPost, setUserPost] = useState([]);
  const [allPost, setAllPost] = useState([]);

  const patch = useLocation();

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/AllPost")
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 401) {
        }
      })
      .then((data) => setAllPost(data));
  }, [allPost, patch]);

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
  }, [isPost, patch]);

  return (
    <div className="Posts">
      {patch.pathname === "/profile" ? (
        <div>
          {isPost.map((post, id) => {
            return (
              <Post data={post} likes={post.like} loves={post.love} key={id} />
            );
          })}
        </div>
      ) : (
        <div>
          {allPost.map((post, id) => {
            return (
              <Post data={post} likes={post.like} loves={post.love} key={id} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;
