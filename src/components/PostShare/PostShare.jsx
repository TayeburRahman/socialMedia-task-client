import {
  UilLocationPoint,
  UilPlayCircle,
  UilScenery,
  UilSchedule,
} from "@iconscout/react-unicons";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Firebase/useAuth";
import "./PostShare.css";

const PostShare = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [isUser, setUser] = useState({});
  const navigate = useNavigate();
  const [imageSelected, setImageSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // Hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  // Image uploader
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImageSelected(img);
      setLoading(true);
    }
  };

  if (imageSelected) {
    // Image uploader 2nd
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "mcem6nrq");

    const postImage = async () => {
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/socialm/image/upload",
          formData
        );
        setImage(response.data.url);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    postImage();
  }

  // submit handler
  const onSubmit = (data) => {
    // data save mongoDB
    data.userEmail = user.email;
    data.userName = user.displayName;
    data.userID = user._id;
    data.image = image;
    fetch("http://localhost:4000/api/v1/post", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.massages);
      });
    reset();
  };

  return (
    <div className="PostShare">
      <img src={isUser?.photo} alt="" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="infoInput"
            placeholder="What's happening"
            {...register("text", { required: true })}
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <div
              className="option"
              style={{ color: "var(--video)" }}
              defaultValue="test"
              {...register("example")}
            >
              <UilPlayCircle />
              Video
            </div>{" "}
            <div
              className="option"
              style={{ color: "var(--location)" }}
              defaultValue="test"
              {...register("example")}
            >
              <UilLocationPoint />
              Location
            </div>{" "}
            <div
              className="option"
              style={{ color: "var(--shedule)" }}
              defaultValue="test"
              {...register("example")}
            >
              <UilSchedule />
              Shedule
            </div>
            <button className="button ps-button">
              {isLoading ? (
                <CircularProgress style={{ height: "20px", width: "20px" }} />
              ) : (
                "Share"
              )}
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostShare;
