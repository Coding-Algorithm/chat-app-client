import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import userAction from "../components/store/userSlice";
import { useSelector, useDispatch } from "react-redux";

function SetAvatar() {
  const api = "https://avatars.dicebear.com/api/human";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = useSelector((state) => state.user);

  console.log(user);

  const updateUser = (user) => {
    console.log("Updating User")
    dispatch(userAction.actions.updateUser(user));
  };

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {};

  useEffect(() => {
    const userStored = localStorage.getItem("chat-app-user");
    if (userStored) {
      console.log(userStored)
      !user.username && updateUser(userStored);
    }


    const url = `${api}/${user.username}}.svg`;
    
    console.log(url)
    const fetchImage = async () => {
      try {
        const data = [];

        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${url}`);

          console.log(image);
          console.log(image, image.data);
          const buffer = new Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    user.username && fetchImage();

  }, [user]);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>

        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  // src={`data:image/svg+xml;base64,${avatar}`}
                  src={`${api}/${user.username}}${index}.svg`}
                  alt="Avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
      </Container>

      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      width: 100px;
      height: 100px;
      background-color: "white"
      img {
        height: 6rem;
        background-color: "white";
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
